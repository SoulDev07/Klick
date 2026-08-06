import React, { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, X } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Sponsor', to: 'https://buymeacoffee.com/devsterxyz' },
  { label: 'Req animation', to: '#request-animation' },
  { label: 'Github', to: 'https://github.com/devsterxyz/Klick' },
]

const linkClass =
  'w-fit text-sm font-medium text-black/60 transition hover:text-black dark:text-white/60 dark:hover:text-white'

const animationCategories = [
  'Click animation',
  'Cursor effect',
  'Page transition',
  'Micro interaction',
  'Other',
]

const FooterLink = ({
  label,
  to,
  onRequestAnimation,
}: {
  label: string
  to: string
  onRequestAnimation?: () => void
}) => {
  const isExternal = to.startsWith('http')

  if (label === 'Req animation') {
    return (
      <button type="button" onClick={onRequestAnimation} className={linkClass}>
        {label}
      </button>
    )
  }

  if (isExternal) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={linkClass}>
        {label}
      </a>
    )
  }

  return (
    <Link to={to} className={linkClass}>
      {label}
    </Link>
  )
}

const Footer2 = () => {
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!isRequestOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsRequestOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isRequestOpen])

  return (
    <footer className="relative w-full bg-transparent text-black dark:text-white font-pixel">
      <div className="w-full overflow-hidden border-y border-neutral-200/60 bg-white/80 dark:border-white/20 dark:bg-black lg:border-x">
        <div className="grid gap-10 px-8 py-10 sm:px-12 md:grid-cols-4 md:gap-8 lg:px-16 lg:py-12">
          <section className="flex items-center md:justify-center">
            <Link to="/" className="font-geist-pixel text-[40px] font-semibold tracking-wider text-black dark:text-white">
              Klick
            </Link>
          </section>

          <section>
            <h2 className="text-base font-semibold">Quick Links</h2>
            <nav className="mt-5 flex flex-col gap-4" aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  label={link.label}
                  to={link.to}
                  onRequestAnimation={() => setIsRequestOpen(true)}
                />
              ))}
            </nav>
          </section>

          <section>
            <h2 className="text-base font-semibold">Sponsor</h2>
            <div className="mt-5">
              <a
                href="https://buymeacoffee.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                Buy me a coffee
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold">Connect</h2>
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://github.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/20 bg-white/40 text-black transition hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.05]"
              >
                <GithubIcon size={19} className="cursor-default" />
              </a>
              <a
                href="https://x.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on X"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-black/20 bg-white/40 text-black transition hover:border-black/40 hover:bg-black/[0.03] dark:border-white/20 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/[0.05]"
              >
                <TwitterXIcon size={19} className="cursor-default" />
              </a>
            </div>
          </section>
        </div>

        <div className="border-t border-neutral-200/60 px-8 py-6 text-md font-medium text-black/60 dark:border-white/10 dark:text-white/60 sm:px-12 lg:px-16">
          <a href="https://github.com/devsterxyz" target="_blank" rel="noreferrer" className="cursor-default">
            © 2026 klick. Built by Dev | Crafted with care.
          </a> 
        </div>
      </div>

      {isRequestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 px-4 py-8 backdrop-blur-sm dark:bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={() => setIsRequestOpen(false)}
        >
          <form
            className="w-full max-w-lg border border-black/15 bg-white p-5 text-black shadow-[8px_8px_0_rgba(0,0,0,0.12)] dark:border-white/20 dark:bg-black dark:text-white dark:shadow-[8px_8px_0_rgba(255,255,255,0.08)] sm:p-6"
            onSubmit={(event) => event.preventDefault()}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="font-geist-pixel text-2xl font-semibold tracking-wide">
                Request Animation
              </h2>
              <button
                type="button"
                aria-label="Close request animation form"
                onClick={() => setIsRequestOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 text-black/70 transition hover:border-black/40 hover:bg-black/[0.04] hover:text-black dark:border-white/20 dark:text-white/70 dark:hover:border-white/40 dark:hover:bg-white/[0.06] dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-black/75 dark:text-white/75">
                Category
                <select
                  required
                  defaultValue=""
                  className="h-11 w-full rounded-lg border border-black/15 bg-white px-3 font-sans text-sm text-black outline-none transition focus:border-black/50 focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:bg-black dark:text-white dark:focus:border-white/50 dark:focus:ring-white/15"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {animationCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-medium text-black/75 dark:text-white/75">
                Description
                <textarea
                  required
                  rows={5}
                  placeholder="Links, references, notion doc or what the animation should do..."
                  className="min-h-32 w-full resize-y rounded-lg border border-black/15 bg-white px-3 py-3 font-sans text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black/50 focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/50 dark:focus:ring-white/15"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-black/75 dark:text-white/75">
                GitHub Username <span className="text-black/40 dark:text-white/40">(optional)</span>
                <div className="flex h-11 items-center rounded-lg border border-black/15 bg-white px-3 transition focus-within:border-black/50 focus-within:ring-2 focus-within:ring-black/10 dark:border-white/20 dark:bg-black dark:focus-within:border-white/50 dark:focus-within:ring-white/15">
                  <span className="font-sans text-sm text-black/35 dark:text-white/35">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    className="h-full min-w-0 flex-1 bg-transparent pl-2 font-sans text-sm text-black outline-none placeholder:text-black/35 dark:text-white dark:placeholder:text-white/35"
                  />
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-black bg-black px-4 font-pixel text-sm font-semibold text-white transition hover:bg-black/85 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/85"
            >
              <Send size={16} />
              Submit Request
            </button>
          </form>
        </div>
      )}
    </footer>
  )
}

export default Footer2
