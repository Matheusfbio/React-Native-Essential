import { StyleSheet, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { useTheme } from '@/components/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Suggestions() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipoSugestao, setTipoSugestao] = useState('');
  const [sugestao, setSugestao] = useState('');
  const { colorScheme, accentColor } = useTheme();
  const dark = colorScheme === 'dark';

  const bg = dark ? '#1a1a1a' : '#f5f5f5';
  const card = dark ? '#2a2a2a' : '#fff';
  const labelColor = dark ? '#e5e5e5' : '#333';
  const sublabel = dark ? '#999' : '#666';
  const borderColor = dark ? '#ffffff15' : '#00000010';
  const inputBg = dark ? '#2a2a2a' : '#fff';
  const inputBorder = dark ? '#ffffff15' : '#ddd';

  const enviarSugestao = async () => {
    if (!nome || !email || !sugestao) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/mzdbpgpz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, tipo: tipoSugestao || 'Geral', sugestao, timestamp: new Date().toISOString() }),
      });

      if (response.ok) {
        Alert.alert('Sugestão Enviada!', 'Obrigado pela sua contribuição!', [{
          text: 'OK',
          onPress: () => { setNome(''); setEmail(''); setTipoSugestao(''); setSugestao(''); },
        }]);
      } else {
        throw new Error('Erro no envio');
      }
    } catch {
      Alert.alert('Erro no Envio', 'Não foi possível enviar. Tente novamente.', [
        { text: 'Cancelar' },
        { text: 'Tentar Novamente', onPress: enviarSugestao },
      ]);
    }
  };

  const inputStyle = [styles.input, { backgroundColor: inputBg, borderColor: inputBorder, color: labelColor }];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: sublabel }]}>INFORMAÇÕES</Text>

          <Text style={[styles.label, { color: labelColor }]}>Nome *</Text>
          <TextInput
            style={inputStyle}
            placeholder="Seu nome"
            placeholderTextColor={sublabel}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={[styles.label, { color: labelColor }]}>Email *</Text>
          <TextInput
            style={inputStyle}
            placeholder="seu@email.com"
            placeholderTextColor={sublabel}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: labelColor }]}>Tipo de Sugestão</Text>
          <TextInput
            style={inputStyle}
            placeholder="Ex: Nova funcionalidade, Melhoria, Bug"
            placeholderTextColor={sublabel}
            value={tipoSugestao}
            onChangeText={setTipoSugestao}
          />

          <Text style={[styles.label, { color: labelColor }]}>Sua Sugestão *</Text>
          <TextInput
            style={[inputStyle, styles.textArea]}
            placeholder="Descreva sua ideia ou sugestão..."
            placeholderTextColor={sublabel}
            value={sugestao}
            onChangeText={setSugestao}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={enviarSugestao}
          >
            <Text style={styles.buttonText}>Enviar Sugestão</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: card }]}>
          <Text style={[styles.sectionTitle, { color: sublabel }]}>EXEMPLOS</Text>
          {['Adicionar modo escuro', 'Melhorar navegação', 'Novos tópicos de React Native', 'Sistema de favoritos', 'Busca por conteúdo'].map(item => (
            <Text key={item} style={[styles.example, { color: sublabel, borderBottomColor: borderColor }]}>• {item}</Text>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, gap: 12 },
  card: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  label: { fontSize: 14, fontWeight: '500' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  example: { fontSize: 14, paddingVertical: 8, borderBottomWidth: 1 },
});
