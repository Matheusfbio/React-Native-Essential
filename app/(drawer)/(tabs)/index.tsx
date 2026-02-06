import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export default function Home() {
  const { colorScheme } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const loadPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const createPost = async () => {
    if (!title || !content || !author) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    await supabase.from("posts").insert({ title, content, author });
    setTitle("");
    setContent("");
    setAuthor("");
    loadPosts();
  };

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
    <View style={{ flex: 1, backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" }}>
      <View
        style={[styles.form, { backgroundColor: isDark ? "#2a2a2a" : "#fff" }]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? "#e5e5e5" : "#333",
              borderColor: isDark ? "#444" : "#ddd",
            },
          ]}
          placeholder="Título"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? "#e5e5e5" : "#333",
              borderColor: isDark ? "#444" : "#ddd",
            },
          ]}
          placeholder="Conteúdo"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TextInput
          style={[
            styles.input,
            {
              color: isDark ? "#e5e5e5" : "#333",
              borderColor: isDark ? "#444" : "#ddd",
            },
          ]}
          placeholder="Autor"
          placeholderTextColor={isDark ? "#888" : "#999"}
          value={author}
          onChangeText={setAuthor}
        />
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: isDark ? "#2a2a2a" : "#fff" },
            ]}
          >
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
              {item.content}
            </Text>
            <Text style={[styles.source, { color: isDark ? "#888" : "#999" }]}>
              {item.author} •{" "}
              {new Date(item.created_at).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 16,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
