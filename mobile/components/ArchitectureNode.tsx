import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNews } from '../hooks/useNews';
import { SpinnerRing } from '../animations/SpinnerRing';
import { PulseDot } from '../animations/PulseDot';
import { ProgressDots } from '../animations/ProgressDots'
import { architectureNodes } from '../../shared/constants/AppContent'

export function ArchitectureNode() {
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

  return (
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
              ) : newsData?.image_url ? (
                <Image
                  source={{ uri: newsData.image_url }}
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
    </View>
  )
}