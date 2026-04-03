import { ScreenWrapper } from './ScreenWrapper';
import { Header } from './Header'
import { ArchitectureNodes } from './ArchitectureNode';
import { PipelineSteps } from './PipelineStep';
import { TechBadge } from './TechBadge';
import { FeaturesCard } from './FeatureCard';
import { Footer } from './Footer'

export function Main() {
  return (
    <ScreenWrapper>
      <Header />
      <div className="space-y-20">
        <ArchitectureNodes />
        <PipelineSteps />
        <TechBadge />
        <FeaturesCard />
      </div>
      <Footer />
    </ScreenWrapper>
  );
}