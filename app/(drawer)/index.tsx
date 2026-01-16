import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState } from "react";
import { NonnegotiableFundamentals } from "@/data/Non-negotiablefundamentalsData";

export default function Home() {
  type ItemProps = {
    titulo: string;
    descricao: string;
    nivel: string;
    categoria: string;
    tags: string[];
  };

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const navigation = async (id: string) => {
    setLoadingId(id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.navigate(`/content/fundamentals/${id}`);
    setLoadingId(null);
  };
  const Item = ({
    id,
    titulo,
    descricao,
    nivel,
    categoria,
    tags,
  }: ItemProps & { id: string }) => {
    const isLoading = loadingId === id;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            navigation(id);
          }}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4f46e5" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>{titulo}</Text>
              <Text style={styles.description}>{descricao}</Text>
              <Text style={styles.meta}>
                Nível: {nivel} • Categoria: {categoria}
              </Text>
              <Text style={styles.tags}>#{tags.join("  #")}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.container}
        data={NonnegotiableFundamentals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      web: {
        marginTop: 5,
        marginBottom: -55,
      },
      android: {
        marginTop: -25,
        marginBottom: -25,
      },
    }),
  },
  card: {
    padding: 16,
    width: "90%",
    marginHorizontal: "auto",
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#ccc",
    marginVertical: 4,
  },
  meta: {
    color: "#999",
    fontSize: 12,
    marginTop: 4,
  },
  tags: {
    color: "#90caf9",
    marginTop: 4,
    fontSize: 13,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
  },
});
