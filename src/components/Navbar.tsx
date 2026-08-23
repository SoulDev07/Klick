import React, { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import GithubIcon from './icons/GithubIcon'
import TwitterXIcon from './icons/TwitterXIcon'
import BrightnessDownIcon from './icons/BrightnessDownIcon'
import { useTheme } from './ThemeContext'
import { Link, useLocation } from 'react-router-dom'

const GITHUB_REPO = 'devsterxyz/Klick'

const StarIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

type NavbarProps = {
  effectSearchQuery: string
  onEffectSearchQueryChange: (query: string) => void
}

const Navbar = ({
  effectSearchQuery,
  onEffectSearchQueryChange,
}: NavbarProps) => {
  const { theme, toggleTheme } = useTheme()
  const [stars, setStars] = useState<number | null>(null)
  const shortcutLabel = 'Ctrl K'
  const location = useLocation()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isHome = location.pathname === '/'
  const normalizedQuery = effectSearchQuery.trim().toLowerCase()

  useEffect(() => {
    if (!isHome) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInputRef.current?.focus()
        searchInputRef.current?.select()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isHome])

  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub fetch failed')
        return res.json()
      })
      .then((data) => {
        if (active && typeof data?.stargazers_count === 'number') {
          setStars(data.stargazers_count)
        }
      })
      .catch(() => {
        if (active) setStars(null)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full border-b border-black/20 dark:border-white/20 backdrop-blur-sm sm:h-20">
        <div className="h-full max-w-8xl mx-auto border-black/20 dark:border-white/20 lg:border-x">
          <div className="flex h-full items-center justify-between gap-2 px-3 min-[380px]:gap-3 min-[380px]:px-4 sm:px-6 md:px-10">
            <Link
              to="/"
              className="shrink-0 font-geist-pixel text-[25px] font-semibold tracking-wider text-black dark:text-white sm:text-[30px]"
            >
              Klick
            </Link>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 text-black dark:text-white min-[380px]:gap-2 sm:gap-3">
              {isHome && (
                <div className="w-20 min-w-0 min-[360px]:w-28 min-[420px]:w-36 sm:w-44 md:w-56 lg:w-72">
                  <div className="relative w-full">
                    <Search
                      className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 dark:text-[#555] sm:left-3 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={effectSearchQuery}
                      onChange={(event) => onEffectSearchQueryChange(event.target.value)}
                      placeholder="Search effects..."
                      aria-label="Search effects"
                      aria-keyshortcuts="Control+K Meta+K"
                      className="h-9 w-full border border-black/20 bg-white/80 pl-8 pr-8 font-sans text-[11px] tracking-wider text-black placeholder:text-gray-500 focus:border-black/40 focus:outline-none dark:border-white/20 dark:bg-neutral-950/80 dark:text-white dark:placeholder:text-[#555] dark:focus:border-white/40 sm:h-10 sm:pl-9 sm:pr-16 sm:text-small [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {!normalizedQuery && (
                      <kbd
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center border border-black/15 px-1.5 py-0.5 font-sans text-[10px] tracking-wide text-gray-500 dark:border-white/15 dark:text-[#555] md:inline-flex"
                      >
                        {shortcutLabel}
                      </kbd>
                    )}
                    {normalizedQuery && (
                      <button
                        type="button"
                        onClick={() => onEffectSearchQueryChange('')}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center transition-colors hover:text-black dark:text-[#555] dark:hover:text-white hover:cursor-pointer"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="flex h-9 w-9 items-center justify-center border border-black/10 bg-white text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/20 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5 sm:h-10 sm:w-10"
              >
                <BrightnessDownIcon />
              </button>
              <a
                href="https://x.com/devsterxyz"
                target="_blank"
                rel="noreferrer"
                aria-label="Dev on X"
                className="hidden h-9 w-9 items-center justify-center border border-black/10 bg-white text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/20 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5 min-[380px]:flex sm:h-10 sm:w-10"
              >
                <TwitterXIcon />
              </a>
              <a
                href="https://github.com/devsterxyz/Klick"
                target="_blank"
                rel="noreferrer"
                aria-label="View Klick repo on GitHub"
                className="inline-flex h-9 items-center gap-1.5 border border-black/10 bg-white px-2 text-xs font-medium text-black shadow-sm transition hover:border-black/20 hover:bg-black/5 dark:border-white/20 dark:bg-neutral-950 dark:text-white dark:hover:bg-white/5 sm:h-10 sm:gap-2 sm:px-3 sm:text-sm"
              >
                <GithubIcon size={18} />
                <StarIcon size={14} />
                <span className="max-w-[3.5rem] truncate sm:max-w-none">{stars !== null ? stars.toLocaleString() : 'Star'}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  )
}

export default Navbar

