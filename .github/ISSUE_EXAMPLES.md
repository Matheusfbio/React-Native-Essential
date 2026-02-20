# Exemplos de Issues

## Como criar issues bem descritas

### Issue de Feature
```markdown
Título: [FEATURE] Adicionar modo escuro

Labels: enhancement, good first issue

Descrição:
Implementar toggle para alternar entre tema claro e escuro.

Problema: Usuários querem usar o app à noite sem desconforto visual.

Solução: Adicionar botão no header que alterna entre temas.

Arquivos envolvidos:
- components/ThemeToggleButton.tsx
- components/ThemeContext.tsx
```

### Issue de Bug
```markdown
Título: [BUG] Crash ao abrir galeria de fotos

Labels: bug, priority-high

Descrição:
App fecha inesperadamente ao tentar abrir a galeria.

Passos para reproduzir:
1. Abrir app
2. Clicar em "Adicionar foto"
3. App fecha

Ambiente: Android 14, Pixel 8
```

### Good First Issues
Marque issues simples com label `good first issue`:
- Correções de typo
- Melhorias de UI simples
- Adição de testes unitários
- Atualização de documentação
