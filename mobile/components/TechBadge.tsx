import { View, Text } from 'react-native';
import { techStack } from '../../shared/constants/AppContent'

export function TechBadge() {
  return (
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
    )
}