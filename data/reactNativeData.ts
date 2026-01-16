export const coreReactNative = [
  {
    id: "1",
    categoria: "Fundamentos",
    titulo: "Componentes",
    descricao:
      "Elementos reutilizáveis que descrevem partes da interface de usuário.",
    nivel: "Básico",
    tags: ["JSX", "UI", "Props"],
    conteudo: {
      titulo: "📱 O que é um Componente no React Native?",
      texto:
        "Um componente em React Native é uma função (ou classe) que retorna elementos visuais da interface do usuário. Ele funciona como um bloco de construção da sua aplicação.",
      quote:
        "Pense em componentes como peças de LEGO que juntas constroem a interface do aplicativo.",
      secoes: [
        {
          subtitulo: "🧱 Tipos de Componentes",
          conteudo: [
            "1. Componentes de função: os mais comuns, utilizam hooks.",
            "2. Componentes de classe: usados antes dos hooks.",
          ],
          codigo:
            "const MeuComponente = () => (\n  <View><Text>Olá, mundo!</Text></View>\n);",
        },
        {
          subtitulo: "📦 Componentes Internos do React Native",
          lista: [
            "Text → Exibe textos",
            "View → Container genérico",
            "ScrollView → Conteúdo com rolagem",
            "TextInput → Entrada de texto",
            "Button → Botão básico",
            "TouchableOpacity → Área clicável",
          ],
        },
        {
          subtitulo: "♻️ Por que usar componentes?",
          lista: ["Reutilização", "Organização", "Manutenção facilitada"],
        },
        {
          subtitulo: "💡 Dica prática",
          codigo:
            "const Titulo = ({ children }) => (\n  <Text style={{ fontSize: 24 }}>{children}</Text>\n);",
        },
      ],
      conclusao:
        "Componentes são a base de qualquer app React Native. Eles permitem modularizar, reutilizar e organizar melhor o seu código.",
    },
  },
  {
    id: "2",
    categoria: "Fundamentos",
    titulo: "Props e State",
    descricao:
      "Mecanismos para passar dados e manter o estado interno dos componentes.",
    nivel: "Básico",
    tags: ["State", "Props", "Reatividade"],
    conteudo: {
      titulo: "🔄 Props e State no React Native",
      texto:
        "Props são dados passados de um componente pai para filho, enquanto State é o estado interno do componente que pode mudar ao longo do tempo.",
      quote: "Props fluem para baixo, eventos fluem para cima.",
      secoes: [
        {
          subtitulo: "📥 O que são Props?",
          conteudo: [
            "Props (propriedades) são dados imutáveis passados para componentes.",
            "Permitem personalizar componentes reutilizáveis.",
          ],
          codigo:
            'const Saudacao = ({ nome }) => (\n  <Text>Olá, {nome}!</Text>\n);\n\n<Saudacao nome="João" />',
        },
        {
          subtitulo: "🔄 O que é State?",
          conteudo: [
            "State é o estado interno mutável do componente.",
            "Usado para dados que mudam ao longo do tempo.",
          ],
          codigo:
            'const [contador, setContador] = useState(0);\n\n<Button \n  title="+1" \n  onPress={() => setContador(contador + 1)} \n/>',
        },
      ],
      conclusao:
        "Props e State são fundamentais para criar componentes dinâmicos e interativos.",
    },
  },
  {
    id: "3",
    categoria: "Fundamentos",
    titulo: "Estilização com StyleSheet",
    descricao:
      "Forma padrão de estilizar componentes usando objetos JavaScript.",
    nivel: "Básico",
    tags: ["Estilo", "CSS-in-JS"],
    conteudo: {
      titulo: "🎨 Estilização no React Native",
      texto:
        "StyleSheet é a API oficial para criar estilos no React Native, similar ao CSS mas usando objetos JavaScript.",
      quote:
        "Estilos bem organizados tornam o código mais legível e performático.",
      secoes: [
        {
          subtitulo: "📝 Criando Estilos",
          codigo:
            "const styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: '#fff',\n    alignItems: 'center'\n  },\n  texto: {\n    fontSize: 16,\n    color: '#333'\n  }\n});",
        },
        {
          subtitulo: "🎯 Propriedades Principais",
          lista: [
            "flex → Layout flexível",
            "backgroundColor → Cor de fundo",
            "fontSize → Tamanho da fonte",
            "padding/margin → Espaçamento",
            "alignItems → Alinhamento horizontal",
            "justifyContent → Alinhamento vertical",
          ],
        },
      ],
      conclusao:
        "StyleSheet oferece performance otimizada e organização clara dos estilos.",
    },
  },
];
