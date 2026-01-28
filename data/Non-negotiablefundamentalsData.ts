export const NonnegotiableFundamentals = [
  {
    id: "1",
    categoria: "Base da Linguagem",
    titulo: "JavaScript Moderno (ES6+)",
    descricao:
      "Sintaxe moderna do JavaScript usada diariamente no React Native.",
    nivel: "Básico",
    tags: ["ES6", "JavaScript", "Array", "Imutabilidade"],
    conteudo: {
      titulo: "🧠 JavaScript moderno no React Native",
      texto:
        "React Native é escrito em JavaScript moderno. Entender ES6+ é obrigatório para escrever código limpo, legível e previsível.",
      quote:
        "Código simples não é código fraco. É código que sobrevive ao tempo.",
      secoes: [
        {
          subtitulo: "📦 Destructuring e Arrays",
          codigo:
            "const user = {\n  name: 'Mateus',\n  age: 25,\n};\n\nconst { name, age } = user;\n\nconst users = ['Ana', 'João', 'Carlos'];\nconst usersUpper = users.map(user => user.toUpperCase());",
        },
        {
          subtitulo: "♻️ Imutabilidade",
          codigo:
            "const numbers = [1, 2, 3];\n\nconst newNumbers = [...numbers, 4]; // não altera o original",
        },
      ],
      conclusao:
        "JavaScript moderno evita bugs, melhora a leitura e é a base de todo app React Native.",
    },
  },

  {
    id: "2",
    categoria: "Base da Linguagem",
    titulo: "Async / Await",
    descricao:
      "Forma moderna de lidar com código assíncrono e chamadas de API.",
    nivel: "Básico",
    tags: ["Async", "Await", "API", "Fetch"],
    conteudo: {
      titulo: "⏳ Async / Await no dia a dia",
      texto:
        "Aplicações React Native dependem de dados externos. Async/await torna o código assíncrono mais legível e seguro.",
      quote:
        "O mundo real falha. Seu código precisa estar preparado para isso.",
      secoes: [
        {
          subtitulo: "🌍 Buscando dados de uma API",
          codigo:
            "async function fetchUsers() {\n  try {\n    const response = await fetch('https://api.exemplo.com/users');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Erro ao buscar usuários', error);\n  }\n}",
        },
      ],
      conclusao:
        "Tratar erros não é opcional. É parte do contrato com o usuário.",
    },
  },

  {
    id: "3",
    categoria: "Tipagem",
    titulo: "TypeScript Básico",
    descricao:
      "Tipagem estática para evitar erros e melhorar a previsibilidade do código.",
    nivel: "Básico",
    tags: ["TypeScript", "Interfaces", "Tipos"],
    conteudo: {
      titulo: "🧩 Tipagem e contratos de código",
      texto:
        "TypeScript define contratos claros entre funções e componentes, reduzindo erros em tempo de execução.",
      quote: "Quanto menos suposição, menos bug.",
      secoes: [
        {
          subtitulo: "📐 Interface básica",
          codigo:
            "interface User {\n  id: number;\n  name: string;\n  isActive: boolean;\n}",
        },
        {
          subtitulo: "🔁 Tipagem de função",
          codigo:
            "function getUserName(user: User): string {\n  return user.name;\n}",
        },
      ],
      conclusao: "TypeScript traz segurança sem complicar o desenvolvimento.",
    },
  },

  {
    id: "4",
    categoria: "React",
    titulo: "Componentes Funcionais e State",
    descricao: "Base do React: componentes, estado e reatividade.",
    nivel: "Básico",
    tags: ["React", "useState", "Componentes"],
    conteudo: {
      titulo: "⚛️ Componentes e Estado",
      texto:
        "Componentes funcionais controlam a interface através de estado. Mudou o estado, a UI reage.",
      quote: "Estado manda. Interface obedece.",
      secoes: [
        {
          subtitulo: "🔢 Componente com State",
          codigo:
            "import { useState } from 'react';\nimport { Text, Button, View } from 'react-native';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <View>\n      <Text>Contador: {count}</Text>\n      <Button title=\"Somar\" onPress={() => setCount(count + 1)} />\n    </View>\n  );\n}",
        },
      ],
      conclusao: "Sem estado, não existe interação.",
    },
  },

  {
    id: "5",
    categoria: "React",
    titulo: "Props e Fluxo de Dados",
    descricao: "Comunicação entre componentes de forma previsível.",
    nivel: "Básico",
    tags: ["Props", "FluxoUnidirecional"],
    conteudo: {
      titulo: "📥 Props no React",
      texto:
        "Props permitem que componentes recebam dados externos de forma controlada.",
      quote: "Pai passa dados, filho consome. Ordem natural.",
      secoes: [
        {
          subtitulo: "➡️ Props em ação",
          codigo:
            'function Greeting({ name }: { name: string }) {\n  return <Text>Olá, {name}</Text>;\n}\n\nexport function Home() {\n  return <Greeting name="Mateus" />;\n}',
        },
      ],
      conclusao: "Fluxo de dados previsível facilita manutenção e testes.",
    },
  },

  {
    id: "6",
    categoria: "JSX",
    titulo: "Estrutura Declarativa",
    descricao: "JSX descreve a interface com base no estado da aplicação.",
    nivel: "Básico",
    tags: ["JSX", "Renderização", "Listas"],
    conteudo: {
      titulo: "🧱 JSX na prática",
      texto: "JSX permite descrever interfaces de forma declarativa e legível.",
      quote: "UI é função do estado. Sempre.",
      secoes: [
        {
          subtitulo: "⏳ Renderização condicional",
          codigo: "{isLoading && <Text>Carregando...</Text>}",
        },
        {
          subtitulo: "📋 Listas com map",
          codigo:
            "const users = [\n  { id: 1, name: 'Ana' },\n  { id: 2, name: 'João' },\n];\n\n{users.map(user => (\n  <Text key={user.id}>{user.name}</Text>\n))}",
        },
        {
          subtitulo: "🧩 Composição de componentes",
          codigo:
            "function Header() {\n  return <Text>Meu App</Text>;\n}\n\nfunction Screen() {\n  return (\n    <View>\n      <Header />\n      <Text>Conteúdo da tela</Text>\n    </View>\n  );\n}",
        },
      ],
      conclusao: "JSX bem estruturado torna o código mais claro e sustentável.",
    },
  },
];
