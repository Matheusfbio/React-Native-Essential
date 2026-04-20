import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { NonnegotiableFundamentals } from '@/data/Non-negotiablefundamentalsData';
import { useTheme } from '@/components/ThemeContext';

type ItemProps = {
  id: string;
  titulo: string;
  descricao: string;
  nivel: string;
  categoria: string;
  tags: string[];
};

function ContentItem({ id, titulo, descricao, nivel, categoria, tags, dark, accentColor, isLoading, onPress }: ItemProps & { dark: boolean; accentColor: string; isLoading: boolean; onPress: () => void }) {
  const card = dark ? '#2a2a2a' : '#fff';
  const labelColor = dark ? '#e5e5e5' : '#333';
  const sublabel = dark ? '#999' : '#666';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: card }]}
      disabled={isLoading}
      onPress={onPress}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={accentColor} />
          <Text style={[styles.loadingText, { color: sublabel }]}>Carregando...</Text>
        </View>
      ) : (
        <>
          <Text style={[styles.title, { color: labelColor }]}>{titulo}</Text>
          <Text style={[styles.description, { color: sublabel }]}>{descricao}</Text>
          <Text style={[styles.meta, { color: dark ? '#666' : '#999' }]}>
            Nível: {nivel} • Categoria: {categoria}
          </Text>
          <Text style={[styles.tags, { color: accentColor }]}>#{tags.join('  #')}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

export default function Fundament() {
  const { colorScheme, accentColor } = useTheme();
  const dark = colorScheme === 'dark';
  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  const navigateToItem = async (id: string) => {
    setLoadingId(id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.navigate(`/content/fundamentals/${id}`);
    setLoadingId(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          style={[styles.container, { backgroundColor: bg }]}
          contentContainerStyle={styles.list}
          data={NonnegotiableFundamentals}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContentItem
              {...item}
              dark={dark}
              accentColor={accentColor}
              isLoading={loadingId === item.id}
              onPress={() => navigateToItem(item.id)}
            />
          )}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: {
    padding: 16,
    gap: 12,
    ...Platform.select({
      android: { paddingTop: 8 },
    }),
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, marginTop: 4 },
  meta: { fontSize: 12, marginTop: 6 },
  tags: { marginTop: 6, fontSize: 13 },
  loadingContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  loadingText: { marginTop: 8, fontSize: 14 },
});
