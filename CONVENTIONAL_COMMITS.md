# Conventional Commits

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/).

## Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

## Tipos

- **feat**: Nova feature
- **fix**: Correção de bug
- **docs**: Mudanças na documentação
- **style**: Formatação, ponto e vírgula, etc
- **refactor**: Refatoração de código
- **test**: Adição ou correção de testes
- **chore**: Tarefas de build, configs, etc
- **perf**: Melhorias de performance
- **ci**: Mudanças em CI/CD
- **build**: Mudanças no sistema de build
- **revert**: Reverter commit anterior

## Exemplos

```bash
feat(auth): adiciona login com Google
fix(api): corrige timeout na requisição
docs: atualiza README com instruções
style: formata código com prettier
refactor(components): simplifica lógica do Button
test(auth): adiciona testes de integração
chore: atualiza dependências
```
