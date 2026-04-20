import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const sections = [
  {
    route: '/rn/content/coreRn',
    label: 'Core React Native',
    description: 'Conceitos fundamentais do React Native',
    icon: 'code-slash-outline' as const,
  },
  {
    route: '/rn/content/fundament',
    label: 'Fundamentos',
    description: 'Fundamentos não negociáveis do desenvolvimento mobile',
    icon: 'layers-outline' as const,
  },
];

export default function ContentIndex() {
  const { colorScheme, accentColor } = useTheme();
  const dark = colorScheme === 'dark';
  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#fff';
  const labelColor = dark ? '#e5e5e5' : '#333';
  const sublabel = dark ? '#999' : '#666';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      {sections.map(({ route, label, description, icon }) => (
        <TouchableOpacity
          key={route}
          style={[styles.card, { backgroundColor: card }]}
          onPress={() => router.navigate(route as any)}
        >
          <View style={[styles.iconWrapper, { backgroundColor: `${accentColor}18` }]}>
            <Ionicons name={icon} size={24} color={accentColor} />
          </View>
          <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
          <Text style={[styles.description, { color: sublabel }]}>{description}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    ...Platform.select({ android: { paddingTop: 8 } }),
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  label: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14 },
});
