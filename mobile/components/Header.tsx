import { View, Text } from 'react-native';
import { PulseDot } from '../animations/PulseDot';

export function Header() {
  return (
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
      <Text style={{ fontSize: 36, fontWeight: '800', color: '#34d399', lineHeight: 44, marginBottom: 20 }}>
        System
      </Text>

      <Text style={{ fontSize: 15, color: '#737373', lineHeight: 24 }}>
        An autonomous AI workflow that monitors global news sources...
      </Text>
    </View>
  );
}