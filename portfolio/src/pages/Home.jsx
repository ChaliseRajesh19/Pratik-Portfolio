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