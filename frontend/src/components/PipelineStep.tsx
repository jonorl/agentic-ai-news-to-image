import { pipelineSteps } from '../../../shared/constants/AppContent'

export function PipelineSteps() {
  return (
    <section className="mb-20">
              <h2 className="text-3xl font-bold mb-10">Execution Pipeline</h2>
              
              {/* Workflow Visualization */}
              <div className="mb-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 md:p-6 overflow-hidden">
                <p className="mb-4 md:mb-8 text-xs text-neutral-500 text-center mt-2 md:mt-4">n8n Workflow Visualization</p>
                <div className="overflow-x-auto -mx-4 md:mx-0">
                  <div className="px-4 md:px-0">
                    <img 
                      src="workflow.png" 
                      alt="n8n Workflow Diagram"
                      className="w-full h-auto rounded-lg max-w-full"
                    />
                  </div>
                </div>
              </div>
    
              <div className="space-y-3">
                {pipelineSteps.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/50 rounded-lg p-4 hover:border-neutral-700 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-sm font-bold text-emerald-400 border border-emerald-500/30">
                      {item.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-200 mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
  )
}