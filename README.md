# Sistema Web para Minimercado

**Projeto:** Fundamentos de Sistemas Web  
**Instituição:** PUCRS - Pontifícia Universidade Católica do Rio Grande do Sul  
**Fase:** 1 - HTML5 Semântico  

## Sobre o Projeto

Sistema web para minimercado desenvolvido utilizando exclusivamente HTML5 semântico, demonstrando a aplicação prática dos fundamentos de sistemas web. Este projeto foca na estruturação correta de conteúdo sem uso de CSS ou JavaScript.

## Tecnologias Utilizadas

- **HTML5 semântico** - Estruturação completa do conteúdo
- **Elementos semânticos** - header, nav, main, section, article, figure, footer
- **Acessibilidade** - Atributos alt, label, title para inclusão digital

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

- **Página inicial** - Apresentação do minimercado e navegação
- **Catálogo de produtos** - Listagem organizada por categorias
- **Detalhes do produto** - Informações específicas de cada item
- **Serviços** - Modalidades de atendimento disponíveis
- **Contato** - Formulário e informações de contato

## Estrutura do Projeto

```text
/
├── index.html              # Página inicial
├── pages/
│   ├── produtos.html       # Catálogo de produtos
│   ├── servicos.html       # Serviços oferecidos
│   ├── detalhe-produto.html # Detalhes de produto específico
│   └── contato.html        # Formulário de contato
└── assets/
    └── img/
        ├── frutas/         # Imagens de frutas e verduras
        ├── alimenticios/   # Imagens de produtos alimentícios
        └── higiene/        # Imagens de produtos de higiene
```

## Características Técnicas

### HTML5 Semântico

- Uso correto de elementos estruturais (`header`, `nav`, `main`, `footer`)
- Hierarquia apropriada de títulos (`h1`-`h6`)
- Organização semântica do conteúdo (`section`, `article`, `figure`)

### Acessibilidade

- Textos alternativos em todas as imagens
- Labels associados aos campos de formulário
- Navegação por teclado funcional
- Estrutura lógica para leitores de tela

### Navegação

- Sistema de navegação consistente entre páginas
- Links relativos para performance otimizada
- Estrutura de URLs intuitiva

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

## Limitações da Fase 1

- **Sem estilização** - Aparência padrão do navegador
- **Sem interatividade** - Formulários apenas com validação HTML5 nativa
- **Conteúdo estático** - Dados fixos no HTML

## Próximas Fases

- **Fase 2:** Implementação de CSS3 para design responsivo e estilização
- **Fase 3:** Adição de JavaScript para interatividade e validações
- **Fase 4:** Integração com back-end para funcionalidades dinâmicas

## Contribuição

Para reportar problemas ou sugerir melhorias:

1. Abra uma issue descrevendo o problema
2. Inclua informações sobre navegador e sistema operacional
3. Forneça steps para reproduzir o comportamento

## Licença

Projeto desenvolvido para fins acadêmicos como parte da disciplina Fundamentos de Sistemas Web da PUCRS.

---

**Desenvolvido com foco em:** Semântica HTML5, Acessibilidade Web, Estruturação de Conteúdo  
**Status:** Fase 1 Completa - HTML5 Semântico

