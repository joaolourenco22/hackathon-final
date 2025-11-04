# Dashboard do Recrutador

MVP funcional para listar, filtrar e comparar candidatos combinando métricas de hard skills (mock GitHub) e soft skills (mock quiz), com total_score = 0.6*hard + 0.4*soft (ajustável por query `weight_hard`). Inclui dois gráficos radar (SVG puro): Comparação (até 3 candidatos) e Individual (6 eixos de soft skills).

## ✨ Funcionalidades
- [x] Filtros: busca, role, localização, mín. hard/soft, peso hard via slider
- [x] Ranking de candidatos com ordenação server-side (por total/hard/soft)
- [x] KPIs: média Hard, média Soft, limiar Top 10% por Total
- [x] Radar Comparação (até 3): Hard × Soft × Total (SVG)
- [x] Radar Individual: 6 eixos (soft skills) (SVG)
- [x] Endpoint de seed com 20 candidatos de exemplo
- [x] Sem autenticação, responsivo (Tailwind) e acessível (ARIA nos gráficos)

## 🛠️ Tecnologias e Ferramentas
- Next.js ^15, React ^19, TailwindCSS ^4
- Express ^5, Node.js, CORS, Dotenv
- MongoDB + Mongoose ^8
- Nodemon, ESLint

## Como Executar

1. Instalar dependências
```bash
npm install
```

2. Configurar variáveis de ambiente (`.env` na raiz)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
NODE_ENV=development
PORT=3000
```

3. Iniciar em desenvolvimento
```bash
npm run dev
```

4. Acessar
- Interface: http://localhost:3000
- API: http://localhost:3000/api/candidates, /api/kpis, /api/seed

5. Popular base (opcional)
```bash
curl -X POST "http://localhost:3000/api/seed?reset=true"
```

## Estrutura do Projeto

```
lib/
  mongodb.js              # Conexão MongoDB (cache de conexão)
models/
  Nome.js                 # Modelo legado de exemplo
  Candidate.js            # Modelo do candidato
src/
  pages/
    _app.js
    _document.js
    index.js              # Dashboard: filtros, KPIs, ranking, radares
  services/
    api.js                # Chamadas a /api/candidates, /api/kpis, /api/seed
  styles/
    globals.css
server.js                 # Next + Express + API endpoints
```

## Como Testar Rápido
- Rodar `npm run dev` e abrir `http://localhost:3000`
- Se não houver dados, clique em “Aplicar Filtros” (a página tenta semear automaticamente na primeira carga). Ou use o endpoint de seed manualmente.

## Regras de Desenvolvimento
- Utilize toda informação disponível no diretório.
- Código modular, validado e com sanitização básica no backend.
- Padrões do projeto: JS puro (sem TS), sem libs de gráficos externas.
- Não quebrar funcionalidades existentes (endpoints de nomes mantidos).
- UI clara, responsiva, sem gradientes; acessível (ARIA nos gráficos SVG).

