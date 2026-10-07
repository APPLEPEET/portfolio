import { TombstoneCard, type Project } from './components/TombstoneCard'
import { Ticker } from './components/Ticker'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const projects: Project[] = [
  {
    name: "Buffett's Edge",
    transaction: "SEC XBRL operating segment visualization",
    description: "Berkshire Hathaway's operating segments charted from SEC XBRL filings - the part every 13F tracker ignores. Visualize capital allocation across the conglomerate.",
    demoUrl: "https://buffett-edges.vercel.app",
    githubUrl: "https://github.com/APPLEPEET/buffett-edges",
    stack: ["React", "D3.js", "SEC XBRL"],
    status: "LIVE",
    featured: true,
  },
  {
    name: "Performance Lab",
    transaction: "Indoor golf simulator club",
    description: "A private, staffless, 24/7 indoor golf simulator club in the Belle Haven area. Modern booking and membership experience.",
    demoUrl: "https://performance-lab-jade.vercel.app",
    stack: ["Next.js", "Tailwind"],
    status: "LIVE",
  },
  {
    name: "Portico",
    transaction: "Guest list and address tracker",
    description: "Imports a messy guest CSV, cleans names into households, collects mailing addresses, and exports vendor-ready packs for invitations.",
    demoUrl: "https://www.portico-app.com/",
    stack: ["Next.js", "Prisma", "Clerk"],
    status: "LIVE",
  },
  {
    name: "Optimeyed Dashboard",
    transaction: "Vision benefits verification platform",
    description: "Overnight vision-benefits verification for optometry practices plus a 12-week program to lift capture rate and ASP.",
    demoUrl: "https://optimeyed-dashboard.vercel.app",
    stack: ["Python", "FastAPI", "React"],
    status: "DEMO",
  },
  {
    name: "Major Madness",
    transaction: "Fantasy golf pools",
    description: "Fantasy golf pools for the four majors. Draft a roster of golfers, track live scores, and compete on a leaderboard.",
    demoUrl: "https://major-madness-sepia.vercel.app",
    stack: ["TypeScript", "React"],
    status: "DEMO",
  },
]

const tickerItems = [
  { label: "Featured", value: "Buffett's Edge", status: "LIVE" as const },
  { label: "Stack", value: "React / D3.js / SEC XBRL" },
  { label: "Project", value: "Performance Lab", status: "LIVE" as const },
  { label: "Project", value: "Portico", status: "LIVE" as const },
  { label: "Stack", value: "Next.js / Prisma / Clerk" },
  { label: "Project", value: "Optimeyed", status: "DEMO" as const },
  { label: "Project", value: "Major Madness", status: "DEMO" as const },
  { label: "Stack", value: "Python / FastAPI / TypeScript" },
]

const featuredProject = projects.find(p => p.featured)!

function App() {
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h1 
                  className="tracking-tight leading-none mb-6"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    color: 'var(--color-ink)',
                    fontSize: 'clamp(3rem, 8vw, 7rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  Peter<br />
                  <span style={{ color: 'var(--color-signal)' }}>Burrus</span>
                </h1>
                
                <p 
                  className="text-lg md:text-xl leading-relaxed mb-4"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  Corp Dev Director. Ex-IB. 75+ deals closed.
                </p>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--color-ink-faint)' }}
                >
                  I build tools that turn messy financial data into clear decisions.
                </p>
              </div>

              <div className="hidden md:block">
                <TombstoneCard project={featuredProject} index={0} compact />
              </div>
            </div>
          </div>
        </section>

        <Ticker items={tickerItems} />

        <section className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline justify-between mb-10 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
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

            <div className="mb-8">
              <TombstoneCard project={featuredProject} index={0} />
            </div>

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
