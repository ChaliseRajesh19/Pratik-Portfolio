import React from 'react'
import ProfileImage from '../assets/Profile.png'

function About({ withTopOffset = true }) {
  const sectionClassName = `min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-16 md:py-24 ${withTopOffset ? 'mt-16' : 'mt-0'}`

  return (
    <section className={sectionClassName}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* About Me - Left Side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-cyan-500 mb-8"></div>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              I am a Graphics Designer and Video Editor with 3+ years of experience delivering impactful visual content for brands worldwide. My work balances creative vision with strategic thinking to help businesses build strong visual identities, engage their audiences, and communicate their message through high-quality design and video.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              From branding and social media creatives to marketing visuals, professional video editing, and motion-based content, I deliver modern, results-driven solutions tailored to each client’s goals. Every project is handled with attention to detail, thoughtful storytelling, and a commitment to quality.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              My mission is to transform ideas into compelling visuals and videos that elevate brands, strengthen online presence, and leave a lasting impression.
            </p>
          </div>

          {/* Photo - Right Side */}
          <div className="flex justify-center md:justify-end">
            <div className="relative max-w-md w-full">
              <div className="absolute -inset-3 rounded-2xl border border-cyan-500/20"></div>
              <img
                src={ProfileImage}
                alt="Pratik Bhusal"
                className="relative w-full h-auto rounded-2xl object-cover border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About