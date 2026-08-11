import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
}

function FieldGroup({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <input
      type={type}
      required={required}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3, required = false }) {
  return (
    <textarea
      required={required}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all resize-y"
    />
  )
}

export default function SettingsView({ initialSettings, onSave, showToast }) {
  const [settings, setSettings] = useState({ ...initialSettings })
  const [isDirty, setIsDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState(null)

  useEffect(() => {
    setSettings({ ...initialSettings })
    setIsDirty(false)
  }, [initialSettings])

  const update = (field, val) => {
    setSettings(prev => ({ ...prev, [field]: val }))
    setIsDirty(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(settings)
      setIsDirty(false)
      setSavedAt(new Date())
      if (showToast) showToast('Settings saved successfully', 'success')
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('portfolio_content_updated'))
      }
    } catch (err) {
      if (showToast) showToast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <motion.form
      variants={fadeUp}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      className="space-y-8 pb-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">Site Settings</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage global site configuration</p>
        </div>
        <div className="flex items-center gap-3">
          {savedAt && !isDirty && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-zinc-500"
            >
              Saved {savedAt.toLocaleTimeString()}
            </motion.span>
          )}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              isDirty
                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                : 'bg-zinc-800 text-zinc-400 cursor-default'
            }`}
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Settings'}
            {isDirty && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Metadata & Header */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800">
            Metadata & Header
          </h3>

          <FieldGroup label="Website Title">
            <TextInput
              value={settings.siteTitle}
              onChange={(v) => update('siteTitle', v)}
              required
            />
          </FieldGroup>

          <FieldGroup label="Default Meta Description">
            <TextArea
              value={settings.metaDescription}
              onChange={(v) => update('metaDescription', v)}
              required
            />
          </FieldGroup>

          <FieldGroup label="Homepage Hero Title">
            <TextInput
              value={settings.homepageHeadline}
              onChange={(v) => update('homepageHeadline', v)}
              required
            />
          </FieldGroup>
        </div>

        {/* Social & Contact */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800">
            Social Channels & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Instagram">
              <TextInput
                value={settings.instagram}
                onChange={(v) => update('instagram', v)}
                placeholder="https://instagram.com/..."
                required
              />
            </FieldGroup>

            <FieldGroup label="Facebook">
              <TextInput
                value={settings.facebook}
                onChange={(v) => update('facebook', v)}
                placeholder="https://facebook.com/..."
                required
              />
            </FieldGroup>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Behance">
              <TextInput
                value={settings.behance}
                onChange={(v) => update('behance', v)}
                placeholder="https://behance.net/..."
                required
              />
            </FieldGroup>

            <FieldGroup label="LinkedIn">
              <TextInput
                value={settings.linkedin}
                onChange={(v) => update('linkedin', v)}
                placeholder="https://linkedin.com/in/..."
                required
              />
            </FieldGroup>
          </div>

          <FieldGroup label="Contact Email">
            <TextInput
              value={settings.contactEmail}
              onChange={(v) => update('contactEmail', v)}
              type="email"
              required
            />
          </FieldGroup>

          <FieldGroup label="CV / Resume PDF File URL">
            <TextInput
              value={settings.cvUrl}
              onChange={(v) => update('cvUrl', v)}
              placeholder="/cv/pratik-bhusal-cv.pdf"
            />
          </FieldGroup>
        </div>
      </div>

      {/* About Biography */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800">
          About Page Overrides
        </h3>

        <FieldGroup label="About Hero Title">
          <TextInput
            value={settings.aboutHeroText}
            onChange={(v) => update('aboutHeroText', v)}
            required
          />
        </FieldGroup>

        <FieldGroup label="Biography Text">
          <TextArea
            value={settings.aboutBio}
            onChange={(v) => update('aboutBio', v)}
            rows={6}
            required
          />
        </FieldGroup>
      </div>
    </motion.form>
  )
}
