import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

export default function Home() {
  type ItemProps = {
    titulo: string;
    descricao: string;
    nivel: string;
    categoria: string;
    tags: string[];
  };

  const reactNativeMockData = [
    {
      id: "1",
      categoria: "Fundamentos",
      titulo: "Componentes",
      descricao:
        "Elementos reutilizáveis que descrevem partes da interface de usuário.",
      nivel: "Básico",
      tags: ["JSX", "UI", "Props"],
    },
    {
      id: "2",
      categoria: "Fundamentos",
      titulo: "Props e State",
      descricao:
        "Mecanismos para passar dados e manter o estado interno dos componentes.",
      nivel: "Básico",
      tags: ["State", "Props", "Reatividade"],
    },
    {
      id: "3",
      categoria: "Fundamentos",
      titulo: "Estilização com StyleSheet",
      descricao:
        "Forma padrão de estilizar componentes usando objetos JavaScript.",
      nivel: "Básico",
      tags: ["Estilo", "CSS-in-JS"],
    },
    {
      id: "4",
      categoria: "Avançado",
      titulo: "Hooks personalizados",
      descricao: "Funções reutilizáveis que encapsulam lógica com React Hooks.",
      nivel: "Avançado",
      tags: ["Hooks", "useEffect", "Custom Hooks"],
    },
    {
      id: "5",
      categoria: "Avançado",
      titulo: "Context API",
      descricao:
        "Mecanismo para compartilhar estado entre vários componentes sem prop drilling.",
      nivel: "Intermediário",
      tags: ["Context", "Global State"],
    },
    {
      id: "6",
      categoria: "Bibliotecas",
      titulo: "React Navigation",
      descricao:
        "Biblioteca para navegação entre telas em aplicações React Native.",
      nivel: "Intermediário",
      tags: ["Navigation", "Stack", "Drawer"],
    },
    {
      id: "7",
      categoria: "Bibliotecas",
      titulo: "Redux Toolkit",
      descricao:
        "Abordagem simplificada para gerenciamento de estado com Redux.",
      nivel: "Avançado",
      tags: ["Redux", "Estado Global", "Toolkit"],
    },
    {
      id: "8",
      categoria: "Performance",
      titulo: "Memoização de componentes",
      descricao:
        "Otimização para evitar renderizações desnecessárias com React.memo e useMemo.",
      nivel: "Avançado",
      tags: ["memo", "useMemo", "Performance"],
    },
    {
      id: "9",
      categoria: "Performance",
      titulo: "FlatList vs ScrollView",
      descricao:
        "Diferença entre listas otimizadas e rolagens completas na tela.",
      nivel: "Intermediário",
      tags: ["Listas", "Scroll", "Renderização"],
    },
    {
      id: "10",
      categoria: "Boas Práticas",
      titulo: "Componentização",
      descricao:
        "Divisão da interface em componentes reutilizáveis e manuteníveis.",
      nivel: "Intermediário",
      tags: ["Componentes", "Reutilização"],
    },
    {
      id: "11",
      categoria: "Boas Práticas",
      titulo: "Acessibilidade",
      descricao:
        "Tornar o app utilizável por pessoas com deficiências, usando props como accessibilityLabel.",
      nivel: "Avançado",
      tags: ["A11y", "Inclusão"],
    },
    {
      id: "12",
      categoria: "Ecossistema",
      titulo: "Expo vs CLI",
      descricao: "Diferenças entre o uso do Expo e do React Native CLI puro.",
      nivel: "Básico",
      tags: ["Expo", "CLI", "Configuração"],
    },
    {
      id: "13",
      categoria: "Ecossistema",
      titulo: "TypeScript no React Native",
      descricao: "Uso de tipagem estática para melhorar a qualidade do código.",
      nivel: "Intermediário",
      tags: ["TypeScript", "TS", "Types"],
    },
  ];
  const navigation = () => {
    router.navigate("/modal");
  };

  const Item = ({ titulo, descricao, nivel, categoria, tags }: ItemProps) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          ToastAndroid.show(`${titulo}`, ToastAndroid.SHORT);
          navigation();
        }}
      >
        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.description}>{descricao}</Text>
        <Text style={styles.meta}>
          Nível: {nivel} • Categoria: {categoria}
        </Text>
        <Text style={styles.tags}>#{tags.join("  #")}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.container}
        data={reactNativeMockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -25,
    marginBottom: -55,
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
});
