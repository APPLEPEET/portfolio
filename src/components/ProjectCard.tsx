import { useState } from 'react'

export interface Project {
  name: string
  description: string
  demoUrl: string
  githubUrl?: string
  tags: string[]
  featured?: boolean
}

interface ProjectCardProps {
  project: Project
  variant: 'featured' | 'default'
}

function getMicrolinkScreenshotUrl(url: string): string {
  const params = new URLSearchParams({
    url,
    screenshot: 'true',
    meta: 'false',
    'embed': 'screenshot.url',
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

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)
  const screenshotUrl = getMicrolinkScreenshotUrl(project.demoUrl)

  if (variant === 'featured') {
    return (
      <article 
        className="grid md:grid-cols-5 gap-6 p-5 border transition-colors"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          borderRadius: '8px',
        }}
      >
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-3 block aspect-video relative overflow-hidden"
          style={{ 
            backgroundColor: 'var(--color-ground)',
            borderRadius: '4px',
          }}
        >
          {imageError ? (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-ground)' }}
              aria-hidden="true"
            >
              <span 
                className="text-2xl font-mono font-semibold"
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
        
        <div className="md:col-span-2 flex flex-col justify-between py-1">
          <div>
            <h3 
              className="text-xl mb-3"
              style={{ 
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {project.name}
            </h3>
            
            <p 
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono"
                  style={{ 
                    backgroundColor: 'var(--color-ground)',
                    color: 'var(--color-ink-faint)',
                    borderRadius: '3px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
              style={{ 
                backgroundColor: 'var(--color-signal)',
                color: '#ffffff',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-signal-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-signal)'}
            >
              <span>View Demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium border transition-colors"
                style={{ 
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-ink)',
                  borderRadius: '4px',
                }}
                aria-label={`View ${project.name} source code on GitHub`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article 
      className="p-4 border transition-colors"
      style={{ 
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        borderRadius: '6px',
      }}
    >
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video relative overflow-hidden mb-4"
        style={{ 
          backgroundColor: 'var(--color-ground)',
          borderRadius: '3px',
        }}
      >
        {imageError ? (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-ground)' }}
            aria-hidden="true"
          >
            <span 
              className="text-xl font-mono font-semibold"
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
      
      <h3 
        className="text-base mb-2"
        style={{ 
          color: 'var(--color-ink)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {project.name}
      </h3>
      
      <p 
        className="text-sm leading-relaxed mb-3"
        style={{ color: 'var(--color-ink-muted)' }}
      >
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span 
            key={tag}
            className="px-2 py-0.5 text-xs font-mono"
            style={{ 
              backgroundColor: 'var(--color-ground)',
              color: 'var(--color-ink-faint)',
              borderRadius: '3px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--color-signal)' }}
      >
        <span>View project</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </article>
  )
}
