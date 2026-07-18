import React, { ReactNode } from 'react'

const railSegmentClass =
  'bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_0,transparent_50%)] dark:bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_0,transparent_50%)] bg-[length:7px_7px]'

type PatternRailProps = {
  side: 'left' | 'right'
}

type PageRailsProps = {
  children: ReactNode
}

export const PatternRail = ({ side }: PatternRailProps) => {
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 ${side === 'left' ? 'right-full' : 'left-full'} flex flex-col overflow-hidden text-white/8 w-full`}
    >
      <div
        className={`h-full shrink-0 border-black/10 dark:border-white/10 ${railSegmentClass}`}
      />
    </div>
  )
}

const PageRails = ({ children }: PageRailsProps) => {
  return (
    <div className="relative">
      <PatternRail side="left"/>
      <PatternRail side="right"/>
      <div className="lg:border-x border-black/20 dark:border-white/20">{children}</div>
    </div>
  )
}

export default PageRails
