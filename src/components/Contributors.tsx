import React, { useEffect, useState } from 'react'

type GitHubContributor = {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

const CONTRIBUTORS_API_URL = 'https://api.github.com/repos/devsterxyz/Klick/contributors?per_page=100'

const Contributors = () => {
  const [contributors, setContributors] = useState<GitHubContributor[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const fetchContributors = async () => {
      try {
        const response = await fetch(CONTRIBUTORS_API_URL, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`GitHub contributors request failed: ${response.status}`)
        }

        const data = await response.json() as GitHubContributor[]

        if (!controller.signal.aborted) {
          setContributors(data.filter((contributor) => contributor.type !== 'Bot'))
          setIsLoaded(true)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setIsLoaded(true)
        }
      }
    }

    fetchContributors()

    return () => controller.abort()
  }, [])

  if (!isLoaded || contributors.length === 0) {
    return null
  }

  return (
    <section className="relative -mt-px overflow-hidden bg-transparent text-black dark:text-white">
      <div className="relative z-10 mx-auto max-w-8xl">
        <div className="border-y border-black/20 bg-white/45 dark:border-white/20 dark:bg-white/[0.015] lg:border-x">
          <div className="px-5 py-5 sm:px-7 sm:py-6 lg:px-9">
            <p className="font-geist-pixel text-base leading-tight tracking-wide text-black dark:text-white sm:text-lg">
              Thank you for contributing on Klick
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5 sm:gap-3.5">
              {contributors.map((contributor) => (
                <a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noreferrer"
                  title={`${contributor.login} - ${contributor.contributions} contribution${contributor.contributions === 1 ? '' : 's'}`}
                  aria-label={`${contributor.login} on GitHub`}
                  className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/25 bg-white/70 p-0.5 transition hover:-translate-y-0.5 hover:border-black/55 hover:bg-white dark:border-white/25 dark:bg-black dark:hover:border-white/60 dark:hover:bg-white/[0.04] sm:h-14 sm:w-14"
                >
                  <img
                    src={contributor.avatar_url}
                    alt=""
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contributors
