# Setup do Projeto

## Após clonar o repositório

```bash
# Instalar dependências
npm install

# Configurar husky (hooks do git)
npm run prepare

# Verificar lint
npm run lint

# Formatar código
npm run format
```

## Conventional Commits

Este projeto usa conventional commits. Seus commits devem seguir o formato:

```
tipo(escopo): descrição
```

Exemplos:
- `feat(auth): adiciona login com Google`
- `fix(api): corrige timeout`
- `docs: atualiza README`

Veja [CONVENTIONAL_COMMITS.md](CONVENTIONAL_COMMITS.md) para mais detalhes.

## CI/CD

O projeto usa GitHub Actions para:
- ✅ Lint automático
- ✅ Testes automáticos
- ✅ Build de validação

Todos os PRs devem passar nos checks antes do merge.
