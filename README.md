# Sistema Web para Minimercado

**Projeto:** Fundamentos de Sistemas Web  
**Instituição:** PUCRS - Pontifícia Universidade Católica do Rio Grande do Sul  
**Fase:** 2 - Interface Moderna e Interativa  

## Sobre o Projeto

Sistema web completo para minimercado desenvolvido com HTML5 semântico, CSS3 avançado, Bootstrap 5 e JavaScript interativo. Este projeto demonstra a aplicação prática dos fundamentos de sistemas web modernos, incluindo design responsivo, acessibilidade e interatividade dinâmica.

## Tecnologias Utilizadas

### Frontend

- **HTML5 semântico** - Estruturação completa do conteúdo
- **CSS3 avançado** - Pseudo-classes, pseudo-elementos, posicionamentos
- **Bootstrap 5** - Framework responsivo e componentes modernos
- **JavaScript ES6+** - Interatividade, DOM manipulation, arrays, funções temporais
- **Recursos de acessibilidade** - ARIA, navegação por teclado, leitores de tela

### Funcionalidades

- **Design responsivo** - Mobile-first, adaptável a todos os dispositivos
- **Carrossel interativo** - Produtos em destaque com navegação automática
- **Sistema de formulários** - Validação em tempo real, máscaras de entrada
- **Calendário de agendamento** - Seleção de datas e horários
- **Acessibilidade completa** - Conforme diretrizes WCAG 2.1

## Funcionalidades

### Catálogo de Produtos

**3 categorias disponíveis:**

- **Frutas e verduras** - Produtos frescos com descrição e preços
- **Produtos alimentícios não perecíveis** - Itens de despensa e conservas  
- **Produtos de higiene e limpeza** - Artigos de limpeza e cuidado pessoal

Cada produto inclui: foto, descrição detalhada e valor.

### Serviços Oferecidos

- **Retirada no local** - Coleta direta na loja
- **Tele-entrega** - Entrega em domicílio

Cada serviço possui descrição completa e informações de valor.

### Estrutura das Páginas

- **Página inicial** - Carrossel de produtos, informações dinâmicas, design moderno
- **Catálogo de produtos** - Cards responsivos, filtros dinâmicos, categorização
- **Detalhes do produto** - Informações completas com tabelas estruturadas
- **Serviços** - Modalidades de atendimento com tabelas de horários
- **Contato** - Formulário avançado com validação JavaScript
- **Cadastro** - Formulário completo com todos os elementos HTML5
- **Agendamento** - Sistema de calendário interativo com JavaScript

## Estrutura do Projeto

```text
/
├── index.html              # Página inicial com carrossel e recursos dinâmicos
├── pages/
│   ├── produtos.html       # Catálogo com filtros e cards responsivos
│   ├── servicos.html       # Serviços com tabelas estruturadas
│   ├── detalhe-produto.html # Detalhes com informações nutricionais
│   ├── contato.html        # Formulário avançado com validação
│   ├── cadastro.html       # Cadastro completo do cliente
│   └── agendamento.html    # Sistema de agendamento com calendário
├── assets/
│   ├── css/
│   │   ├── style.css       # CSS customizado com variáveis e pseudo-elementos
│   │   ├── responsive.css  # Media queries e design responsivo
│   │   ├── accessibility.css # Recursos de acessibilidade
│   │   └── carousel.css    # Estilos específicos do carrossel
│   ├── js/
│   │   ├── main.js         # JavaScript principal (arrays, DOM, funções temporais)
│   │   ├── carousel.js     # Carrossel interativo (funcionalidade)
│   │   ├── forms.js        # Validação de formulários
│   │   ├── calendar.js     # Sistema de calendário
│   │   └── accessibility.js # Recursos de acessibilidade
│   └── img/
│       ├── frutas/         # Imagens de frutas e verduras
│       ├── alimenticios/   # Imagens de produtos alimentícios
│       ├── higiene/        # Imagens de produtos de higiene
│       ├── banners/        # Imagens para carrossel
│       └── icons/          # Ícones da interface
└── vendor/
    └── bootstrap/          # Bootstrap framework
```

## Características Técnicas

### HTML5 Semântico (Aula 5)

- Uso correto de elementos estruturais (`header`, `nav`, `main`, `footer`)
- Hierarquia apropriada de títulos (`h1`-`h6`)
- Organização semântica do conteúdo (`section`, `article`, `figure`)

### Tabelas e Formulários (Aula 6)

- Tabelas estruturadas com `<table>`, `<thead>`, `<tbody>`, `<tfoot>`
- Formulários com `<fieldset>`, `<legend>`, `<label>`
- Elementos variados: radio, range, checkbox, select, textarea, progress
- Métodos POST/GET e validação HTML5

### CSS Avançado (Aula 7)

- Pseudo-classes: `:hover`, `:active`, `:focus`
- Pseudo-elementos: `:first-child`, `:last-child`, `:before`, `:after`
- Posicionamentos: estático, relativo, absoluto, fixo
- Variables CSS e sistema de cores consistente

### JavaScript Fundamentals (Aula 8)

- Sintaxe correta: const/var/let, case sensitive
- Métodos de arrays: join, reverse, sort, concat, slice, splice, push/pop
- Estruturas de controle: if-else, switch, for, while, do-while
- Funções temporais: setInterval, clearInterval, setTimeout

### JavaScript Interativo (Aula 9)

- Manipulação DOM com getElementById
- Carrossel interativo com controles manuais e automáticos
- Canvas para elementos gráficos (preparado para Chart.js)
- Event listeners e interatividade do usuário

### Acessibilidade (Aula 10)

- Suporte a tecnologias assistivas (linha Braille, leitores de tela)
- Correção de erros comuns: atributos alt, links adequados
- Ferramentas de validação: W3C, AccessMonitor
- Navegação por teclado completa
- ARIA labels e live regions

### Bootstrap 5

- Grid system responsivo
- Componentes: navbar, cards, modal, carousel, forms
- Classes utilitárias para spacing, typography, colors
- Design mobile-first

### Navegação e UX

- Skip links para acessibilidade
- Sistema de navegação consistente
- Design responsivo para todos os dispositivos
- Feedback visual para todas as interações

## Como Executar

### Execução Local

```bash
# Clone o repositório
git clone https://github.com/dnarnatonis/ep-fundamentos-de-sistemas-web.git

# Navegue até o diretório
cd ep-fundamentos-de-sistemas-web

# Abra o index.html no navegador
```

### Publicação Online

O projeto está configurado para publicação via GitHub Pages, permitindo acesso direto através de um link web.

## Validação e Qualidade

- **HTML válido** - Estrutura conforme padrões W3C
- **Semântica correta** - Uso apropriado de elementos HTML5
- **Acessibilidade** - Compatível com tecnologias assistivas
- **Performance** - Carregamento otimizado sem dependências externas

## Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Novas Funcionalidades da Fase 2

### Recursos Implementados

- **Carrossel de produtos** - Rotação automática, controles manuais, responsivo
- **Formulário de cadastro** - Validação em tempo real, máscaras de entrada
- **Sistema de agendamento** - Calendário interativo, seleção de horários
- **Design responsivo** - Mobile-first, Bootstrap 5, CSS Grid/Flexbox
- **Acessibilidade avançada** - Navegação por teclado, leitores de tela, alto contraste
- **Interatividade JavaScript** - Funções temporais, manipulação DOM, arrays

### Melhorias de UX

- **Interface moderna** - Cards, gradientes, animações suaves
- **Feedback visual** - Estados hover, focus, validação em tempo real
- **Navegação intuitiva** - Skip links, ARIA labels, estrutura semântica
- **Performance otimizada** - Lazy loading, minificação, CDN

## Próximas Fases

- **Fase 3:** Integração com back-end para persistência de dados
- **Fase 4:** Implementação de sistema de carrinho de compras
- **Fase 5:** API REST e funcionalidades avançadas de e-commerce

## Contribuição

Para reportar problemas ou sugerir melhorias:

1. Abra uma issue descrevendo o problema
2. Inclua informações sobre navegador e sistema operacional
3. Forneça steps para reproduzir o comportamento

## Licença

Projeto desenvolvido para fins acadêmicos como parte da disciplina Fundamentos de Sistemas Web da PUCRS.

---
