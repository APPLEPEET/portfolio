import { ProjectCard, type Project } from './components/ProjectCard'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

const projects: Project[] = [
  {
    name: "Buffett's Edge",
    description: "Berkshire Hathaway operating segments charted from SEC XBRL — visualize capital allocation, identify cash generators vs sinks.",
    demoUrl: "https://buffett-edges.vercel.app",
    githubUrl: "https://github.com/APPLEPEET/buffett-edges",
    tags: ["Finance", "Data Viz", "SEC XBRL"],
    featured: true,
  },
  {
    name: "Performance Lab",
    description: "Landing page for a 24/7 staffless indoor golf club in Belle View — modern booking experience.",
    demoUrl: "https://performance-lab-jade.vercel.app",
    tags: ["Landing Page", "Local Business"],
  },
  {
    name: "Portico",
    description: "Wedding planning software to keep everything organized — vendors, timeline, and budget in one place.",
    demoUrl: "https://www.portico-app.com/",
    tags: ["SaaS", "Planning"],
  },
  {
    name: "Optimeyed Dashboard",
    description: "Data dashboard with Python backend — transform raw data into actionable insights.",
    demoUrl: "https://optimeyed-dashboard.vercel.app",
    tags: ["Dashboard", "Python"],
  },
  {
    name: "Major Madness",
    description: "Interactive TypeScript application with engaging user experience.",
    demoUrl: "https://major-madness-sepia.vercel.app",
    tags: ["TypeScript", "Interactive"],
  },
]

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" style={{ color: 'var(--color-text)' }}>
            Building tools for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              finance & operations
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            I'm Peter — I build products that make complex data useful. 
            From SEC filings to wedding budgets, I like turning messy problems into clean interfaces.
          </p>
        </section>

        {/* Projects Section */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center" style={{ color: 'var(--color-text)' }}>
            Live Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default App
