/* ============================================
   JAVASCRIPT PRINCIPAL
   FUNCIONALIDADES DINÂMICAS DO SITE
   ============================================ */

// Configurações e variáveis globais

// Configuração inicial do sistema
const MINIMERCADO_CONFIG = {
    nome: 'Minimercado Bom Preço',
    horarioFuncionamento: {
        segunda: '07:00-20:00',
        terca: '07:00-20:00',
        quarta: '07:00-20:00',
        quinta: '07:00-20:00',
        sexta: '07:00-20:00',
        sabado: '07:00-18:00',
        domingo: '08:00-14:00'
    },
    categorias: ['frutas-verduras', 'alimenticios', 'higiene-limpeza']
};

let produtosCarrossel = [];
var contadorVisitas = 0;

// Operações com arrays e produtos

// Array com produtos em destaque
const produtosDestaque = [
    { id: 1, nome: 'Maçã Gala', categoria: 'frutas-verduras', preco: 4.99 },
    { id: 2, nome: 'Arroz Branco', categoria: 'alimenticios', preco: 18.90 },
    { id: 3, nome: 'Sabonete Antibacteriano', categoria: 'higiene-limpeza', preco: 3.25 },
    { id: 4, nome: 'Alface Americana', categoria: 'frutas-verduras', preco: 2.49 },
    { id: 5, nome: 'Feijão Preto', categoria: 'alimenticios', preco: 7.50 },
    { id: 6, nome: 'Detergente Concentrado', categoria: 'higiene-limpeza', preco: 4.75 }
];

// Processamento de dados dos produtos
function processarProdutos() {
    // Concatenar nomes dos produtos
    const nomesProdutos = produtosDestaque.map(produto => produto.nome).join(', ');
    console.log('Produtos disponíveis:', nomesProdutos);
    
    // Inverter ordem para exibição alternativa
    const produtosReversos = [...produtosDestaque].reverse();
    
    // Ordenar produtos por preço
    const produtosPorPreco = [...produtosDestaque].sort((a, b) => a.preco - b.preco);
    
    // Combinar listas de produtos
    const todosProdutos = produtosDestaque.concat(produtosReversos);
    
    // Pegar apenas os primeiros produtos
    const primeiros3Produtos = produtosDestaque.slice(0, 3);
    
    // Localizar produto específico
    const indiceMaca = produtosDestaque.findIndex(p => p.nome.includes('Maçã'));
    
    // Gerenciar produtos no carrossel
    produtosCarrossel.push(...primeiros3Produtos);
    
    // Rotacionar produtos no carrossel
    const primeiroProduto = produtosCarrossel.shift();
    produtosCarrossel.unshift(primeiroProduto);
    
    return {
        produtos: produtosPorPreco,
        carrossel: produtosCarrossel,
        total: todosProdutos.length
    };
}

// Sistema de cálculo de preços e descontos
function calcularDesconto(preco, categoria, cliente) {
    let desconto = 0;
    
    // Verificar tipo de cliente
    const isClienteVip = cliente?.tipo === 'vip' ? true : false;
    
    // Aplicar desconto por categoria
    if (categoria === 'frutas-verduras') {
        desconto = 0.05; // 5% para frutas e verduras
    } else if (categoria === 'alimenticios') {
        desconto = 0.03; // 3% para alimentícios
    } else {
        desconto = 0.02; // 2% para higiene
    }
    
    // Desconto adicional por tipo de cliente
    switch (cliente?.tipo) {
        case 'vip':
            desconto += 0.1; // 10% adicional para VIP
            break;
        case 'estudante':
            desconto += 0.05; // 5% adicional para estudante
            break;
        case 'idoso':
            desconto += 0.08; // 8% adicional para idoso
            break;
        default:
            desconto += 0.01; // 1% para cliente comum
    }
    
    // Calcular preço final
    const precoFinal = preco - (preco * desconto);
    return Math.round(precoFinal * 100) / 100; // Arredondar para 2 casas
}

// Laços de repetição - for, while, do/while
function exibirProdutosPorCategoria() {
    const categorias = ['frutas-verduras', 'alimenticios', 'higiene-limpeza'];
    
    // Percorrer todas as categorias
    for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];
        console.log(`Categoria ${i + 1}: ${categoria}`);
        
        // Filtrar produtos por categoria
        const produtosDaCategoria = produtosDestaque.filter(p => p.categoria === categoria);
        
        // Listar produtos da categoria
        let j = 0;
        while (j < produtosDaCategoria.length) {
            console.log(`  - ${produtosDaCategoria[j].nome}: R$ ${produtosDaCategoria[j].preco}`);
            j++;
        }
    }
    
    // Contador de visitas
    do {
        contadorVisitas++;
        console.log(`Visita número: ${contadorVisitas}`);
    } while (contadorVisitas < 1);
}

// Controle de intervalos e timers

let intervalos = {
    carrossel: null,
    horario: null,
    promocoes: null
};

// Carrossel automático
function iniciarCarrossel() {
    let indiceAtual = 0;
    
    intervalos.carrossel = setInterval(() => {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slides.length > 0) {
            // Atualizar slide ativo
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Próximo slide
            indiceAtual = (indiceAtual + 1) % slides.length;
            
            // Ativar slide
            if (slides[indiceAtual]) {
                slides[indiceAtual].classList.add('active');
            }
        }
    }, 5000); // Intervalo de 5 segundos
}

// Sistema de notificações
function mostrarMensagemTemporaria(mensagem, duracao = 3000) {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = 'mensagem-temporaria';
    mensagemDiv.textContent = mensagem;
    mensagemDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 4px;
        z-index: 1000;
        animation: fadeIn 0.3s ease-in;
    `;
    
    document.body.appendChild(mensagemDiv);
    
    setTimeout(() => {
        mensagemDiv.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            if (mensagemDiv.parentNode) {
                mensagemDiv.parentNode.removeChild(mensagemDiv);
            }
        }, 300);
    }, duracao);
}

// Relógio de horário de funcionamento
function atualizarHorarioFuncionamento() {
    intervalos.horario = setInterval(() => {
        const agora = new Date();
        const diaSemana = agora.toLocaleDateString('pt-BR', { weekday: 'long' });
        const horaAtual = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        const elementoHorario = document.getElementById('horario-funcionamento');
        if (elementoHorario) {
            elementoHorario.innerHTML = `
                <strong>Hoje (${diaSemana}):</strong> ${MINIMERCADO_CONFIG.horarioFuncionamento[diaSemana.toLowerCase()] || 'Fechado'}<br>
                <strong>Horário atual:</strong> ${horaAtual}
            `;
        }
    }, 1000); // Atualiza a cada segundo
}

// Limpeza de intervalos
function pararIntervalos() {
    Object.keys(intervalos).forEach(key => {
        if (intervalos[key]) {
            clearInterval(intervalos[key]);
            intervalos[key] = null;
        }
    });
}

// Inicialização e controle da página
function inicializarPagina() {
    // Localizar elementos da página
    const elementos = {
        carrossel: document.getElementById('carrossel-produtos'),
        horario: document.getElementById('horario-funcionamento'),
        contador: document.getElementById('contador-visitas'),
        produtos: document.getElementById('lista-produtos')
    };
    
    // Configurar carrossel
    if (elementos.carrossel) {
        criarCarrossel();
        iniciarCarrossel();
    }
    
    // Ativar relógio de funcionamento
    if (elementos.horario) {
        atualizarHorarioFuncionamento();
    }
    
    // Controlar contador de visitas
    if (elementos.contador) {
        contadorVisitas = parseInt(localStorage.getItem('contadorVisitas') || '0') + 1;
        elementos.contador.textContent = `Visitas: ${contadorVisitas}`;
        localStorage.setItem('contadorVisitas', contadorVisitas.toString());
    }
    
    // Carregar dados dos produtos
    const dadosProdutos = processarProdutos();
    console.log('Produtos processados:', dadosProdutos);
    
    // Configurar interações
    inicializarEventos();
}

// Criar carrossel dinamicamente
function criarCarrossel() {
    const carrossel = document.getElementById('carrossel-produtos');
    if (!carrossel) return;
    
    const slides = produtosDestaque.slice(0, 3).map((produto, index) => `
        <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-produto-id="${produto.id}">
            <div class="slide-content">
                <h3>${produto.nome}</h3>
                <p class="categoria">${produto.categoria.replace('-', ' ')}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button class="btn-custom" onclick="adicionarAoCarrinho(${produto.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
    
    carrossel.innerHTML = `
        <div class="carousel-container">
            ${slides}
            <div class="carousel-controls">
                <button class="carousel-btn prev" onclick="mudarSlide(-1)">‹</button>
                <button class="carousel-btn next" onclick="mudarSlide(1)">›</button>
            </div>
            <div class="carousel-indicators">
                ${produtosDestaque.slice(0, 3).map((_, i) => 
                    `<span class="indicator ${i === 0 ? 'active' : ''}" onclick="irParaSlide(${i})"></span>`
                ).join('')}
            </div>
        </div>
    `;
}

// Controles do carrossel
let indiceSlideAtual = 0;
function mudarSlide(direcao) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicadores = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Remover classe ativa
    slides[indiceSlideAtual].classList.remove('active');
    indicadores[indiceSlideAtual].classList.remove('active');
    
    // Calcular novo índice
    indiceSlideAtual = (indiceSlideAtual + direcao + slides.length) % slides.length;
    
    // Ativar novo slide
    slides[indiceSlideAtual].classList.add('active');
    indicadores[indiceSlideAtual].classList.add('active');
}

function irParaSlide(indice) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicadores = document.querySelectorAll('.indicator');
    
    if (slides.length === 0 || indice < 0 || indice >= slides.length) return;
    
    // Remover classe ativa
    slides[indiceSlideAtual].classList.remove('active');
    indicadores[indiceSlideAtual].classList.remove('active');
    
    // Definir novo índice
    indiceSlideAtual = indice;
    
    // Ativar novo slide
    slides[indiceSlideAtual].classList.add('active');
    indicadores[indiceSlideAtual].classList.add('active');
}

// Gerenciamento de eventos

function inicializarEventos() {
    // Controles do carrossel
    const carrossel = document.getElementById('carrossel-produtos');
    if (carrossel) {
        // Pausar ao passar mouse
        carrossel.addEventListener('mouseenter', () => {
            if (intervalos.carrossel) {
                clearInterval(intervalos.carrossel);
            }
        });
        
        // Retomar ao tirar mouse
        carrossel.addEventListener('mouseleave', () => {
            iniciarCarrossel();
        });
    }
    
    // Validação de formulários
    const formularios = document.querySelectorAll('form');
    formularios.forEach(form => {
        form.addEventListener('submit', validarFormulario);
    });
    
    // Filtros de categoria
    const filtros = document.querySelectorAll('.filtro-categoria');
    filtros.forEach(filtro => {
        filtro.addEventListener('click', filtrarProdutos);
    });
}

// Validação de formulários
function validarFormulario(event) {
    const form = event.target;
    const campos = form.querySelectorAll('input[required], select[required], textarea[required]');
    let valido = true;
    
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            campo.classList.add('campo-invalido');
            valido = false;
        } else {
            campo.classList.remove('campo-invalido');
        }
    });
    
    if (!valido) {
        event.preventDefault();
        mostrarMensagemTemporaria('Por favor, preencha todos os campos obrigatórios.', 5000);
    }
}

// Filtrar produtos por categoria
function filtrarProdutos(event) {
    const categoria = event.target.dataset.categoria;
    const produtos = document.querySelectorAll('.product-card');
    
    produtos.forEach(produto => {
        if (!categoria || produto.dataset.categoria === categoria) {
            produto.style.display = 'block';
            produto.classList.add('fade-in');
        } else {
            produto.style.display = 'none';
        }
    });
    
    // Atualizar filtros ativos
    document.querySelectorAll('.filtro-categoria').forEach(f => f.classList.remove('ativo'));
    event.target.classList.add('ativo');
}

// Sistema de carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtosDestaque.find(p => p.id === produtoId);
    if (produto) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        
        const itemExistente = carrinho.find(item => item.id === produtoId);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        mostrarMensagemTemporaria(`${produto.nome} adicionado ao carrinho!`);
        atualizarContadorCarrinho();
    }
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const total = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.textContent = total;
        contador.style.display = total > 0 ? 'block' : 'none';
    }
}

// Inicialização do sistema

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema carregado com sucesso');
    inicializarPagina();
    exibirProdutosPorCategoria();
    atualizarContadorCarrinho();
});

// Limpeza ao sair da página
window.addEventListener('beforeunload', function() {
    pararIntervalos();
});

// Funções utilitárias

// Função para formatar preços
function formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco);
}

// Função para data/hora atual
function obterDataHora() {
    return new Date().toLocaleString('pt-BR');
}

// Debug para desenvolvimento
function debug(mensagem, dados) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[DEBUG] ${mensagem}:`, dados);
    }
}
