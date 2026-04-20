import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '@/components/ThemeContext';
import { useFavorites, Article } from '@/components/FavoritesContext';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

function ArticleModal({ article, visible, onClose, dark, accentColor }: {
  article: Article | null;
  visible: boolean;
  onClose: () => void;
  dark: boolean;
  accentColor: string;
}) {
  const { toggleFavorite } = useFavorites();
  if (!article) return null;

  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#fff';
  const labelColor = dark ? '#e5e5e5' : '#333';
  const sublabel = dark ? '#999' : '#666';

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={[styles.modalContainer, { backgroundColor: bg }]}>
        <View style={[styles.modalHeader, { backgroundColor: card, borderBottomColor: dark ? '#ffffff15' : '#00000010' }]}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <Ionicons name="close" size={24} color={labelColor} />
          </TouchableOpacity>
          <Text style={[styles.modalSource, { color: sublabel }]} numberOfLines={1}>
            {article.source.name}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => { toggleFavorite(article); onClose(); }} style={styles.headerButton}>
              <Ionicons name="heart" size={22} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(article.url)} style={styles.headerButton}>
              <Ionicons name="open-outline" size={22} color={accentColor} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.modalScroll} showsVerticalScrollIndicator={false}>
          {article.urlToImage && (
            <Image source={{ uri: article.urlToImage }} style={styles.modalImage} />
          )}
          <View style={[styles.modalContent, { backgroundColor: card }]}>
            <Text style={[styles.modalTitle, { color: labelColor }]}>{article.title}</Text>

            <View style={styles.modalMeta}>
              <Ionicons name="calendar-outline" size={13} color={sublabel} />
              <Text style={[styles.modalDate, { color: sublabel }]}>
                {new Date(article.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: dark ? '#ffffff15' : '#00000010' }]} />

            <Text style={[styles.modalDescription, { color: dark ? '#ccc' : '#444' }]}>
              {article.description}
            </Text>

            {article.content && (
              <Text style={[styles.modalBody, { color: sublabel }]}>
                {article.content.replace(/\[\+\d+ chars\]/, '').trim()}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.readMoreButton, { backgroundColor: accentColor }]}
              onPress={() => Linking.openURL(article.url)}
            >
              <Text style={styles.readMoreText}>Ler artigo completo</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default function Favorite() {
  const { colorScheme, accentColor } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const dark = colorScheme === 'dark';
  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#fff';
  const label = dark ? '#e5e5e5' : '#333';
  const sublabel = dark ? '#999' : '#666';

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: bg }]}>
        <Ionicons name="heart-outline" size={56} color={dark ? '#333' : '#ddd'} />
        <Text style={[styles.emptyTitle, { color: label }]}>Nenhum favorito ainda</Text>
        <Text style={[styles.emptySubtitle, { color: sublabel }]}>
          Salve notícias tocando no ❤️ no preview
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <FlatList
        data={favorites}
        style={{ backgroundColor: bg }}
        contentContainerStyle={styles.list}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: card }]}
            onPress={() => setSelectedArticle(item)}
          >
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.image} />
            )}
            <View style={styles.content}>
              <Text style={[styles.title, { color: label }]}>{item.title}</Text>
              <Text style={[styles.description, { color: sublabel }]} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.footer}>
                <Text style={[styles.source, { color: dark ? '#888' : '#999' }]}>
                  {item.source.name} • {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </Text>
                <View style={styles.footerIcons}>
                  <TouchableOpacity onPress={() => toggleFavorite(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="heart" size={16} color="#ef4444" />
                  </TouchableOpacity>
                  <Ionicons name="chevron-forward" size={14} color={accentColor} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <ArticleModal
        article={selectedArticle}
        visible={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        dark={dark}
        accentColor={accentColor}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', marginTop: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', paddingHorizontal: 32 },
  list: { padding: 16, gap: 16 },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: { width: '100%', height: 200 },
  content: { padding: 12, gap: 6 },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  footerIcons: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  source: { fontSize: 12 },
  modalContainer: { flex: 1 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerButton: { padding: 4 },
  headerActions: { flexDirection: 'row', gap: 8 },
  modalSource: { fontSize: 14, fontWeight: '500', flex: 1, textAlign: 'center', marginHorizontal: 8 },
  modalScroll: { gap: 0 },
  modalImage: { width: '100%', height: 220 },
  modalContent: { padding: 16, gap: 12, margin: 16, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: '700', lineHeight: 26 },
  modalMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  modalDate: { fontSize: 12 },
  divider: { height: 1 },
  modalDescription: { fontSize: 15, lineHeight: 22 },
  modalBody: { fontSize: 14, lineHeight: 22 },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    gap: 8,
    marginTop: 4,
  },
  readMoreText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
