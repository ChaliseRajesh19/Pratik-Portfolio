import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  DesignerDesk v3 — Interactive Workstation
  ──────────────────────────────────────────
  • Person faces FRONT (camera looking at face)
  • Drag to orbit (quaternion, no gimbal lock)
  • Scroll to zoom in/out
  • Touch support
  • Inertia on drag release
  • Auto-rotate when idle
  • Transparent bg — blends with site
*/

export function DesignOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    // Front-facing: camera is in FRONT of the person, looking at face
    camera.position.set(0, 2.6, 7.5);
    camera.lookAt(0, 1.8, 0);

    /* ── Helpers ── */
    const box = (w, h, d, color, opts = {}) => {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshPhongMaterial({ color, ...opts }),
      );
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    };
    const cyl = (rt, rb, h, segs, color, opts = {}) =>
      new THREE.Mesh(
        new THREE.CylinderGeometry(rt, rb, h, segs),
        new THREE.MeshPhongMaterial({ color, ...opts }),
      );

    /* ═══════════ EVERYTHING in one pivot group (for orbit) ═══════════ */
    const pivot = new THREE.Group();
    scene.add(pivot);

    /* ════════════ LIGHTS ════════════ */
    scene.add(new THREE.AmbientLight(0x08122a, 6));

    // Front-facing key light (hits the person's face)
    const keyLight = new THREE.PointLight(0x2a7adc, 16, 11);
    keyLight.position.set(0, 4, 5);
    scene.add(keyLight);

    // Monitor glow (behind person — illuminates back)
    const monGlow = new THREE.PointLight(0x1a4a8a, 10, 9);
    monGlow.position.set(0, 3.2, -2);
    pivot.add(monGlow);

    // Desk lamp (warm spot)
    const lampSpot = new THREE.SpotLight(
      0xffd580,
      24,
      8,
      Math.PI / 5.5,
      0.6,
      1.3,
    );
    lampSpot.position.set(2.3, 5.0, 0.5);
    lampSpot.target.position.set(1.5, 1.5, 0.5);
    lampSpot.castShadow = true;
    pivot.add(lampSpot);
    pivot.add(lampSpot.target);

    // Rim / backlight purple
    const rimLight = new THREE.PointLight(0x7c3aed, 7, 10);
    rimLight.position.set(0, 4.5, -4);
    pivot.add(rimLight);

    // Cyan accent left
    const cyanAccent = new THREE.PointLight(0x22d3ee, 4, 7);
    cyanAccent.position.set(-4, 3, 1);
    pivot.add(cyanAccent);

    // Warm right
    const warmRight = new THREE.PointLight(0xe879f9, 3, 6);
    warmRight.position.set(4, 2.5, 1);
    pivot.add(warmRight);

    /* ════════════ DESK ════════════ */
    // Surface
    const deskTop = box(8.0, 0.11, 3.2, 0x111827, {
      specular: 0x1e293b,
      shininess: 60,
    });
    deskTop.position.set(0, 1.5, 0);
    pivot.add(deskTop);

    // LED edge strip (front edge)
    const led = box(7.9, 0.032, 0.04, 0x22d3ee, {
      emissive: 0x22d3ee,
      emissiveIntensity: 2.2,
      transparent: true,
      opacity: 0.92,
    });
    led.position.set(0, 1.442, 1.58);
    pivot.add(led);

    // Legs
    [
      [-3.7, 0.72, -1.2],
      [3.7, 0.72, -1.2],
      [-3.7, 0.72, 1.3],
      [3.7, 0.72, 1.3],
    ].forEach(([x, y, z]) => {
      const leg = box(0.1, 1.44, 0.1, 0x0c1020);
      leg.position.set(x, y, z);
      pivot.add(leg);
    });

    // Rear shelf (raised)
    const shelf = box(5.2, 0.07, 1.15, 0x0f1729);
    shelf.position.set(0, 2.07, -0.9);
    pivot.add(shelf);

    /* ════════════ MONITORS ════════════ */
    function makeMonitor(w, h, emitColor, px, py, pz, ry = 0) {
      const g = new THREE.Group();

      const bezel = box(w + 0.09, h + 0.09, 0.07, 0x090e1a, { shininess: 30 });
      g.add(bezel);

      const screen = box(w, h, 0.022, emitColor, {
        emissive: emitColor,
        emissiveIntensity: 0.8,
      });
      screen.position.z = 0.046;
      g.add(screen);

      // UI content bars
      const uiCols = [
        0x22d3ee, 0xe879f9, 0xfbbf24, 0x34d399, 0x60a5fa, 0xf87171,
      ];
      for (let i = 0; i < 6; i++) {
        const bw = w * (0.22 + Math.random() * 0.52);
        const bar = box(bw, 0.036, 0.018, uiCols[i], {
          emissive: uiCols[i],
          emissiveIntensity: 1.5,
        });
        bar.position.set(
          -w * 0.12 + (Math.random() - 0.5) * w * 0.25,
          h * 0.27 - i * h * 0.115,
          0.058,
        );
        g.add(bar);
      }

      // Stand
      const neck = box(0.07, 0.38, 0.07, 0x1e293b);
      neck.position.set(0, -(h / 2 + 0.2), 0);
      g.add(neck);
      const base = box(0.55, 0.04, 0.32, 0x1e293b);
      base.position.set(0, -(h / 2 + 0.41), 0.04);
      g.add(base);

      g.position.set(px, py, pz);
      g.rotation.y = ry;
      return g;
    }

    // Main ultrawide (center, behind person)
    pivot.add(makeMonitor(2.9, 1.6, 0x050f24, 0, 3.08, -0.85));
    // Left angled (shelf)
    pivot.add(makeMonitor(1.75, 1.08, 0x07102a, -2.3, 3.14, -0.65, 0.42));
    // Right angled (shelf)
    pivot.add(makeMonitor(1.75, 1.08, 0x07102a, 2.3, 3.14, -0.65, -0.42));
    // Vertical portrait (right side)
    pivot.add(makeMonitor(0.74, 1.48, 0x060d1e, 3.6, 2.92, 0.1, -0.58));

    /* ════════════ GADGETS ════════════ */

    // Keyboard
    const kb = box(1.38, 0.044, 0.46, 0x0c1522, { shininess: 22 });
    kb.position.set(-0.15, 1.572, 0.85);
    pivot.add(kb);
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 13; c++) {
        const key = box(0.08, 0.017, 0.068, 0x162030);
        key.position.set(-0.15 + (c - 6) * 0.096, 1.592, 0.82 + r * 0.086);
        pivot.add(key);
      }
    }

    // Mouse
    const mouseBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.068, 0.175, 6, 10),
      new THREE.MeshPhongMaterial({ color: 0x0e1828, shininess: 55 }),
    );
    mouseBody.rotation.x = Math.PI / 2;
    mouseBody.position.set(0.9, 1.604, 0.85);
    pivot.add(mouseBody);
    const scrollW = cyl(0.015, 0.015, 0.062, 8, 0x22d3ee, {
      emissive: 0x22d3ee,
      emissiveIntensity: 0.6,
    });
    scrollW.rotation.x = Math.PI / 2;
    scrollW.position.set(0.9, 1.642, 0.78);
    pivot.add(scrollW);

    // Wacom tablet
    const wacom = box(1.08, 0.036, 0.7, 0x0b1320, { shininess: 42 });
    wacom.position.set(-1.55, 1.556, 0.72);
    pivot.add(wacom);
    const activeArea = box(0.85, 0.018, 0.54, 0x0d2040, {
      emissive: 0x0a2245,
      emissiveIntensity: 0.55,
    });
    activeArea.position.set(-1.55, 1.576, 0.72);
    pivot.add(activeArea);
    const stylus = cyl(0.007, 0.011, 0.58, 6, 0xb0bec5, { shininess: 88 });
    stylus.rotation.z = 0.38;
    stylus.position.set(-1.08, 1.625, 0.6);
    pivot.add(stylus);

    // Coffee mug
    const mugG = new THREE.Group();
    mugG.add(cyl(0.1, 0.088, 0.23, 16, 0x1a1a2e, { shininess: 22 }));
    const mugHandle = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.013, 8, 14, Math.PI),
      new THREE.MeshPhongMaterial({ color: 0x1a1a2e }),
    );
    mugHandle.rotation.z = Math.PI / 2;
    mugHandle.position.set(0.12, 0, 0);
    mugG.add(mugHandle);
    const coffee = cyl(0.086, 0.086, 0.016, 16, 0x2d1306, {
      emissive: 0x1a0b03,
      emissiveIntensity: 0.22,
    });
    coffee.position.set(0, 0.092, 0);
    mugG.add(coffee);
    mugG.position.set(2.75, 1.684, 0.5);
    pivot.add(mugG);

    // Desk lamp
    const lampG = new THREE.Group();
    lampG.add(cyl(0.14, 0.17, 0.054, 16, 0x181828));
    const arm1 = box(0.037, 0.72, 0.037, 0x212133);
    arm1.position.set(0, 0.39, 0);
    arm1.rotation.z = 0.17;
    lampG.add(arm1);
    const arm2 = box(0.037, 0.56, 0.037, 0x212133);
    arm2.position.set(0.1, 0.9, 0);
    arm2.rotation.z = -0.32;
    lampG.add(arm2);
    const lampHead = cyl(0.14, 0.07, 0.16, 12, 0x282838, { shininess: 32 });
    lampHead.rotation.z = -1.08;
    lampHead.position.set(0.33, 1.18, 0);
    lampG.add(lampHead);
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.047, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffd580,
        transparent: true,
        opacity: 0.97,
      }),
    );
    bulb.position.set(0.42, 1.07, 0);
    lampG.add(bulb);
    lampG.position.set(2.2, 1.556, -0.22);
    pivot.add(lampG);

    // HDDs
    [0, 0.066].forEach((dy) => {
      const hdd = box(0.3, 0.056, 0.19, dy === 0 ? 0x0e1929 : 0x131e31);
      hdd.position.set(3.05, 1.606 + dy, -0.1);
      pivot.add(hdd);
    });
    const hddLed = box(0.016, 0.016, 0.016, 0x22d3ee, {
      emissive: 0x22d3ee,
      emissiveIntensity: 2.8,
    });
    hddLed.position.set(3.17, 1.643, 0.075);
    pivot.add(hddLed);

    // Headphones on stand
    const hpG = new THREE.Group();
    hpG.add(cyl(0.021, 0.021, 0.47, 8, 0x181826));
    const headband = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.021, 8, 22, Math.PI),
      new THREE.MeshPhongMaterial({ color: 0x111120, shininess: 42 }),
    );
    headband.rotation.z = Math.PI;
    headband.position.y = 0.23;
    hpG.add(headband);
    [-1, 1].forEach((s) => {
      const cup = cyl(0.07, 0.063, 0.04, 12, 0x0d1520);
      cup.rotation.z = Math.PI / 2;
      cup.position.set(s * 0.19, 0.23, 0);
      hpG.add(cup);
    });
    hpG.position.set(-3.1, 1.555, -0.22);
    pivot.add(hpG);

    // Sticky notes
    [0xfbbf24, 0x34d399, 0xf472b6].forEach((c, i) => {
      const note = box(0.23, 0.23, 0.007, c, {
        emissive: c,
        emissiveIntensity: 0.1,
      });
      note.position.set(-3.25 + i * 0.27, 2.13 + i * 0.03, -0.78);
      note.rotation.z = -0.07 + i * 0.1;
      pivot.add(note);
    });

    /* ════════════ PERSON (FRONT-FACING) ════════════ */

    // Character lighting — warm fill from front
    const charLight = new THREE.PointLight(0xffd0a0, 6, 5);
    charLight.position.set(0, 3.8, 2.5);
    scene.add(charLight);

    // Materials
    const skinMat = new THREE.MeshPhongMaterial({
      color: 0xc68642,        // warm tan skin
      emissive: 0x6b3a1f,
      emissiveIntensity: 0.18,
      shininess: 22,
    });
    const shirtMat = new THREE.MeshPhongMaterial({
      color: 0x1e3a5f,        // deep navy hoodie
      emissive: 0x0a1a30,
      emissiveIntensity: 0.15,
      shininess: 8,
    });
    const hairMat = new THREE.MeshPhongMaterial({
      color: 0x1a0e08,        // dark brown hair
      emissive: 0x0a0604,
      emissiveIntensity: 0.1,
      shininess: 30,
    });

    // Torso — person faces +Z (toward camera)
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.68, 0.3), shirtMat);
    torso.position.set(0, 2.18, 1.0);
    pivot.add(torso);

    const shouldersMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.18, 0.28),
      shirtMat,
    );
    shouldersMesh.position.set(0, 2.46, 1.0);
    pivot.add(shouldersMesh);

    const neckMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.092, 0.18, 8),
      skinMat,
    );
    neckMesh.position.set(0, 2.6, 1.0);
    pivot.add(neckMesh);

    // Head (front-facing)
    const headMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.215, 14, 14),
      skinMat,
    );
    headMesh.scale.y = 1.13;
    headMesh.position.set(0, 2.9, 0.97);
    pivot.add(headMesh);

    // Hair — cap on top of head
    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.222, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hairMat,
    );
    hairCap.position.set(0, 2.97, 0.95);
    pivot.add(hairCap);

    // Ears
    [-1, 1].forEach(s => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.042, 6, 6), skinMat);
      ear.position.set(s * 0.215, 2.88, 0.96);
      pivot.add(ear);
    });

    // Face details — eyes (on the FRONT face of the head, toward camera)
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x1a0e08 });
    [-0.075, 0.075].forEach((ex) => {
      const white = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 6), eyeWhiteMat);
      white.position.set(ex, 2.91, 1.17);   // front face of head
      pivot.add(white);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), eyePupilMat);
      pupil.position.set(ex, 2.91, 1.195);
      pivot.add(pupil);
    });

    // Subtle nose — front of head
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.018, 5, 5), skinMat);
    nose.scale.set(0.7, 0.5, 1);
    nose.position.set(0, 2.87, 1.19);
    pivot.add(nose);

    // Arms — reaching DOWN toward keyboard (rotation.x positive = tips go toward -z/keyboard)
    const lArm = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.063, 0.54, 4, 8),
      shirtMat,
    );
    lArm.rotation.z = 0.42;
    lArm.rotation.x = 0.62;   // tips reach toward keyboard at z=0.85
    lArm.position.set(-0.28, 2.04, 1.0);
    pivot.add(lArm);

    // Left hand — resting on keyboard
    const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 7, 7), skinMat);
    lHand.position.set(-0.28, 1.64, 0.82);
    pivot.add(lHand);

    const rArm = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.063, 0.54, 4, 8),
      shirtMat,
    );
    rArm.rotation.z = -0.38;
    rArm.rotation.x = 0.65;   // tips reach toward keyboard at z=0.85
    rArm.position.set(0.28, 2.04, 1.0);
    pivot.add(rArm);

    // Right hand — resting on keyboard
    const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.055, 7, 7), skinMat);
    rHand.position.set(0.28, 1.64, 0.82);
    pivot.add(rHand);

    // Chair
    const chairMat = new THREE.MeshPhongMaterial({
      color: 0x08101e,
      shininess: 14,
    });
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.076, 0.7),
      chairMat,
    );
    seat.position.set(0, 1.7, 1.28);
    pivot.add(seat);
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, 0.9, 0.07),
      chairMat,
    );
    back.position.set(0, 2.23, 0.64);
    pivot.add(back);
    [-1, 1].forEach((s) => {
      const armR = new THREE.Mesh(
        new THREE.BoxGeometry(0.058, 0.24, 0.54),
        chairMat,
      );
      armR.position.set(s * 0.4, 1.97, 1.28);
      pivot.add(armR);
    });
    const poleM = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 0.6, 8),
      chairMat,
    );
    poleM.position.set(0, 1.34, 1.28);
    pivot.add(poleM);
    for (let i = 0; i < 5; i++) {
      const spk = new THREE.Mesh(
        new THREE.BoxGeometry(0.38, 0.037, 0.057),
        chairMat,
      );
      spk.rotation.y = (i / 5) * Math.PI * 2;
      spk.position.set(0, 1.04, 1.28);
      pivot.add(spk);
    }

    /* ════════════ FLOATING ELEMENTS ════════════ */
    const swatchColors = [
      0xff6b6b, 0xffd93d, 0x6bcb77, 0x4d96ff, 0xe879f9, 0x22d3ee,
    ];
    const floaters = [];

    swatchColors.forEach((c, i) => {
      const angle = (i / swatchColors.length) * Math.PI * 2;
      const sw = box(0.12, 0.12, 0.01, c, {
        emissive: c,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.82,
      });
      sw.position.set(
        Math.cos(angle) * 4.3,
        2.6 + Math.sin(i * 1.4) * 0.5,
        Math.sin(angle) * 1.2,
      );
      sw.userData = {
        baseY: sw.position.y,
        phase: i * 1.05,
        speed: 0.5 + i * 0.07,
      };
      pivot.add(sw);
      floaters.push(sw);
    });

    const anchorMat2 = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    [
      [-4.1, 3.7, 0.5],
      [4.0, 3.4, 0.3],
      [-3.6, 2.4, 1.1],
      [3.8, 2.2, 0.9],
    ].forEach((pos, i) => {
      const a = new THREE.Mesh(new THREE.OctahedronGeometry(0.072), anchorMat2);
      a.position.set(...pos);
      a.userData = { baseY: pos[1], phase: i * 1.2 };
      pivot.add(a);
      floaters.push(a);
    });

    // Pen nib floating
    const nibG = new THREE.Group();
    const nibCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.072, 0.26, 4),
      new THREE.MeshPhongMaterial({
        color: 0xfbbf24,
        emissive: 0xfbbf24,
        emissiveIntensity: 0.38,
      }),
    );
    nibCone.rotation.z = Math.PI;
    nibG.add(nibCone);
    nibG.position.set(-4.4, 4.0, -0.4);
    nibG.userData = { baseY: 4.0, phase: 0.6 };
    pivot.add(nibG);
    floaters.push(nibG);

    /* ════════════ DUST PARTICLES ════════════ */
    const dustCount = 140;
    const dPos = new Float32Array(dustCount * 3);
    const dCol = new Float32Array(dustCount * 3);
    const pal = [
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x6d28d9),
      new THREE.Color(0x1e3a5c),
      new THREE.Color(0xfbbf24),
    ];
    for (let i = 0; i < dustCount; i++) {
      dPos[i * 3] = (Math.random() - 0.5) * 11;
      dPos[i * 3 + 1] = Math.random() * 5.5 + 0.3;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      const c = pal[Math.floor(Math.random() * pal.length)];
      dCol[i * 3] = c.r;
      dCol[i * 3 + 1] = c.g;
      dCol[i * 3 + 2] = c.b;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dCol, 3));
    scene.add(
      new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          size: 0.022,
          vertexColors: true,
          transparent: true,
          opacity: 0.46,
          sizeAttenuation: true,
        }),
      ),
    );

    /* ════════════ INTERACTION ════════════ */
    // Orbit state
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    const angVel = { x: 0, y: 0 }; // inertia
    let autoRotate = true;
    let idleTimer = null;

    // Zoom state
    let zoomTarget = 7.5;
    const ZOOM_MIN = 4.0;
    const ZOOM_MAX = 12.0;

    const resetIdleTimer = () => {
      autoRotate = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };

    // Mouse drag
    const onMouseDown = (e) => {
      isDragging = true;
      autoRotate = false;
      clearTimeout(idleTimer);
      prevPointer = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPointer.x;
      const dy = e.clientY - prevPointer.y;
      angVel.y = dx * 0.006;
      angVel.x = dy * 0.004;
      const q = new THREE.Quaternion();
      q.setFromEuler(new THREE.Euler(angVel.x, angVel.y, 0, "XYZ"));
      pivot.quaternion.premultiply(q);
      prevPointer = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
      el.style.cursor = "grab";
      resetIdleTimer();
    };

    // Touch drag
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        autoRotate = false;
        clearTimeout(idleTimer);
        prevPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevPointer.x;
      const dy = e.touches[0].clientY - prevPointer.y;
      angVel.y = dx * 0.006;
      angVel.x = dy * 0.004;
      const q = new THREE.Quaternion();
      q.setFromEuler(new THREE.Euler(angVel.x, angVel.y, 0, "XYZ"));
      pivot.quaternion.premultiply(q);
      prevPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
      resetIdleTimer();
    };

    // Scroll zoom
    const onWheel = (e) => {
      e.preventDefault();
      zoomTarget += e.deltaY * 0.008;
      zoomTarget = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomTarget));
      resetIdleTimer();
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    el.addEventListener("wheel", onWheel, { passive: false });

    el.style.cursor = "grab";

    /* ════════════ ANIMATE ════════════ */
    let frame;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth zoom
      const camDist = camera.position.z;
      camera.position.z += (zoomTarget - camDist) * 0.08;

      // Auto-rotate (slow Y spin when idle)
      if (autoRotate && !isDragging) {
        const q = new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(0, 0.004, 0, "XYZ"));
        pivot.quaternion.premultiply(q);
      }

      // Inertia decay
      if (!isDragging) {
        angVel.x *= 0.88;
        angVel.y *= 0.88;
        if (Math.abs(angVel.x) > 0.0001 || Math.abs(angVel.y) > 0.0001) {
          const q = new THREE.Quaternion();
          q.setFromEuler(new THREE.Euler(angVel.x, angVel.y, 0, "XYZ"));
          pivot.quaternion.premultiply(q);
        }
      }

      // Monitor glow pulse
      monGlow.intensity = 9 + Math.sin(t * 0.85) * 1.5;

      // Lamp flicker
      lampSpot.intensity = 24 + Math.sin(t * 9) * 0.6;

      // LED hue shift
      const hue = (t * 0.04) % 1;
      const ledColor = new THREE.Color().setHSL(hue, 0.9, 0.52);
      led.material.color.set(ledColor);
      led.material.emissive.set(ledColor);

      // HDD LED blink
      hddLed.material.emissiveIntensity = Math.sin(t * 5.5) > 0.55 ? 4 : 0.2;

      // Typing animation
      headMesh.position.y = 2.9 + Math.sin(t * 2.2) * 0.006;
      lArm.position.z = 1.0 + Math.sin(t * 3.5) * 0.012;
      rArm.position.z = 1.0 + Math.sin(t * 3.5 + 1.2) * 0.012;

      // Eye glow pulse
      const eyeGlow = 0.5 + Math.sin(t * 1.5) * 0.3;
      // (eyes are MeshBasicMaterial, color is constant — nice as-is)

      // Floaters
      floaters.forEach((f) => {
        f.position.y =
          f.userData.baseY +
          Math.sin(t * (f.userData.speed || 0.6) + f.userData.phase) * 0.11;
        f.rotation.y += 0.012;
        f.rotation.z += 0.006;
      });

      // Mug rock
      mugG.rotation.z = Math.sin(t * 0.38) * 0.012;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idleTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      title="Drag to rotate · Scroll to zoom"
      style={{ background: "transparent", userSelect: "none" }}
    />
  );
}
