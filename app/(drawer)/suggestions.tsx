import { StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Text, View } from "@/components/Themed";
import { TextInput, Button } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { useTheme } from "@/components/ThemeContext";

export default function Suggestions() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoSugestao, setTipoSugestao] = useState("");
  const [sugestao, setSugestao] = useState("");
  const { colorScheme } = useTheme();

  const enviarSugestao = async () => {
    if (!nome || !email || !sugestao) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios");
      return;
    }

    const dados = {
      nome,
      email,
      tipo: tipoSugestao || "Geral",
      sugestao,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("https://formspree.io/f/mzdbpgpz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        Alert.alert(
          "Sugestão Enviada!",
          "Obrigado pela sua contribuição. Sua sugestão foi enviada com sucesso!",
          [
            {
              text: "OK",
              onPress: () => {
                setNome("");
                setEmail("");
                setTipoSugestao("");
                setSugestao("");
              },
            },
          ]
        );
      } else {
        throw new Error("Erro no envio");
      }
    } catch (error) {
      Alert.alert(
        "Erro no Envio",
        "Não foi possível enviar a sugestão. Tente novamente mais tarde.",
        [
          { text: "Cancelar" },
          { text: "Tentar Novamente", onPress: enviarSugestao },
        ]
      );
    }
  };

  return (
    <ScrollView style={[styles.container, colorScheme === 'dark' && styles.containerDark]}>
      <View style={[styles.header, colorScheme === 'dark' && styles.headerDark]}>
        <Text style={styles.title}>💡 Sugestões</Text>
        <Text style={styles.subtitle}>
          Ajude-nos a melhorar o app com suas ideias!
        </Text>
      </View>

      <View style={[styles.form, colorScheme === 'dark' && styles.formDark]}>
        <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Nome *</Text>
        <TextInput
          style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
          placeholder="Seu nome"
          placeholderTextColor={colorScheme === 'dark' ? '#a3a3a3' : '#666'}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Email *</Text>
        <TextInput
          style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
          placeholder="seu@email.com"
          placeholderTextColor={colorScheme === 'dark' ? '#a3a3a3' : '#666'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Tipo de Sugestão</Text>
        <TextInput
          style={[styles.input, colorScheme === 'dark' && styles.inputDark]}
          placeholder="Ex: Nova funcionalidade, Melhoria, Bug"
          placeholderTextColor={colorScheme === 'dark' ? '#a3a3a3' : '#666'}
          value={tipoSugestao}
          onChangeText={setTipoSugestao}
        />

        <Text style={[styles.label, colorScheme === 'dark' && styles.labelDark]}>Sua Sugestão *</Text>
        <TextInput
          style={[styles.input, styles.textArea, colorScheme === 'dark' && styles.inputDark]}
          placeholder="Descreva sua ideia ou sugestão de melhoria..."
          placeholderTextColor={colorScheme === 'dark' ? '#a3a3a3' : '#666'}
          value={sugestao}
          onChangeText={setSugestao}
          multiline
          numberOfLines={4}
        />

        <Button title="Enviar Sugestão" onPress={enviarSugestao} />
      </View>

      <View style={[styles.examples, colorScheme === 'dark' && styles.examplesDark]}>
        <Text style={[styles.exampleTitle, colorScheme === 'dark' && styles.exampleTitleDark]}>💭 Exemplos de sugestões:</Text>
        <Text style={[styles.example, colorScheme === 'dark' && styles.exampleDark]}>• Adicionar modo escuro</Text>
        <Text style={[styles.example, colorScheme === 'dark' && styles.exampleDark]}>• Melhorar navegação</Text>
        <Text style={[styles.example, colorScheme === 'dark' && styles.exampleDark]}>• Novos tópicos de React Native</Text>
        <Text style={[styles.example, colorScheme === 'dark' && styles.exampleDark]}>• Sistema de favoritos</Text>
        <Text style={[styles.example, colorScheme === 'dark' && styles.exampleDark]}>• Busca por conteúdo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    padding: 20,
    backgroundColor: "#4f46e5",
    alignItems: "center",
  },
  headerDark: {
    backgroundColor: "#8b5cf6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e7ff",
    textAlign: "center",
  },
  form: {
    padding: 20,
  },
  formDark: {
    backgroundColor: "#1a1a1a",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  labelDark: {
    color: "#e5e5e5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  inputDark: {
    backgroundColor: "#2d2d2d",
    borderColor: "#555",
    color: "#e5e5e5",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  examples: {
    padding: 20,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  examplesDark: {
    backgroundColor: "#2d2d2d",
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4f46e5",
  },
  exampleTitleDark: {
    color: "#8b5cf6",
  },
  example: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  exampleDark: {
    color: "#a3a3a3",
  },
});
