import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNews } from './hooks/useNews';

const AnimatedView = Animated.View as unknown as React.ComponentType<any>;

// ─── Spinning ring component using Animated API ───────────────────────────────
function SpinnerRing({
  size,
  borderColor,
  accentColor,
  reverse = false,
  duration = 1200,
}: {
  size: number;
  borderColor: string;
  accentColor: string;
  reverse?: boolean;
  duration?: number;
}) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ['360deg', '0deg'] : ['0deg', '360deg'],
  });

  return (
    <AnimatedView
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 4,
        borderColor,
        borderTopColor: accentColor,
        transform: [{ rotate }],
      }}
    />
  );
}

// ─── Pulsing dot ──────────────────────────────────────────────────────────────
function PulseDot({ color }: { color: string }) {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.8, duration: 800, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <AnimatedView
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: color,
        transform: [{ scale }],
        opacity,
      }}
    />
  );
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots() {
  const anims = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    const loops = anims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200),
          Animated.timing(anim, { toValue: 1, duration: 600, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
        ])
      )
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, []);

  return (
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {anims.map((anim, i) => (
        <AnimatedView
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#10b981',
            opacity: anim,
          }}
        />
      ))}
    </View>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const {
    newsData,
    loading,
    isStaticMode,
    loadingMessage,
    lastUpdated,
    error,
    fetchStatic,
    fetchDynamic,
  } = useNews();

  const openLink = (url: string) => Linking.openURL(url);

  const architectureNodes = [
    { title: 'Data Ingestion', description: 'HTTP Request fetches real-time headlines from BBC News and Al Jazeera via NewsAPI', icon: '📡' },
    { title: 'AI Agent (Dual Model)', description: 'Gemini 2.0 Flash analyzes impact with Groq Llama 3.3 70B fallback for reliability', icon: '🤖' },
    { title: 'Memory System', description: '10-headline buffer with PostgreSQL prevents duplicate selections and tracks history', icon: '🧠' },
    { title: 'Image Pipeline', description: 'Flux1 Schnell via Hugging Face generates images, uploaded to Cloudinary CDN', icon: '🎨' },
  ];

  const pipelineSteps = [
    { step: '1', title: 'Trigger', desc: 'Webhook or scheduled cron job initiates workflow' },
    { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines, merges with 10-headline memory buffer, and formats for AI agent' },
    { step: '3', title: 'AI Selection', desc: 'Gemini evaluates 30 headlines for impact and uniqueness, outputs headline + 20-word description' },
    { step: '4', title: 'Memory Update', desc: 'Adds selected headline to PostgreSQL history' },
    { step: '5', title: 'Image Generation', desc: 'Flux1 Schnell creates artistic representation via Hugging Face Inference API' },
    { step: '6', title: 'Cloud Upload', desc: 'Cloudinary stores image and returns CDN URL' },
    { step: '7', title: 'Database Commit', desc: 'Saves entry with active status, deactivates old entries, keeps last 7 for rotation' },
    { step: '8', title: 'Response', desc: 'Returns JSON to webhook caller with complete data' },
  ];

  const techStack = [
    { name: 'n8n' }, { name: 'Gemini 2.0' }, { name: 'Groq Llama' },
    { name: 'Flux1' }, { name: 'HuggingFace' }, { name: 'Cloudinary' },
    { name: 'PostgreSQL' }, { name: 'NewsAPI' }, { name: 'Docker' },
    { name: 'Node' }, { name: 'React' }, { name: 'Tailwind' },
  ];

  const features = [
    { title: 'Dual AI Architecture', description: 'Primary Gemini 2.0 Flash with Groq Llama 3.3 70B fallback ensures 99.9% uptime and reliability.', icon: '⚡' },
    { title: 'Smart Memory Buffer', description: '10-headline PostgreSQL memory prevents repetitive selections while maintaining context awareness.', icon: '🎯' },
    { title: 'Production-Grade Pipeline', description: 'Flux1 Schnell via Hugging Face Inference API + Cloudinary CDN delivers high-quality images with global distribution.', icon: '🚀' },
    { title: 'Multi-Source Aggregation', description: 'NewsAPI combines BBC and Al Jazeera for comprehensive, balanced international coverage.', icon: '🌍' },
    { title: 'Automated State Management', description: 'Database automatically rotates entries, keeping last 7 days while marking active content.', icon: '🔄' },
    { title: 'Dual Trigger System', description: 'Supports both scheduled cron jobs and webhook triggers for flexible deployment strategies.', icon: '⏰' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
      {/* Full-screen background gradient */}
      <LinearGradient
        colors={['#022c22', '#0a0a0a', '#1a0a2e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', inset: 0 }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 24, paddingTop: 64 }}>

          {/* ── Header ── */}
          <View style={{ marginBottom: 64 }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', gap: 8,
              paddingHorizontal: 12, paddingVertical: 6,
              borderRadius: 999, backgroundColor: 'rgba(16,185,129,0.1)',
              borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
              alignSelf: 'flex-start', marginBottom: 20,
            }}>
              <PulseDot color="#34d399" />
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#34d399', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Portfolio Project
              </Text>
            </View>

            <Text style={{ fontSize: 36, fontWeight: '800', color: '#f5f5f5', lineHeight: 44, marginBottom: 8 }}>
              Agentic News Intelligence
            </Text>
            {/* Gradient text approximated with a colored text block */}
            <Text style={{ fontSize: 36, fontWeight: '800', color: '#34d399', lineHeight: 44, marginBottom: 20 }}>
              System
            </Text>

            <Text style={{ fontSize: 15, color: '#737373', lineHeight: 24 }}>
              An autonomous AI workflow that monitors global news sources, intelligently selects the most impactful headlines
              using dual AI models with fallback, and generates high-quality visual representations via Flux1 (or Pollinations as fallback)
              while maintaining a 10-headline memory buffer to ensure content novelty.
            </Text>
          </View>

          {/* ── System Architecture ── */}
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 24 }}>
              System Architecture
            </Text>
            {architectureNodes.map((node, idx) => (
              <View key={idx} style={{
                backgroundColor: 'rgba(23,23,23,0.7)',
                borderWidth: 1, borderColor: '#262626',
                borderRadius: 16, padding: 20, marginBottom: 12,
              }}>
                <Text style={{ fontSize: 32, marginBottom: 10 }}>{node.icon}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#e5e5e5', marginBottom: 6 }}>{node.title}</Text>
                <Text style={{ fontSize: 13, color: '#737373', lineHeight: 20 }}>{node.description}</Text>
              </View>
            ))}
          </View>

          {/* ── Live Demo ── */}
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 24 }}>
              Live Demo
            </Text>

            {/* Control Panel */}
            <View style={{
              backgroundColor: 'rgba(23,23,23,0.7)', borderWidth: 1,
              borderColor: '#262626', borderRadius: 16, padding: 20, marginBottom: 16,
            }}>
              <Text style={{ fontWeight: '600', color: '#e5e5e5', marginBottom: 4 }}>Execution Mode</Text>
              <Text style={{ fontSize: 13, color: '#737373', marginBottom: 16 }}>
                {isStaticMode ? 'Viewing pre-generated content from database' : 'Live workflow execution in progress'}
              </Text>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={fetchStatic}
                  disabled={loading}
                  style={{
                    flex: 1, paddingVertical: 10, borderRadius: 10,
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
                    opacity: loading ? 0.5 : 1, alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#34d399', fontWeight: '600', fontSize: 13 }}>Fetch Static</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={fetchDynamic}
                  disabled={loading}
                  style={{
                    flex: 1, paddingVertical: 10, borderRadius: 10,
                    backgroundColor: 'rgba(139,92,246,0.1)',
                    borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)',
                    opacity: loading ? 0.5 : 1, alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#a78bfa', fontWeight: '600', fontSize: 13 }}>Run Workflow</Text>
                </TouchableOpacity>
              </View>

              {lastUpdated && (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 }}>
                  <PulseDot color="#10b981" />
                  <Text style={{ fontSize: 11, color: '#525252' }}>Last updated: {lastUpdated}</Text>
                </View>
              )}
            </View>

            {/* Error */}
            {error && (
              <View style={{
                flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14,
                backgroundColor: 'rgba(239,68,68,0.05)',
                borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
                borderRadius: 10, marginBottom: 16,
              }}>
                <Text style={{ fontSize: 18 }}>⚠️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: '#f87171', marginBottom: 2 }}>Error</Text>
                  <Text style={{ fontSize: 12, color: '#f87171' }}>{error}</Text>
                </View>
              </View>
            )}

            {/* Loading overlay */}
            {loading && (
              <LinearGradient
                colors={['rgba(16,185,129,0.05)', 'rgba(139,92,246,0.05)']}
                style={{
                  borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
                  borderRadius: 16, padding: 32, alignItems: 'center',
                  marginBottom: 16, gap: 16,
                }}
              >
                {/* Spinner */}
                <View style={{ width: 64, height: 64 }}>
                  <SpinnerRing size={64} borderColor="#262626" accentColor="#10b981" duration={1200} />
                  <SpinnerRing size={64} borderColor="transparent" accentColor="#06b6d4" reverse duration={900} />
                </View>

                <View style={{ alignItems: 'center', gap: 4 }}>
                  <Text style={{ color: '#34d399', fontWeight: '600', fontSize: 14 }}>{loadingMessage}</Text>
                  <Text style={{ color: '#525252', fontSize: 11 }}>Full workflow execution: 30–60 seconds (free-tier services)</Text>
                </View>

                <ProgressDots />
              </LinearGradient>
            )}

            {/* Output cards */}
            <View style={{ gap: 12 }}>
              {/* Headline output */}
              <View style={{
                backgroundColor: 'rgba(23,23,23,0.7)', borderWidth: 1,
                borderColor: '#262626', borderRadius: 16, padding: 20,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: newsData ? '#10b981' : '#404040' }} />
                  <Text style={{ fontSize: 10, fontWeight: '600', color: '#525252', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    Headline Output
                  </Text>
                </View>

                <View style={{
                  backgroundColor: 'rgba(10,10,10,0.5)', borderRadius: 10,
                  padding: 16, borderWidth: 1, borderColor: '#262626', marginBottom: 10,
                }}>
                  <Text style={{ fontSize: 10, color: '#525252', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Selected Headline</Text>
                  <Text style={{ fontSize: 14, color: '#d4d4d4', lineHeight: 22 }}>
                    {newsData?.headline || "Loading today's headline..."}
                  </Text>
                </View>

                <View style={{
                  backgroundColor: 'rgba(10,10,10,0.5)', borderRadius: 10,
                  padding: 16, borderWidth: 1, borderColor: '#262626',
                }}>
                  <Text style={{ fontSize: 10, color: '#525252', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                    Visual Description (max 20 words)
                  </Text>
                  <Text style={{ fontSize: 13, color: '#737373', lineHeight: 20 }}>
                    {newsData?.description || 'AI-generated visual description will appear here'}
                  </Text>
                </View>
              </View>

              {/* Image output */}
              <View style={{
                backgroundColor: 'rgba(23,23,23,0.7)', borderWidth: 1,
                borderColor: '#262626', borderRadius: 16, padding: 20,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: newsData ? '#8b5cf6' : '#404040' }} />
                  <Text style={{ fontSize: 10, fontWeight: '600', color: '#525252', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    Generated Image
                  </Text>
                </View>

                <View style={{
                  aspectRatio: 4 / 3, backgroundColor: 'rgba(10,10,10,0.5)',
                  borderRadius: 10, borderWidth: 1, borderColor: '#262626',
                  alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                }}>
                  {loading ? (
                    <View style={{ alignItems: 'center', gap: 10 }}>
                      <ActivityIndicator color="#8b5cf6" size="large" />
                      <Text style={{ fontSize: 11, color: '#525252' }}>Flux1 generating image...</Text>
                    </View>
                  ) : newsData?.imageUrl ? (
                    <Image
                      source={{ uri: newsData.imageUrl }}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={{ alignItems: 'center', padding: 24, gap: 8 }}>
                      <View style={{
                        width: 64, height: 64, borderRadius: 32,
                        backgroundColor: 'rgba(16,185,129,0.1)',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Text style={{ fontSize: 28 }}>🖼️</Text>
                      </View>
                      <Text style={{ fontSize: 13, color: '#525252' }}>Loading image...</Text>
                      <Text style={{ fontSize: 11, color: '#404040' }}>Via Flux1 Schnell (or fallback) + Cloudinary</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* ── Execution Pipeline ── */}
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 24 }}>
              Execution Pipeline
            </Text>
            {pipelineSteps.map((item, idx) => (
              <View key={idx} style={{
                flexDirection: 'row', alignItems: 'flex-start', gap: 14,
                backgroundColor: 'rgba(23,23,23,0.5)',
                borderWidth: 1, borderColor: '#1f1f1f',
                borderRadius: 12, padding: 14, marginBottom: 8,
              }}>
                <View style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: 'rgba(16,185,129,0.1)',
                  borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#34d399' }}>{item.step}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600', color: '#e5e5e5', marginBottom: 2 }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: '#525252', lineHeight: 18 }}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── Technology Stack ── */}
          <View style={{ marginBottom: 64 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 24 }}>
              Technology Stack
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {techStack.map((tech, idx) => (
                <View key={idx} style={{
                  width: '30%', backgroundColor: 'rgba(23,23,23,0.7)',
                  borderWidth: 1, borderColor: '#262626',
                  borderRadius: 12, padding: 14, alignItems: 'center',
                }}>
                  <View style={{
                    width: 36, height: 36, borderRadius: 8,
                    backgroundColor: 'rgba(16,185,129,0.1)',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
                  }}>
                    <Text style={{ fontWeight: '700', color: '#34d399' }}>{tech.name.charAt(0)}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: '#737373', textAlign: 'center' }}>{tech.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* ── Key Features ── */}
          <View style={{ marginBottom: 48 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: '#f5f5f5', marginBottom: 24 }}>
              Key Features
            </Text>
            {features.map((feature, idx) => (
              <View key={idx} style={{
                backgroundColor: 'rgba(23,23,23,0.7)', borderWidth: 1,
                borderColor: '#262626', borderRadius: 16,
                padding: 24, marginBottom: 12,
              }}>
                <Text style={{ fontSize: 32, marginBottom: 10 }}>{feature.icon}</Text>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#e5e5e5', marginBottom: 6 }}>{feature.title}</Text>
                <Text style={{ fontSize: 13, color: '#737373', lineHeight: 20 }}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={{
          borderTopWidth: 1, borderTopColor: '#262626',
          backgroundColor: 'rgba(23,23,23,0.5)',
          paddingHorizontal: 24, paddingVertical: 24,
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => openLink('https://jonathan-orlowski.dev/')}>
            <Text style={{ color: '#34d399', fontSize: 13 }}>Jonathan Orlowski</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://github.com/jonorl/agentic-ai-news-to-image')}>
            <Text style={{ color: '#34d399', fontSize: 13 }}>GitHub ↗</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}