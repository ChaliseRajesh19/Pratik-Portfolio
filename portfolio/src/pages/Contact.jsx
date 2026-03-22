import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaLinkedin, FaFacebook, FaTwitter, FaChevronDown } from 'react-icons/fa'
import { SectionHeader } from '../components/SectionHeader'

// ── CUSTOM ANIMATED SELECT COMPONENT ──
const CustomSelect = ({ label, options, value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative group" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-xl border ${isOpen ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-blue-900/40'} bg-[#020617]/60 px-4 pt-6 pb-2 text-left focus:outline-none transition-all duration-300 cursor-pointer flex justify-between items-center backdrop-blur-md hover:border-blue-500/50 min-h-[56px]`}
      >
        {/* Only render the value text when a value is actually selected */}
        <span className="text-slate-100 font-medium">
          {value || ''}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <FaChevronDown className={`text-sm transition-colors ${isOpen ? 'text-blue-400' : 'text-slate-500'}`} />
        </motion.div>
      </button>

      {/* Label: floats to top when value selected or open, otherwise acts as centered placeholder */}
      <span className={`absolute left-4 transition-all duration-200 pointer-events-none font-bold uppercase tracking-widest ${
        value || isOpen
          ? 'top-2 text-[10px] text-blue-400'
          : 'top-1/2 -translate-y-1/2 text-xs text-slate-400'
      }`}>
        {label}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, rotateX: -15 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
            style={{ transformOrigin: 'top' }}
            className="absolute z-[100] mt-2 w-full rounded-2xl border border-blue-500/30 bg-[#020617]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {options.map((option, idx) => (
              <motion.li
                key={option}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => {
                  onChange({ target: { name, value: option } })
                  setIsOpen(false)
                }}
                className="px-5 py-3.5 text-sm font-medium text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 cursor-pointer transition-colors border-b border-blue-900/30 last:border-0 relative overflow-hidden group/opt"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent translate-x-[-100%] group-hover/opt:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">{option}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}


function Contact({ withTopOffset = true }) {
  const whatsappNumber = '9779800722127'
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  })
  const [hoveringSubmit, setHoveringSubmit] = React.useState(false)

  // 3D Tilt effect state for the contact card
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    setTilt({
      x: ((y - centerY) / centerY) * -10,
      y: ((x - centerX) / centerX) * 10
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContact = (event) => {
    event.preventDefault()
    const text = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project type: ${formData.projectType || 'Not specified'}`,
      `Budget: ${formData.budget || 'Not specified'}`,
      `Message: ${formData.message || 'Not specified'}`
    ].join('\n')

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const projectOptions = [
    "Logo Design",
    "Print Design / SaaS",
    "Social Media, Banner, Poster",
    "Video Editing",
  ]

  const budgetOptions = [
    "NPR 50,000 - NPR 150,000",
    "NPR 150,000 - NPR 300,000",
    "NPR 300,000 - NPR 500,000",
    "NPR 500,000+",
  ]

  return (
    <section className={`relative min-h-screen overflow-hidden bg-[#020617] text-slate-100 py-12 md:py-20 ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
      
      {/* Premium Deep Blue Abstract Glows */}
      <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <SectionHeader
          label="Let's Build Something"
          title="Contact Me"
          subtitle="Tell me about your project, goals, and timeline. I will reply within 24-48 hours."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* ── LEFT: Form Panel (3 Columns Wide) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 rounded-[2rem] border border-blue-900/30 bg-[#020617]/40 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-600 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 text-sm">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Send a message</h3>
                <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-300 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60A5FA] animate-pulse" />
                  Available for freelance
                </div>
              </div>

              <form onSubmit={handleContact} className="grid gap-6">
                
                <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                  {/* Floating label inputs */}
                  <div className="relative group">
                    <input
                      type="text" name="name" id="name" required value={formData.name} onChange={handleChange}
                      className="block w-full rounded-xl border border-blue-900/40 bg-[#020617]/60 px-4 pt-6 pb-2 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/50 outline-none transition-all duration-300 peer backdrop-blur-md"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="absolute left-4 top-4 text-xs font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400">
                      Your Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="email" name="email" id="email" required value={formData.email} onChange={handleChange}
                      className="block w-full rounded-xl border border-blue-900/40 bg-[#020617]/60 px-4 pt-6 pb-2 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/50 outline-none transition-all duration-300 peer backdrop-blur-md"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="absolute left-4 top-4 text-xs font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400">
                      Email Address
                    </label>
                  </div>
                </div>

                {/* CRITICAL BUG FIX: Added z-50 to this wrapper so dropdowns render over the textarea */}
                <div className="grid sm:grid-cols-2 gap-6 relative z-50">
                  <CustomSelect
                    label="Project Type"
                    name="projectType"
                    options={projectOptions}
                    value={formData.projectType}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    label="Budget"
                    name="budget"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative group z-10">
                  <textarea
                    name="message" id="message" rows="5" required value={formData.message} onChange={handleChange}
                    className="block w-full rounded-xl border border-blue-900/40 bg-[#020617]/60 px-4 pt-6 pb-2 text-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hover:border-blue-500/50 outline-none transition-all duration-300 peer resize-none backdrop-blur-md"
                    placeholder=" "
                  />
                  <label htmlFor="message" className="absolute left-4 top-4 text-xs font-bold text-slate-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400">
                    Message Details
                  </label>
                </div>

                {/* 3D Glowing Premium Submit Button */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-8 z-10">
                  <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed">
                    By submitting, you agree to receive a response related to your project inquiry.
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-[2px] rounded-2xl bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300"
                  >
                    <button type="submit" className="relative flex items-center justify-center gap-3 rounded-2xl bg-[#020617] px-8 py-4 text-sm font-black tracking-widest uppercase text-white overflow-hidden group w-full hover:bg-slate-900/60 transition-colors backdrop-blur-sm">
                      <span className="relative z-10">Send Message</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Details Panel (2 Columns Wide) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 hidden lg:flex flex-col gap-6"
            style={{ perspective: 1000 }}
          >
            {/* 3D Tilting Info Card */}
            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="rounded-[2rem] border border-blue-900/30 bg-[#020617]/40 backdrop-blur-xl p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-full"
            >
              {/* Inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-[2rem] pointer-events-none" />
              
              <h3 className="text-xl font-black text-white mb-8" style={{ transform: 'translateZ(30px)' }}>Contact Details</h3>
              
              <div className="grid gap-5" style={{ transform: 'translateZ(20px)' }}>
                <a href="mailto:pratikbhusal02@gmail.com" className="group/item flex flex-col p-5 rounded-2xl border border-blue-900/30 bg-[#020617]/50 hover:bg-blue-900/20 hover:border-blue-500/50 transition-all duration-300">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 group-hover/item:text-blue-400 transition-colors">Email</span>
                  <span className="text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors">pratikbhusal02@gmail.com</span>
                </a>
                
                <div className="flex flex-col p-5 rounded-2xl border border-blue-900/30 bg-[#020617]/50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Phone</span>
                  <span className="text-sm font-bold text-slate-200">+977 9800000000</span>
                </div>
                
                <div className="flex flex-col p-5 rounded-2xl border border-blue-900/30 bg-[#020617]/50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Location</span>
                  <span className="text-sm font-bold text-slate-200">Chandrauta, Nepal</span>
                </div>
              </div>
            </motion.div>

            {/* Social Connect */}
            <motion.div 
              className="rounded-[2rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-indigo-900/10 p-8 backdrop-blur-xl shadow-xl"
            >
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold mb-6">Social Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: FaFacebook, href: 'https://facebook.com/creativepratik22' },
                  { icon: FaLinkedin, href: 'https://linkedin.com/in/creativepratik22/' },
                  { icon: FaTwitter, href: 'https://twitter.com/creativepratik_' },
                  { icon: FaInstagram, href: 'https://instagram.com/creativepratik22' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#020617] border border-blue-900/50 hover:border-blue-400 hover:bg-blue-900/30 hover:text-blue-400 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-1.5"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}


export default Contact
