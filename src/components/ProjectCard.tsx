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

export function ProjectCard({ project }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false)
  const screenshotUrl = getMicrolinkScreenshotUrl(project.demoUrl)

  return (
    <article 
      className={`
        group relative rounded-2xl overflow-hidden transition-all duration-300
        border hover:border-blue-500/30 hover:shadow-lg hover:-translate-y-1
        ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
      `}
      style={{ 
        backgroundColor: 'var(--color-surface-elevated)',
        borderColor: 'var(--color-border)',
      }}
    >
      {project.featured && (
        <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
          Featured
        </span>
      )}
      
      <a
        href={project.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-video relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        {imageError ? (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-cyan-500/20"
            aria-hidden="true"
          >
            <span 
              className="text-3xl font-bold opacity-50"
              style={{ color: 'var(--color-text-secondary)' }}
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
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </a>
      
      <div className="flex flex-col p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors" style={{ color: 'var(--color-text)' }}>
          {project.name}
        </h3>
        
        <p className="text-sm mb-4 flex-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-md"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm"
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
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg border transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
              style={{ 
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
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
