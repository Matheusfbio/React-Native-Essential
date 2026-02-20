# Checklist de Segurança para Open Source

## ⚠️ ANTES DE TORNAR O PROJETO PÚBLICO

### 🔴 Credenciais e Secrets

- [ ] **URGENTE**: Remover `.env.local` do repositório
- [ ] Regenerar credenciais do Supabase (URL e Key foram expostas)
- [ ] Verificar histórico do Git por credenciais (`git log -p | grep -i "password\|key\|secret"`)
- [ ] Adicionar `.env.local` ao `.gitignore` (já está)
- [ ] Criar `.env.example` com valores placeholder (✅ criado)

### 📝 Documentação

- [✅] README.md
- [✅] LICENSE
- [✅] CONTRIBUTING.md
- [✅] CODE_OF_CONDUCT.md
- [✅] Issue templates
- [✅] PR template
- [ ] Adicionar badges (build status, license, etc)
- [ ] Screenshots/GIFs do app funcionando

### 🔧 Configuração

- [✅] .gitignore configurado
- [✅] ESLint configurado
- [✅] Prettier configurado
- [✅] Conventional commits (commitlint)
- [✅] GitHub Actions CI
- [ ] Testes funcionando

### 🔒 Segurança

- [ ] Remover dados sensíveis do código
- [ ] Verificar dependências vulneráveis (`npm audit`)
- [ ] Configurar Dependabot no GitHub
- [ ] Adicionar SECURITY.md com política de segurança

### 📦 Qualidade

- [ ] Código comentado onde necessário
- [ ] Remover código comentado/não usado
- [ ] Remover console.logs de debug
- [ ] Verificar TODOs no código

## 🚨 Ações Imediatas Necessárias

1. **NÃO PUBLIQUE O PROJETO AINDA**
2. Remova `.env.local` do Git:
   ```bash
   git rm --cached .env.local
   git commit -m "chore: remove sensitive env file"
   ```
3. Regenere as credenciais do Supabase no dashboard
4. Limpe o histórico do Git se já commitou credenciais
