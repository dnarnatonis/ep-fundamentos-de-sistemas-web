/* ============================================
   CARROSSEL DE PRODUTOS
   COMPONENTE INTERATIVO PARA DESTAQUE
   ============================================ */

class CarrosselProdutos {
    constructor(elementoId, opcoes = {}) {
        this.elemento = document.getElementById(elementoId);
        this.opcoes = {
            autoPlay: opcoes.autoPlay !== false,
            intervalo: opcoes.intervalo || 5000,
            pausarNoHover: opcoes.pausarNoHover !== false,
            ...opcoes
        };
        
        this.indiceAtual = 0;
        this.intervalId = null;
        this.slides = [];
        
        if (this.elemento) {
            this.inicializar();
        }
    }
    
    inicializar() {
        this.criarEstrutura();
        this.configurarEventos();
        
        if (this.opcoes.autoPlay) {
            this.iniciarAutoPlay();
        }
    }
    
    criarEstrutura() {
        // Lista de produtos em destaque
        const produtosCarrossel = [
            {
                id: 1,
                nome: 'Maçã Gala Premium',
                categoria: 'Frutas e Verduras',
                preco: 4.99,
                descricao: 'Maçãs frescas e suculentas, direto do pomar',
                imagem: 'https://placehold.co/400x300/e74c3c/ffffff?text=Maçã+Gala',
                promocao: true
            },
            {
                id: 2,
                nome: 'Arroz Integral 5kg',
                categoria: 'Alimentícios',
                preco: 22.90,
                descricao: 'Arroz integral de alta qualidade, rico em fibras',
                imagem: 'https://placehold.co/400x300/f39c12/ffffff?text=Arroz+Integral',
                promocao: false
            },
            {
                id: 3,
                nome: 'Kit Higiene Completo',
                categoria: 'Higiene e Limpeza',
                preco: 15.90,
                descricao: 'Kit com sabonete, shampoo e condicionador',
                imagem: 'https://placehold.co/400x300/3498db/ffffff?text=Kit+Higiene',
                promocao: true
            }
        ];
        
        // Montar estrutura do carrossel
        this.elemento.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-slides" id="carousel-slides">
                    ${produtosCarrossel.map((produto, index) => this.criarSlide(produto, index)).join('')}
                </div>
                
                <div class="carousel-navigation">
                    <button class="carousel-btn carousel-prev" aria-label="Produto anterior">
                        <span aria-hidden="true">&#8249;</span>
                    </button>
                    <button class="carousel-btn carousel-next" aria-label="Próximo produto">
                        <span aria-hidden="true">&#8250;</span>
                    </button>
                </div>
                
                <div class="carousel-indicators">
                    ${produtosCarrossel.map((_, index) => 
                        `<button class="indicator ${index === 0 ? 'active' : ''}" 
                                 aria-label="Ir para produto ${index + 1}"
                                 data-slide="${index}"></button>`
                    ).join('')}
                </div>
                
                <div class="carousel-progress">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            </div>
        `;
        
        this.slides = this.elemento.querySelectorAll('.carousel-slide');
        this.indicadores = this.elemento.querySelectorAll('.indicator');
    }
    
    criarSlide(produto, index) {
        const promocaoTag = produto.promocao ? '<span class="promocao-tag">PROMOÇÃO</span>' : '';
        
        return `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
                <div class="slide-image">
                    <img src="${produto.imagem}" 
                         alt="${produto.nome} - ${produto.descricao}" 
                         loading="lazy">
                    ${promocaoTag}
                </div>
                <div class="slide-content">
                    <div class="slide-category">${produto.categoria}</div>
                    <h3 class="slide-title">${produto.nome}</h3>
                    <p class="slide-description">${produto.descricao}</p>
                    <div class="slide-price">
                        ${produto.promocao ? '<span class="price-label">Oferta:</span>' : ''}
                        <span class="price-value">R$ ${produto.preco.toFixed(2)}</span>
                    </div>
                    <div class="slide-actions">
                        <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">
                            Adicionar ao Carrinho
                        </button>
                        <button class="btn btn-secondary" onclick="verDetalhes(${produto.id})">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    configurarEventos() {
        // Botões de navegação
        const btnPrev = this.elemento.querySelector('.carousel-prev');
        const btnNext = this.elemento.querySelector('.carousel-next');
        
        if (btnPrev) {
            btnPrev.addEventListener('click', () => this.anterior());
        }
        
        if (btnNext) {
            btnNext.addEventListener('click', () => this.proximo());
        }
        
        // Indicadores
        this.indicadores.forEach((indicador, index) => {
            indicador.addEventListener('click', () => this.irPara(index));
        });
        
        // Pause no hover se habilitado
        if (this.opcoes.pausarNoHover) {
            this.elemento.addEventListener('mouseenter', () => this.pausar());
            this.elemento.addEventListener('mouseleave', () => this.retomar());
        }
        
        // Navegação por teclado
        this.elemento.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.anterior();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.proximo();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.irPara(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.irPara(this.slides.length - 1);
                    break;
            }
        });
        
        // Permitir navegação por teclado
        this.elemento.setAttribute('tabindex', '0');
    }
    
    anterior() {
        const novoIndice = (this.indiceAtual - 1 + this.slides.length) % this.slides.length;
        this.irPara(novoIndice);
    }
    
    proximo() {
        const novoIndice = (this.indiceAtual + 1) % this.slides.length;
        this.irPara(novoIndice);
    }
    
    irPara(indice) {
        if (indice < 0 || indice >= this.slides.length || indice === this.indiceAtual) {
            return;
        }
        
        // Desativar slide atual
        this.slides[this.indiceAtual].classList.remove('active');
        this.indicadores[this.indiceAtual].classList.remove('active');
        
        // Atualizar índice
        this.indiceAtual = indice;
        
        // Ativar slide selecionado
        this.slides[this.indiceAtual].classList.add('active');
        this.indicadores[this.indiceAtual].classList.add('active');
        
        // Sincronizar barra de progresso
        this.atualizarProgresso();
        
        // Notificar leitores de tela
        this.anunciarMudanca();
    }
    
    iniciarAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        this.intervalId = setInterval(() => {
            this.proximo();
        }, this.opcoes.intervalo);
        
        this.atualizarProgresso();
    }
    
    pausar() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        // Pausar animação
        const progressBar = this.elemento.querySelector('#progress-bar');
        if (progressBar) {
            progressBar.style.animationPlayState = 'paused';
        }
    }
    
    retomar() {
        if (this.opcoes.autoPlay && !this.intervalId) {
            this.iniciarAutoPlay();
        }
        
        // Retomar animação
        const progressBar = this.elemento.querySelector('#progress-bar');
        if (progressBar) {
            progressBar.style.animationPlayState = 'running';
        }
    }
    
    atualizarProgresso() {
        const progressBar = this.elemento.querySelector('#progress-bar');
        if (progressBar && this.opcoes.autoPlay) {
            progressBar.style.animation = 'none';
            setTimeout(() => {
                progressBar.style.animation = `progress ${this.opcoes.intervalo}ms linear`;
            }, 10);
        }
    }
    
    anunciarMudanca() {
        // Preparar anúncio acessível
        const slideAtual = this.slides[this.indiceAtual];
        const titulo = slideAtual.querySelector('.slide-title').textContent;
        const categoria = slideAtual.querySelector('.slide-category').textContent;
        const preco = slideAtual.querySelector('.price-value').textContent;
        
        const anuncio = `Produto ${this.indiceAtual + 1} de ${this.slides.length}: ${titulo}, categoria ${categoria}, preço ${preco}`;
        
        // Criar notificação temporária
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.textContent = anuncio;
        
        document.body.appendChild(liveRegion);
        
        // Limpar notificação
        setTimeout(() => {
            document.body.removeChild(liveRegion);
        }, 1000);
    }
    
    // Limpar recursos do carrossel
    destruir() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        
        // Limpar eventos
        this.elemento.removeEventListener('mouseenter', this.pausar);
        this.elemento.removeEventListener('mouseleave', this.retomar);
        
        // Resetar elemento
        this.elemento.innerHTML = '';
    }
}

// Estilos do carrossel agora estão no arquivo carousel.css

// Configuração inicial
document.addEventListener('DOMContentLoaded', function() {
    // Instanciar carrossel
    const carrosselElement = document.getElementById('carrossel-produtos');
    if (carrosselElement) {
        window.carrosselProdutos = new CarrosselProdutos('carrossel-produtos', {
            autoPlay: true,
            intervalo: 6000,
            pausarNoHover: true
        });
    }
});

// Callbacks dos botões
function verDetalhes(produtoId) {
    window.location.href = `pages/detalhe-produto.html?produto=${produtoId}`;
}

// Export para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarrosselProdutos;
}
