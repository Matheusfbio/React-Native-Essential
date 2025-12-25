import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Components() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>
        📱 O que é um Componente no React Native?
      </Text>
      <Text style={styles.texto}>
        Um <Text style={styles.bold}>componente</Text> em React Native é uma
        função (ou classe) que retorna elementos visuais da interface do
        usuário. Ele funciona como um
        <Text style={styles.bold}>bloco de construção</Text> da sua aplicação.
      </Text>
      <Text style={styles.quote}>
        “Pense em componentes como peças de LEGO que juntas constroem a
        interface do aplicativo.”
      </Text>

      <Text style={styles.subtitulo}>🧱 Tipos de Componentes</Text>
      <Text style={styles.texto}>
        1. <Text style={styles.bold}>Componentes de função:</Text> os mais
        comuns, utilizam hooks.
      </Text>
      <Text style={styles.code}>
        {`const MeuComponente = () => (\n  <View><Text>Olá, mundo!</Text></View>\n);`}
      </Text>

      <Text style={styles.texto}>
        2. <Text style={styles.bold}>Componentes de classe:</Text> usados antes
        dos hooks.
      </Text>

      <Text style={styles.subtitulo}>
        📦 Componentes Internos do React Native
      </Text>
      <Text style={styles.lista}>• Text → Exibe textos</Text>
      <Text style={styles.lista}>• View → Container genérico</Text>
      <Text style={styles.lista}>• ScrollView → Conteúdo com rolagem</Text>
      <Text style={styles.lista}>• TextInput → Entrada de texto</Text>
      <Text style={styles.lista}>• Button → Botão básico</Text>
      <Text style={styles.lista}>• TouchableOpacity → Área clicável</Text>

      <Text style={styles.subtitulo}>♻️ Por que usar componentes?</Text>
      <Text style={styles.texto}>• Reutilização</Text>
      <Text style={styles.texto}>• Organização</Text>
      <Text style={styles.texto}>• Manutenção facilitada</Text>

      <Text style={styles.subtitulo}>💡 Dica prática</Text>
      <Text style={styles.code}>
        {`const Titulo = ({ children }) => (\n  <Text style={{ fontSize: 24 }}>{children}</Text>\n);`}
      </Text>

      <Text style={styles.subtitulo}>📘 Conclusão</Text>
      <Text style={styles.texto}>
        Componentes são a base de qualquer app React Native. Eles permitem
        modularizar, reutilizar e organizar melhor o seu código.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: "50%",
    padding: "10%",
    // flex: 1,
    // width: "100%",
    height: "20%",
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4f46e5",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#4338ca",
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  quote: {
    fontStyle: "italic",
    color: "#555",
    marginVertical: 10,
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  lista: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
});
