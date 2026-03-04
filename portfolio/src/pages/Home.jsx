import React from 'react';
import ProfileImage from '../assets/Profile.png';
import About from './About';
import Skills from './Skills';
import Service from './Service';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Blog from './Blog';

function Home() {

  const handlehireClick = () => {
    window.location.href = 'mailto:rajeshchalise19@gmail.com';
  };

  const handleportfolio = () => {
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    window.location.href = '/portfolio';
  };

  return (
    <main>
      <section id="home" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 mt-16 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi,There I am Pratik Bhusal <br />
            </h1>

            <p className="mt-6 text-slate-400 max-w-xl">
              A <span className="font-semibold text-yellow-500">Graphics Designer</span> with <span className="font-semibold text-yellow-500">3+ </span> years of experience delivering impactful designs
              for brands worldwide.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-bold text-cyan-400">3+</p>
                <p className="text-slate-400 text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">500+</p>
                <p className="text-slate-400 text-sm">Projects Done</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">100+</p>
                <p className="text-slate-400 text-sm">Happy Clients</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex gap-4">
              <button
              onClick={handlehireClick}
              className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition">
                Hire Me
              </button>
              <button
              onClick={handleportfolio}
              className="px-6 py-3 rounded-xl border border-slate-700 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition">
                View Portfolio
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center">
            <div className="absolute -top-6 -left-6 w-8 h-8 rounded-full border border-cyan-500/40" />
            <div className="absolute -bottom-6 -right-6 w-6 h-6 rounded-full bg-cyan-500/50 blur-sm" />
            <div className="relative perspective-[1000px] float-slow">
              <img 
                src={ProfileImage}
                alt="Profile"
                className="w-72 h-72 md:w-80 md:h-80 rounded-full object-contain bg-slate-900/60 border-4 border-cyan-500/30 ring-2 ring-cyan-400/20 shadow-2xl shadow-cyan-500/30 transform will-change-transform transition-transform duration-300 hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105"
              />
            </div>

            <span className="absolute bottom-1 right-1 text-xs bg-slate-800/80 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
              Available for Hire
            </span>
          </div>
        </div>
      </section>

      <div id="about" className="scroll-mt-24">
        <About withTopOffset={false} />
      </div>

      <div id="skills" className="scroll-mt-24">
        <Skills withTopOffset={false} />
      </div>

      <div id="service" className="scroll-mt-24">
        <Service withTopOffset={false} />
      </div>

      <div id="portfolio" className="scroll-mt-24">
        <Portfolio withTopOffset={false} />
      </div>

      <div id="blog" className="scroll-mt-24">
        <Blog withTopOffset={false} />
      </div>

      <div id="contact" className="scroll-mt-24">
        <Contact withTopOffset={false} />
      </div>
    </main>
  );
}

export default Home;