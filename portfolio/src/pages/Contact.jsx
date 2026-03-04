import React from 'react'
import SocialMedia from '../components/SocialMedia';

function Contact({ withTopOffset = true }) {
  const whatsappNumber = '9779800722127'
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  })

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

  return (
    <section className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 ${withTopOffset ? 'mt-16' : 'mt-0'}`}>
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-indigo-300">Lets build something</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Contact Me</h2>
          <p className="text-slate-300 mt-4">
            Tell me about your project, goals, and timeline. I will reply within 24-48 hours.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          {/* Contact form */}
          <div className="lg:col-span-2 rounded-2xl border border-indigo-500/40 bg-slate-900/70 backdrop-blur p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold">Send a message</h3>
                <p className="text-slate-300 text-sm mt-2">Project inquiries and collaborations are welcome.</p>
              </div>
              <div className="rounded-full border border-indigo-500/40 px-4 py-2 text-sm text-indigo-200">
                Availability: Taking new work
              </div>
            </div>

            <form
            onSubmit={handleContact}
            className="mt-8 grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <label className="grid gap-2 text-sm text-slate-200">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
                <label className="grid gap-2 text-sm text-slate-200">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <label className="grid gap-2 text-sm text-slate-200">
                  Project type
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>Choose one</option>
                    <option>Logo Design</option>
                    <option>Print Design/ SaaS</option>
                    <option>Social Media,Banner,Poster</option>
                    <option>Video Editing</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-slate-200">
                  Budget
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="" disabled>Select a range</option>
                    <option>$500 - $1,500</option>
                    <option>$1,500 - $3,000</option>
                    <option>$3,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm text-slate-200">
                Message
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your goals, timeline, and any must-haves."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-xs text-slate-400">
                  By submitting, you agree to receive a response related to your inquiry.
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right side panel */}
          <div className="rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-indigo-900/60 to-slate-900/70 p-8 shadow-xl flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-semibold">Contact details</h3>
              <p className="text-slate-300 text-sm mt-2">Prefer a quick chat? Reach me directly.</p>
              <div className="mt-5 grid gap-3 text-sm text-slate-200">
                <div className="flex items-center justify-between border border-slate-700/60 rounded-lg px-4 py-3">
                  <span>Email</span>
                  <span className="text-indigo-200">pratikbhusal02@gmail.com</span>
                </div>
                <div className="flex items-center justify-between border border-slate-700/60 rounded-lg px-4 py-3">
                  <span>Phone</span>
                  <span className="text-indigo-200">+977 9800000000</span>
                </div>
                <div className="flex items-center justify-between border border-slate-700/60 rounded-lg px-4 py-3">
                  <span>Location</span>
                  <span className="text-indigo-200">Chandrauta, Nepal</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-5">
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">What I deliver</h4>
              <ul className="mt-4 grid gap-3 text-sm text-slate-200">
                <li className="flex items-center gap-2">- Fast, responsive UI</li>
                <li className="flex items-center gap-2">- Eye-catching designs</li>
                <li className="flex items-center gap-2">- Growth-ready design system</li>
              </ul>
            </div>

            <div className="rounded-xl bg-indigo-950/60 border border-indigo-500/30 p-5">
              <h4 className="text-sm uppercase tracking-[0.2em] text-indigo-300">Connect</h4>
              <div className="mt-4">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact