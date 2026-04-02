import { ScreenWrapper } from './components/ScreenWrapper';
import { Header } from './components/Header';
import { ArchitectureNode } from './components/ArchitectureNode';
import { PipelineSteps } from './components/PipelineStep';
import { TechBadge } from './components/TechBadge';
import { FeatureCard } from './components/FeatureCard';
import { Footer } from './components/Footer';

export default function App() {
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