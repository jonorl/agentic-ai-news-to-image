import { View, Text } from 'react-native';
import { features } from '../../shared/constants/AppContent'

export function FeatureCard() {
  return (
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
  )
}