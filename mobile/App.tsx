import { Text, View, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';
import "./global.css";

import { useNews } from './hooks/useNews'

export default function App() {
  const { newsData, loading, isStaticMode, loadingMessage, lastUpdated, error, fetchStatic, fetchDynamic } = useNews();

  const _handleLinkButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-950">
      <View className="min-h-screen bg-neutral-950">
        {/* Background effects - Using LinearGradient for Native compatibility */}
        <LinearGradient
          colors={['rgba(6, 78, 59, 0.2)', '#0a0a0a', 'rgba(76, 29, 149, 0.2)']}
          className="absolute inset-0"
        />

        <View className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Header */}
          <View className="mb-20">
            <View className="flex-row items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 self-start">
              <View className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <Text className="text-xs font-medium text-emerald-400 tracking-wider uppercase">Portfolio Project</Text>
            </View>

            <Text className="text-5xl font-bold mb-6 leading-tight text-white">
              Agentic News Intelligence{"\n"}
              <Text className="text-emerald-400">System</Text>
            </Text>

            <Text className="text-lg text-neutral-400 max-w-3xl leading-relaxed">
              An autonomous AI workflow that monitors global news sources, intelligently selects the most impactful headlines
              using dual AI models with fallback, and generates high-quality visual representations via Flux1.
            </Text>
          </View>

          {/* System Architecture */}
          <View className="mb-20">
            <Text className="text-3xl font-bold mb-10 text-white">System Architecture</Text>

            <View className="flex-row flex-wrap gap-4">
              {[
                { title: 'Data Ingestion', description: 'HTTP Request fetches real-time headlines', icon: '📡' },
                { title: 'AI Agent', description: 'Gemini 2.0 Flash with Groq Llama fallback', icon: '🤖' },
                { title: 'Memory System', description: 'PostgreSQL prevents duplicate selections', icon: '🧠' },
                { title: 'Image Pipeline', description: 'Flux1 Schnell generates artistic images', icon: '🎨' }
              ].map((node, idx) => (
                <View key={idx} className="w-full md:w-[48%] bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                  <Text className="text-4xl mb-4">{node.icon}</Text>
                  <Text className="text-lg font-semibold mb-2 text-white">{node.title}</Text>
                  <Text className="text-sm text-neutral-400 leading-relaxed">{node.description}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Live Demo Controls */}
          <View className="mb-20">
            <Text className="text-3xl font-bold mb-10 text-white">Live Demo</Text>

            <View className="mb-8 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
              <View className="flex-col gap-4 mb-4">
                <View>
                  <Text className="font-semibold mb-1 text-white">Execution Mode</Text>
                  <Text className="text-sm text-neutral-400">
                    {isStaticMode ? 'Viewing pre-generated content' : 'Live workflow in progress'}
                  </Text>
                </View>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    onPress={fetchStatic}
                    disabled={loading}
                    className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg"
                  >
                    <Text className="text-emerald-400 font-medium">Fetch Static</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={fetchDynamic}
                    disabled={loading}
                    className="px-6 py-2.5 bg-violet-500/10 border border-violet-500/30 rounded-lg"
                  >
                    <Text className="text-violet-400 font-medium">Run Workflow</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {lastUpdated && (
                <View className="flex-row items-center gap-2">
                  <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <Text className="text-xs text-neutral-500">Last updated: {lastUpdated}</Text>
                </View>
              )}
            </View>

            {/* Error Display */}
            {error && (
              <View className="mb-6 p-4 bg-red-500/5 border border-red-500/20 rounded-lg flex-row gap-3">
                <Text className="text-xl">⚠️</Text>
                <View className="flex-1">
                  <Text className="font-medium mb-1 text-red-400">Error</Text>
                  <Text className="text-sm text-red-300">{error}</Text>
                </View>
              </View>
            )}

            {/* Smart Loading Overlay */}
            {loading && (
              <View className="mb-6 p-8 bg-neutral-900 border border-emerald-500/20 rounded-xl items-center">
                <Text className="text-emerald-400 font-medium mb-1">{loadingMessage}</Text>
                <Text className="text-xs text-neutral-500 text-center">
                  Full workflow execution: 30-60 seconds
                </Text>
              </View>
            )}

            <View className="flex-col gap-6">
              {/* Text Output */}
              <View className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
                <View className="flex-row items-center gap-2 mb-6">
                  <View className={`w-2 h-2 rounded-full ${newsData ? 'bg-emerald-500' : 'bg-neutral-600'}`} />
                  <Text className="text-xs font-medium text-neutral-500 uppercase">Headline Output</Text>
                </View>
                <View className="bg-neutral-950/50 rounded-lg p-5 border border-neutral-800 mb-4">
                  <Text className="text-xs text-neutral-500 uppercase mb-2">Selected Headline</Text>
                  <Text className="text-base text-neutral-300">{newsData?.headline || 'Waiting for data...'}</Text>
                </View>
                <View className="bg-neutral-950/50 rounded-lg p-5 border border-neutral-800">
                  <Text className="text-xs text-neutral-500 uppercase mb-2">Visual Description</Text>
                  <Text className="text-sm text-neutral-400">{newsData?.description || 'Awaiting generation...'}</Text>
                </View>
              </View>

              {/* Image Output */}
              <View className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8">
                <View className="flex-row items-center gap-2 mb-6">
                  <View className={`w-2 h-2 rounded-full ${newsData ? 'bg-violet-500' : 'bg-neutral-600'}`} />
                  <Text className="text-xs font-medium text-neutral-500 uppercase">Generated Image</Text>
                </View>
                <View className="aspect-[4/3] bg-neutral-950 rounded-lg border border-neutral-800 items-center justify-center overflow-hidden">
                  {newsData?.imageUrl ? (
                    <Image 
                      source={{ uri: newsData.imageUrl }} 
                      className="w-full h-full" 
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-sm text-neutral-500">🖼️ Image will appear here</Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {/* Workflow Pipeline */}
          <View className="mb-20">
            <Text className="text-3xl font-bold mb-10 text-white">Execution Pipeline</Text>
            <View className="space-y-3">
              {[
                { step: '1', title: 'Trigger', desc: 'Webhook initiates workflow' },
                { step: '2', title: 'Data Collection', desc: 'Fetches NewsAPI headlines' },
                { step: '3', title: 'AI Selection', desc: 'Gemini evaluates headlines' },
                { step: '4', title: 'Image Generation', desc: 'Flux1 Schnell creates image' }
              ].map((item, idx) => (
                <View key={idx} className="flex-row items-start gap-4 bg-neutral-900/30 border border-neutral-800/50 rounded-lg p-4">
                  <View className="w-8 h-8 rounded-full bg-emerald-500/20 items-center justify-center border border-emerald-500/30">
                    <Text className="font-bold text-emerald-400">{item.step}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-neutral-200">{item.title}</Text>
                    <Text className="text-sm text-neutral-500">{item.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="border-t border-neutral-800 bg-neutral-900/50 p-8 items-center">
          <TouchableOpacity onPress={() => _handleLinkButtonAsync('https://github.com/jonorl/agentic-ai-news-to-image')}>
            <Text className="text-emerald-400 font-medium">View on GitHub</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}