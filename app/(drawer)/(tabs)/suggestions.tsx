import { StyleSheet, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Text, View } from "@/components/Themed";
import { TextInput, Button } from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function Suggestions() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoSugestao, setTipoSugestao] = useState("");
  const [sugestao, setSugestao] = useState("");

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💡 Sugestões</Text>
        <Text style={styles.subtitle}>
          Ajude-nos a melhorar o app com suas ideias!
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Tipo de Sugestão</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Nova funcionalidade, Melhoria, Bug"
          value={tipoSugestao}
          onChangeText={setTipoSugestao}
        />

        <Text style={styles.label}>Sua Sugestão *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva sua ideia ou sugestão de melhoria..."
          value={sugestao}
          onChangeText={setSugestao}
          multiline
          numberOfLines={4}
        />

        <Button title="Enviar Sugestão" onPress={enviarSugestao} />
      </View>

      <View style={styles.examples}>
        <Text style={styles.exampleTitle}>💭 Exemplos de sugestões:</Text>
        <Text style={styles.example}>• Adicionar modo escuro</Text>
        <Text style={styles.example}>• Melhorar navegação</Text>
        <Text style={styles.example}>• Novos tópicos de React Native</Text>
        <Text style={styles.example}>• Sistema de favoritos</Text>
        <Text style={styles.example}>• Busca por conteúdo</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    padding: 20,
    backgroundColor: "#4f46e5",
    alignItems: "center",
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
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
  exampleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4f46e5",
  },
  example: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});
