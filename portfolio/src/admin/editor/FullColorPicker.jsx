import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Check, X, RotateCcw, Sparkles } from 'lucide-react';

const BRAND_SWATCHES = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Brand Orange', hex: '#ff6b35' },
  { name: 'Brand Blue', hex: '#1e90ff' },
  { name: 'Muted Zinc', hex: '#a1a1aa' },
  { name: 'Success Green', hex: '#22c55e' },
  { name: 'Warning Amber', hex: '#f59e0b' },
  { name: 'Danger Red', hex: '#ef4444' },
  { name: 'Accent Purple', hex: '#a855f7' },
];

export default function FullColorPicker({
  title = 'Color Picker',
  color = '#ffffff',
  onChange,
  onClear,
  onClose
}) {
  const [activeColor, setActiveColor] = useState(color || '#ffffff');
  const [colorMode, setColorMode] = useState('hex'); // 'hex' | 'rgb' | 'hsl'
  const [recentColors, setRecentColors] = useState(() => {
    try {
      const saved = localStorage.getItem('pb_recent_colors');
      return saved ? JSON.parse(saved) : ['#ff6b35', '#1e90ff', '#22c55e', '#a855f7', '#ffffff', '#050505'];
    } catch {
      return ['#ff6b35', '#1e90ff', '#22c55e', '#a855f7'];
    }
  });

  useEffect(() => {
    if (color && color !== 'transparent') {
      setActiveColor(color);
    }
  }, [color]);

  const saveRecentColor = (hex) => {
    if (!hex || hex === 'transparent') return;
    setRecentColors((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== hex.toLowerCase());
      const updated = [hex, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('pb_recent_colors', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not save recent colors', err);
      }
      return updated;
    });
  };

  const handleSelectColor = (hex) => {
    setActiveColor(hex);
    saveRecentColor(hex);
    if (onChange) onChange(hex);
  };

  const handleClearColor = () => {
    if (onClear) onClear();
    if (onClose) onClose();
  };

  // Convert Hex to RGB
  const getRgbString = (hex) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return 'rgb(255, 255, 255)';
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Convert Hex to HSL
  const getHslString = (hex) => {
    const cleanHex = hex.replace('#', '');
    if (cleanHex.length !== 6) return 'hsl(0, 0%, 100%)';
    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const getDisplayValue = () => {
    if (colorMode === 'rgb') return getRgbString(activeColor);
    if (colorMode === 'hsl') return getHslString(activeColor);
    return activeColor;
  };

  return (
    <div className="full-color-picker p-4 bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl w-72 text-zinc-100 z-50 animate-in fade-in zoom-in-95 duration-150 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800">
        <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={13} className="text-indigo-400" /> {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-200 p-1 rounded-md hover:bg-zinc-800 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Wheel / Canvas Picker (react-colorful) */}
      <div className="mb-4 color-picker-wrapper flex justify-center">
        <HexColorPicker
          color={activeColor}
          onChange={(newColor) => {
            setActiveColor(newColor);
            if (onChange) onChange(newColor);
          }}
          className="w-full !w-full !h-36 rounded-xl overflow-hidden"
        />
      </div>

      {/* Color Mode Switcher & Inputs */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between gap-1 p-1 bg-zinc-950 rounded-lg border border-zinc-800">
          {['hex', 'rgb', 'hsl'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setColorMode(mode)}
              className={`flex-1 py-1 text-[10px] font-mono font-semibold uppercase rounded transition-colors ${
                colorMode === mode ? 'bg-indigo-600 text-white shadow' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Live Code Input */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg border border-zinc-700 shrink-0 shadow-inner"
            style={{ backgroundColor: activeColor }}
          />
          <input
            type="text"
            value={getDisplayValue()}
            onChange={(e) => {
              const val = e.target.value;
              setActiveColor(val);
              if (/^#[0-9a-f]{6}$/i.test(val)) {
                handleSelectColor(val);
              }
            }}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      {/* Brand Swatches Row */}
      <div className="space-y-1.5 mb-3">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Brand Swatches</span>
        <div className="grid grid-cols-8 gap-1.5">
          {BRAND_SWATCHES.map((swatch) => (
            <button
              key={swatch.hex}
              type="button"
              onClick={() => handleSelectColor(swatch.hex)}
              title={swatch.name}
              className={`w-6 h-6 rounded-md border transition-transform hover:scale-110 flex items-center justify-center ${
                activeColor.toLowerCase() === swatch.hex.toLowerCase()
                  ? 'border-white ring-2 ring-indigo-500/50'
                  : 'border-zinc-700'
              }`}
              style={{ backgroundColor: swatch.hex }}
            >
              {activeColor.toLowerCase() === swatch.hex.toLowerCase() && (
                <Check size={12} className={swatch.hex === '#ffffff' ? 'text-black' : 'text-white'} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Colors Row */}
      {recentColors.length > 0 && (
        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Recent Colors</span>
          <div className="flex flex-wrap gap-1.5">
            {recentColors.map((hex, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectColor(hex)}
                title={hex}
                className="w-5 h-5 rounded-md border border-zinc-700 hover:scale-110 transition-transform"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleClearColor}
          className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-red-400 transition-colors"
        >
          <RotateCcw size={12} /> Clear Color
        </button>

        <button
          type="button"
          onClick={() => {
            saveRecentColor(activeColor);
            if (onChange) onChange(activeColor);
            if (onClose) onClose();
          }}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
