import { techStack } from '../../../shared/constants/AppContent'

export function TechBadge() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10">Technology Stack</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {techStack.map((tech, idx) => (
          <div
            key={idx}
            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-4 text-center hover:border-neutral-700 transition-all duration-300"
          >
            <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-sm font-bold`}>
              {tech.name.charAt(0)}
            </div>
            <p className="text-xs text-neutral-400">{tech.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}