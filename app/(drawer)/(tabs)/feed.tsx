import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

export default function Feed() {
  const { colorScheme } = useTheme();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=react-native&language=en&sortBy=publishedAt&apiKey=c384cf9dad3140a58912e9e35ffeeab6",
    )
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const isDark = colorScheme === "dark";

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
        ]}
      >
        <ActivityIndicator size="large" color={isDark ? "#e5e5e5" : "#333"} />
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      style={{ backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" }}
      contentContainerStyle={styles.list}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
          ]}
          onPress={() => Linking.openURL(item.url)}
        >
          {item.urlToImage && (
            <Image source={{ uri: item.urlToImage }} style={styles.image} />
          )}
          <View style={styles.content}>
            <Text
              style={[styles.title, { color: isDark ? "#e5e5e5" : "#333" }]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.description,
                { color: isDark ? "#b5b5b5" : "#666" },
              ]}
            >
              {item.description}
            </Text>
            <Text style={[styles.source, { color: isDark ? "#888" : "#999" }]}>
              {item.source.name} •{" "}
              {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
  },
});
