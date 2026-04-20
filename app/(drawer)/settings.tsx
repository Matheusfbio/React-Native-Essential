import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { Text } from '@/components/Themed';
import { useTheme } from '@/components/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const THEMES = [
  { value: 'light', label: '☀️ Claro' },
  { value: 'dark', label: '🌙 Escuro' },
  { value: 'system', label: '⚙️ Sistema' },
] as const;

// const ACCENT_COLORS = [
//   { color: '#4f46e5', label: 'Índigo' },
//   { color: '#0ea5e9', label: 'Azul' },
//   { color: '#10b981', label: 'Verde' },
//   { color: '#f59e0b', label: 'Âmbar' },
//   { color: '#ef4444', label: 'Vermelho' },
//   { color: '#ec4899', label: 'Rosa' },
//   { color: '#8b5cf6', label: 'Violeta' },
//   { color: '#f97316', label: 'Laranja' },
// ];

export default function Settings() {
  const { theme, setTheme, colorScheme, accentColor, setAccentColor } =
    useTheme();
  const dark = colorScheme === 'dark';
  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#fff';
  const text = dark ? '#e5e5e5' : '#1a1a1a';
  const sub = dark ? '#999' : '#666';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={[styles.sectionTitle, { color: sub }]}>APARÊNCIA</Text>
        <View style={[styles.card, { backgroundColor: card }]}>
          {THEMES.map(({ value, label }, i) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.row,
                i < THEMES.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: dark ? '#333' : '#f0f0f0',
                },
              ]}
              onPress={() => setTheme(value)}
            >
              <Text style={[styles.rowLabel, { color: text }]}>{label}</Text>
              <View style={[styles.radio, { borderColor: accentColor }]}>
                {theme === value && (
                  <View
                    style={[styles.radioDot, { backgroundColor: accentColor }]}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* <Text style={[styles.sectionTitle, { color: sub }]}>
          COR DE DESTAQUE
        </Text> */}
        {/* <View style={[styles.card, { backgroundColor: card }]}>
          <View style={styles.colorGrid}>
            {ACCENT_COLORS.map(({ color, label }) => (
              <TouchableOpacity
                key={color}
                style={styles.colorItem}
                onPress={() => setAccentColor(color)}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    accentColor === color && styles.colorSelected,
                  ]}
                />
                <Text style={[styles.colorLabel, { color: sub }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}

        {/* <Text style={[styles.sectionTitle, { color: sub }]}>PRÉVIA</Text>
        <View style={[styles.card, { backgroundColor: card }]}>
          <View style={[styles.preview, { backgroundColor: accentColor }]}>
            <Text style={styles.previewText}>Cor de destaque ativa</Text>
          </View>
          <TouchableOpacity
            style={[styles.previewButton, { backgroundColor: accentColor }]}
          >
            <Text style={styles.previewButtonText}>Botão de exemplo</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginTop: 16,
    marginBottom: 4,
    marginLeft: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLabel: { fontSize: 16 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  colorItem: {
    alignItems: 'center',
    gap: 4,
    width: '20%',
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    ...Platform.select({
      android: { elevation: 4 },
      ios: { shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4 },
    }),
  },
  colorLabel: { fontSize: 11 },
  preview: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewText: { color: '#fff', fontWeight: '600' },
  previewButton: {
    margin: 16,
    marginTop: 0,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  previewButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
