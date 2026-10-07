import { ProjectCard, type Project } from './components/ProjectCard'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const projects: Project[] = [
  {
    name: "Buffett's Edge",
    description: "Berkshire Hathaway operating segments charted from SEC XBRL. Visualize capital allocation, identify cash generators vs sinks.",
    demoUrl: "https://buffett-edges.vercel.app",
    githubUrl: "https://github.com/APPLEPEET/buffett-edges",
    tags: ["Finance", "Data Viz", "SEC XBRL"],
    featured: true,
  },
  {
    name: "Performance Lab",
    description: "Landing page for a 24/7 staffless indoor golf club in Belle View. Modern booking experience.",
    demoUrl: "https://performance-lab-jade.vercel.app",
    tags: ["Landing Page", "Local Business"],
  },
  {
    name: "Portico",
    description: "Guest list and address tracker for events. Manage RSVPs, collect mailing addresses, export for invitations.",
    demoUrl: "https://www.portico-app.com/",
    tags: ["SaaS", "Events"],
  },
  {
    name: "Optimeyed Dashboard",
    description: "Data dashboard with Python backend. Transform raw data into actionable insights with real-time visualizations.",
    demoUrl: "https://optimeyed-dashboard.vercel.app",
    tags: ["Dashboard", "Python"],
  },
  {
    name: "Major Madness",
    description: "Interactive bracket-style application for college major selection. Built with TypeScript.",
    demoUrl: "https://major-madness-sepia.vercel.app",
    tags: ["TypeScript", "Interactive"],
  },
]

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl mb-6"
                style={{ 
                  color: 'var(--color-ink)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Peter Burrus
              </h1>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-4"
                style={{ color: 'var(--color-ink-muted)' }}
              >
                Corp dev, finance, and operations builder. I make tools that turn 
                messy data into clear decisions.
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ color: 'var(--color-ink-faint)' }}
              >
                From SEC filings to event planning, I like working on problems 
                where the interface matters as much as the data.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <h2 
              className="text-lg md:text-xl mb-10"
              style={{ 
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Projects
            </h2>
            
            <div className="space-y-6">
              {projects.filter(p => p.featured).map((project) => (
                <ProjectCard key={project.name} project={project} variant="featured" />
              ))}
            </div>
            
            <div className="grid gap-5 md:grid-cols-2 mt-8">
              {projects.filter(p => !p.featured).map((project) => (
                <ProjectCard key={project.name} project={project} variant="default" />
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
