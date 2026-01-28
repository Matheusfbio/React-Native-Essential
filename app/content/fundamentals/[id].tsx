import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { NonnegotiableFundamentals } from "@/data/Non-negotiablefundamentalsData";
import { useTheme } from "@/components/ThemeContext";

export default function DynamicContent() {
  const { id } = useLocalSearchParams();
  const item = NonnegotiableFundamentals.find((item) => item.id === id);
  const { colorScheme } = useTheme();

  if (!item || !item.conteudo) {
    return (
      <View
        style={[
          styles.container,
          colorScheme === "dark" && styles.containerDark,
        ]}
      >
        <Text
          style={[styles.titulo, colorScheme === "dark" && styles.tituloDark]}
        >
          Conteúdo não encontrado
        </Text>
      </View>
    );
  }

  const { conteudo } = item;

  return (
    <>
      <Stack.Screen
        options={{
          title: conteudo.titulo,
          headerShown: true,
        }}
      />
      <ScrollView>
        <View
          style={[
            styles.container,
            colorScheme === "dark" && styles.containerDark,
          ]}
        >
          <Text
            style={[styles.titulo, colorScheme === "dark" && styles.tituloDark]}
          >
            {conteudo.titulo}
          </Text>
          <Text
            style={[styles.texto, colorScheme === "dark" && styles.textoDark]}
          >
            {conteudo.texto}
          </Text>
          {conteudo.quote && (
            <Text
              style={[styles.quote, colorScheme === "dark" && styles.quoteDark]}
            >
              "{conteudo.quote}"
            </Text>
          )}

          {conteudo.secoes?.map((secao, index) => (
            <View key={index}>
              <Text
                style={[
                  styles.subtitulo,
                  colorScheme === "dark" && styles.subtituloDark,
                ]}
              >
                {secao.subtitulo}
              </Text>

              {(secao as any).conteudo &&
                (secao as any).conteudo.map((texto: string, i: number) => (
                  <Text
                    key={i}
                    style={[
                      styles.texto,
                      colorScheme === "dark" && styles.textoDark,
                    ]}
                  >
                    {texto}
                  </Text>
                ))}

              {(secao as any).lista &&
                (secao as any).lista.map((item: string, i: number) => (
                  <Text
                    key={i}
                    style={[
                      styles.lista,
                      colorScheme === "dark" && styles.listaDark,
                    ]}
                  >
                    • {item}
                  </Text>
                ))}

              {secao.codigo && (
                <Text
                  style={[
                    styles.code,
                    colorScheme === "dark" && styles.codeDark,
                  ]}
                >
                  {secao.codigo}
                </Text>
              )}
            </View>
          ))}

          {conteudo.conclusao && (
            <>
              <Text
                style={[
                  styles.subtitulo,
                  colorScheme === "dark" && styles.subtituloDark,
                ]}
              >
                📘 Conclusão
              </Text>
              <Text
                style={[
                  styles.texto,
                  colorScheme === "dark" && styles.textoDark,
                ]}
              >
                {conteudo.conclusao}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        paddingBottom: "50%",
        padding: "5%",
        backgroundColor: "#f9f9f9",
      },
      web: {
        paddingBottom: "50%",
        padding: "2%",
        backgroundColor: "#f9f9f9",
      },
    }),
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4f46e5",
  },
  tituloDark: {
    color: "#8b5cf6",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#4338ca",
  },
  subtituloDark: {
    color: "#a78bfa",
  },
  texto: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  textoDark: {
    color: "#e5e5e5",
  },
  quote: {
    fontStyle: "italic",
    color: "#555",
    marginVertical: 10,
  },
  quoteDark: {
    color: "#a3a3a3",
  },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  codeDark: {
    backgroundColor: "#2d2d2d",
    color: "#f5f5f5",
  },
  lista: {
    fontSize: 16,
    marginLeft: 10,
    color: "#444",
  },
  listaDark: {
    color: "#d4d4d4",
  },
  backButton: {
    padding: 15,
    backgroundColor: "#4f46e5",
    margin: 10,
    marginTop: 40,
    borderRadius: 8,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
