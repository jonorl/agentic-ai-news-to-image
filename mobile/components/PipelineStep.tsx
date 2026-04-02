import { View, Text } from 'react-native';
import { pipelineSteps } from '../../shared/constants/AppContent'

export function PipelineSteps() {
  return (

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
    </View>)
}