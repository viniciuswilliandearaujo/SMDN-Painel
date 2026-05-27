# SMDN - Sistema de Monitoramento de Desastres Naturais

Painel web operacional para instituições de resposta (Defesa Civil, SAMU, Bombeiros, Polícia) no Vale do Paraíba-SP.

## 🚀 Stack Tecnológico

- **Frontend**: Vite + React 18 + JavaScript (JSX)
- **Estilização**: Tailwind CSS + Design System customizado
- **Backend/Database**: Supabase (em integração)
- **Ícones**: SVGs locais em `/public/icons/`
- **Fonte**: K2D

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis globais
│   ├── Sidebar.jsx     # Barra lateral de navegação
│   ├── Card.jsx        # Card genérico
│   └── Modal.jsx       # Modal padrão
├── screens/            # Telas da aplicação
│   ├── Login.jsx       # Telas 1 e 2: Autenticação
│   ├── Dashboard.jsx   # Tela 3: Dashboard principal
│   ├── Reportar.jsx    # Tela 4: Histórico de alertas
│   ├── Ocorrencias.jsx # Tela 6: Tabela de ocorrências
│   ├── Relatorios.jsx  # Tela 7: Relatórios analíticos
│   ├── Auditoria.jsx   # Tela 8: Logs de auditoria
│   └── Perfil.jsx      # Telas 9 e 10: Perfil do operador
├── context/            # Context API para estado global
│   └── AuthContext.jsx
├── hooks/              # Custom hooks
│   └── useAuth.js
├── services/           # Chamadas API e Supabase
│   └── api.js
├── App.jsx             # Componente raiz
├── main.jsx            # Entry point
└── index.css           # Estilos globais + Tailwind

public/
├── icons/              # SVGs locais dos ícones
└── .gitkeep
```

## 🎨 Design System

### Paleta de Cores

```css
--bg-main: #e4e8eb;           /* Fundo geral */
--bg-sidebar: #09162e;        /* Sidebar */
--bg-surface: #ffffff;        /* Cards e modais */
--text-main: #44769b;         /* Textos principais */
--text-on-dark: #a6c1d4;      /* Textos sobre fundo escuro */
--action-inactive: #18395c;   /* Inativos */
--status-critical: #c60202;   /* Alta severidade */
--status-severe: #ff6a00;     /* Média severidade */
--status-regular: #cab900;    /* Moderada */
--status-success: #02c602;    /* Sucesso */
```

### Tipografia

- **Title Large**: 32px, Bold (Títulos principais)
- **Card Title**: 18px, Semi-Bold (Títulos internos)
- **Body**: 14px, Regular (Textos)
- **Label**: 12px, Bold (Cabeçalhos)

## 🔧 Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📋 Telas Mapeadas

1. **Login** - Coluna dupla com brand esquerda
2. **Solicitar Acesso** - Formulário de acesso
3. **Dashboard Principal** - Mapa + counters
4. **Reportar/Histórico** - Feed de alertas
5. **Modal de Disparo** - Pop-up de alerta
6. **Ocorrências** - Tabela com filtros
7. **Relatórios** - Dashboard analítico
8. **Auditoria** - Timeline de logs
9. **Perfil** - Dados do operador
10. **Editar Perfil** - Modal de edição

## 🔄 Integração Supabase

Todas as chamadas API estão marcadas com comentário:

```javascript
// TODO: Substituir por chamada real do Supabase
```

As respostas atualmente são mockadas com dados robustos para desenvolvimento.

## 📝 Licença

Proprietary - SMDN Vale do Paraíba-SP
