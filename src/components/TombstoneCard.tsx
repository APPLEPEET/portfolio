'use client'

import { useState, useEffect, useRef } from 'react'

export interface Project {
  name: string
  description: string
  transaction: string
  demoUrl: string
  githubUrl?: string
  stack: string[]
  status: 'LIVE' | 'DEMO'
  featured?: boolean
}

interface TombstoneCardProps {
  project: Project
  index: number
  compact?: boolean
}

function getMicrolinkScreenshotUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    'viewport.width': '1280',
    'viewport.height': '720',
  })
  return `https://api.microlink.io?${params.toString()}`
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function TombstoneCard({ project, index, compact = false }: TombstoneCardProps) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const screenshotUrl = getMicrolinkScreenshotUrl(project.demoUrl)

  const isFeatured = project.featured && !compact

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      setIsVisible(true)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    const timeout = setTimeout(() => {
      setIsVisible(true)
      setHasAnimated(true)
    }, 1000 + index * 100)

    return () => {
      observer.disconnect()
      clearTimeout(timeout)
    }
  }, [index, hasAnimated])

  if (compact) {
    return (
      <article
        ref={cardRef}
        className="relative"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '2px solid var(--color-border-strong)',
        }}
      >
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video relative overflow-hidden"
          style={{ backgroundColor: 'var(--color-ground)' }}
        >
          {imageError ? (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-ground)' }}
            >
              <span 
                className="text-2xl font-mono font-bold"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                {getInitials(project.name)}
              </span>
            </div>
          ) : (
            <img
              src={screenshotUrl}
              alt={`Preview of ${project.name}`}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top"
            />
          )}
        </a>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 
              className="text-lg font-bold leading-tight"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink)',
              }}
            >
              {project.name}
            </h3>
            <span 
              className="shrink-0 text-[10px] font-mono font-semibold px-1.5 py-0.5"
              style={{ 
                backgroundColor: project.status === 'LIVE' ? 'var(--color-signal)' : 'var(--color-surface-elevated)',
                color: project.status === 'LIVE' ? 'var(--color-ground)' : 'var(--color-ink-muted)',
              }}
            >
              {project.status}
            </span>
          </div>
          <p 
            className="text-xs font-mono leading-relaxed"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            {project.transaction}
          </p>
        </div>
      </article>
    )
  }

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${isFeatured ? 'col-span-full' : ''}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `2px solid ${isHovered ? 'var(--color-signal)' : 'var(--color-border-strong)'}`,
        transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: isHovered ? '0 8px 32px rgba(245, 158, 11, 0.15)' : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className={`${isFeatured ? 'grid md:grid-cols-2 gap-0' : ''}`}>
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`block relative overflow-hidden ${isFeatured ? 'aspect-video md:aspect-auto' : 'aspect-video'}`}
          style={{ backgroundColor: 'var(--color-ground)' }}
        >
          {imageError ? (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-ground)' }}
              aria-hidden="true"
            >
              <span 
                className="text-3xl font-mono font-bold"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                {getInitials(project.name)}
              </span>
            </div>
          ) : (
            <img
              src={screenshotUrl}
              alt={`Preview of ${project.name}`}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top"
            />
          )}
        </a>

        <div className={`p-6 ${isFeatured ? 'md:p-8 flex flex-col justify-between' : ''}`}>
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 
                className={`font-bold leading-tight ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-ink)',
                }}
              >
                {project.name}
              </h3>
              <span 
                className="shrink-0 text-xs font-mono font-semibold px-2 py-1"
                style={{ 
                  backgroundColor: project.status === 'LIVE' ? 'var(--color-signal)' : 'var(--color-surface-elevated)',
                  color: project.status === 'LIVE' ? 'var(--color-ground)' : 'var(--color-ink-muted)',
                }}
              >
                {project.status}
              </span>
            </div>

            <p 
              className={`font-mono text-sm leading-relaxed mb-4 ${isFeatured ? 'md:text-base' : ''}`}
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {project.transaction}
            </p>

            <p 
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'var(--color-ink-faint)' }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.stack.map((tech) => (
                <span 
                  key={tech}
                  className="text-xs font-mono px-2 py-1"
                  style={{ 
                    backgroundColor: 'var(--color-signal-dim)',
                    color: 'var(--color-signal)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex gap-3">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-signal)',
                  color: 'var(--color-ground)',
                }}
              >
                View
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-2 transition-colors"
                  style={{ 
                    border: '1px solid var(--color-border-strong)',
                    color: 'var(--color-ink)',
                  }}
                  aria-label={`View ${project.name} source on GitHub`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute top-0 left-0 w-1 h-full transition-all duration-200"
        style={{ 
          backgroundColor: isHovered ? 'var(--color-signal)' : 'transparent',
        }}
      />
    </article>
  )
}
