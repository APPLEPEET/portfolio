import { TombstoneCard, type Project } from './components/TombstoneCard'
import { Ticker } from './components/Ticker'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const projects: Project[] = [
  {
    name: "Buffett's Edge",
    transaction: "SEC XBRL data visualization platform",
    description: "Berkshire Hathaway operating segments charted from SEC filings. Visualize capital allocation, identify cash generators vs sinks across the conglomerate.",
    demoUrl: "https://buffett-edges.vercel.app",
    githubUrl: "https://github.com/APPLEPEET/buffett-edges",
    stack: ["React", "D3", "SEC XBRL"],
    year: "2024",
    status: "LIVE",
    featured: true,
  },
  {
    name: "Performance Lab",
    transaction: "Indoor golf facility launch",
    description: "Landing page for a 24/7 staffless indoor golf club in Belle View. Modern booking and membership system.",
    demoUrl: "https://performance-lab-jade.vercel.app",
    stack: ["Next.js", "Tailwind"],
    year: "2024",
    status: "LIVE",
  },
  {
    name: "Portico",
    transaction: "Event guest management system",
    description: "Guest list and address tracker for events. Manage RSVPs, collect mailing addresses, export for invitations.",
    demoUrl: "https://www.portico-app.com/",
    stack: ["React", "Node", "PostgreSQL"],
    year: "2024",
    status: "LIVE",
  },
  {
    name: "Optimeyed Dashboard",
    transaction: "Python analytics dashboard",
    description: "Data dashboard with Python backend. Transform raw data into actionable insights with real-time visualizations.",
    demoUrl: "https://optimeyed-dashboard.vercel.app",
    stack: ["Python", "React", "FastAPI"],
    year: "2023",
    status: "DEMO",
  },
  {
    name: "Major Madness",
    transaction: "College major selection tool",
    description: "Interactive bracket-style application for college major selection. Built with TypeScript for engaging UX.",
    demoUrl: "https://major-madness-sepia.vercel.app",
    stack: ["TypeScript", "React"],
    year: "2023",
    status: "DEMO",
  },
]

const tickerItems = [
  { label: "Featured", value: "Buffett's Edge", status: "LIVE" as const },
  { label: "Stack", value: "React / Next.js / Python" },
  { label: "Year", value: "2024" },
  { label: "Project", value: "Performance Lab", status: "LIVE" as const },
  { label: "Project", value: "Portico", status: "LIVE" as const },
  { label: "Stack", value: "SEC XBRL / D3 / FastAPI" },
  { label: "Project", value: "Optimeyed", status: "DEMO" as const },
  { label: "Project", value: "Major Madness", status: "DEMO" as const },
]

function App() {
  const featuredProject = projects.find(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <h1 
              className="tracking-tight leading-none mb-8"
              style={{ 
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'var(--color-ink)',
                fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Peter<br />
              <span style={{ color: 'var(--color-signal)' }}>Burrus</span>
            </h1>
            
            <div className="max-w-xl">
              <p 
                className="text-lg md:text-xl leading-relaxed mb-6"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Corp Dev Director. Ex-IB. 75+ deals closed.
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                I build tools that turn messy financial data into clear decisions.
                From SEC filings to event logistics.
              </p>
            </div>
          </div>
        </section>

        <Ticker items={tickerItems} />

        <section className="px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline justify-between mb-12 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h2 
                className="text-sm font-mono uppercase tracking-widest"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                Deal Book
              </h2>
              <span 
                className="text-sm font-mono tabular-nums"
                style={{ color: 'var(--color-signal)' }}
              >
                {projects.length} Projects
              </span>
            </div>

            {featuredProject && (
              <div className="mb-8">
                <TombstoneCard project={featuredProject} index={0} />
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <TombstoneCard key={project.name} project={project} index={index + 1} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
