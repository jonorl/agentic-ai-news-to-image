import { View, Text, TouchableOpacity, Linking } from 'react-native';

const openLink = (url: string) => Linking.openURL(url);

export function Footer() {
  return (
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
  )
}