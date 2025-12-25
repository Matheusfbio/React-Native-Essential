import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { reactNativeMockData } from "@/data/reactNativeData";

export default function DynamicContent() {
  const { id } = useLocalSearchParams();
  const item = reactNativeMockData.find((item) => item.id === id);

  if (!item || !item.conteudo) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Conteúdo não encontrado</Text>
      </View>
    );
  }

  const { conteudo } = item;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>{conteudo.titulo}</Text>
        <Text style={styles.texto}>{conteudo.texto}</Text>
        {conteudo.quote && <Text style={styles.quote}>"{conteudo.quote}"</Text>}

        {conteudo.secoes?.map((secao, index) => (
          <View key={index}>
            <Text style={styles.subtitulo}>{secao.subtitulo}</Text>

            {secao.conteudo?.map((texto, i) => (
              <Text key={i} style={styles.texto}>
                {texto}
              </Text>
            ))}

            {secao.lista?.map((item, i) => (
              <Text key={i} style={styles.lista}>
                • {item}
              </Text>
            ))}

            {secao.codigo && <Text style={styles.code}>{secao.codigo}</Text>}
          </View>
        ))}

        {conteudo.conclusao && (
          <>
            <Text style={styles.subtitulo}>📘 Conclusão</Text>
            <Text style={styles.texto}>{conteudo.conclusao}</Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: "50%",
    padding: "10%",
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
