import { ScreenWrapper } from './ScreenWrapper';
import { Header } from './Header';
import { ArchitectureNode } from './ArchitectureNode';
import { PipelineSteps } from './PipelineStep';
import { TechBadge } from './TechBadge';
import { FeatureCard } from './FeatureCard';
import { Footer } from './Footer';

export function Main() {
  return (
    <ScreenWrapper>
      <Header />
      <ArchitectureNode />
      <PipelineSteps />
      <TechBadge />
      <FeatureCard />
      <Footer />
    </ScreenWrapper>
  );
}