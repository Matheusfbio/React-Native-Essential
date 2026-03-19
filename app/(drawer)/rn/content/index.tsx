import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/components/ThemeContext';

const sections = [
  {
    route: '/rn/content/coreRn',
    label: 'Core React Native',
    description: 'Conceitos fundamentais do React Native',
    emoji: '⚛️',
  },
  {
    route: '/rn/content/fundament',
    label: 'Fundamentos',
    description: 'Fundamentos não negociáveis do desenvolvimento mobile',
    emoji: '📚',
  },
];

export default function ContentIndex() {
  const { colorScheme } = useTheme();
  const dark = colorScheme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: dark ? '#1a1a1a' : '#f5f5f5' },
      ]}
    >
      {sections.map(({ route, label, description, emoji }) => (
        <TouchableOpacity
          key={route}
          style={[styles.card, { backgroundColor: dark ? '#2a2a2a' : '#fff' }]}
          onPress={() => router.navigate(route as any)}
        >
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.label, { color: dark ? '#e5e5e5' : '#1a1a1a' }]}>
            {label}
          </Text>
          <Text style={[styles.description, { color: dark ? '#999' : '#666' }]}>
            {description}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    ...Platform.select({
      android: { paddingTop: 8 },
    }),
  },
  card: {
    padding: 24,
    borderRadius: 12,
    elevation: 2,
    gap: 6,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});
