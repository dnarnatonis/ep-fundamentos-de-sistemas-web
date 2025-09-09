/* ============================================
   RECURSOS DE ACESSIBILIDADE - FASE 2
   BASEADO NA AULA 10 - TECNOLOGIAS ASSISTIVAS
   ============================================ */

class GerenciadorAcessibilidade {
    constructor() {
        this.configuracoes = {
            tamanhoFonte: this.obterTamanhoFonte(),
            altoContraste: this.obterAltoContraste(),
            navegacaoTeclado: true,
            leituraAutomatica: false
        };
        
        this.inicializar();
    }
    
    inicializar() {
        this.criarPainelControles();
        this.configurarNavegacaoTeclado();
        this.verificarAltEmImagens();
        this.configurarLeitoresDeTelaAria();
        this.aplicarConfiguracoesSalvas();
        this.criarSkipLinks();
    }
    
    // ===========================================
    // PAINEL DE CONTROLES DE ACESSIBILIDADE
    // ===========================================
    
    criarPainelControles() {
        // Verificar se já existe
        if (document.getElementById('painel-acessibilidade')) return;
        
        const painel = document.createElement('div');
        painel.id = 'painel-acessibilidade';
        painel.className = 'accessibility-panel';
        painel.setAttribute('role', 'region');
        painel.setAttribute('aria-label', 'Controles de Acessibilidade');
        
        painel.innerHTML = `
            <button class="panel-toggle" aria-expanded="false" aria-controls="controles-acessibilidade">
                <span class="sr-only">Abrir controles de acessibilidade</span>
                ♿
            </button>
            
            <div class="panel-content" id="controles-acessibilidade" style="display: none;">
                <h3>Acessibilidade</h3>
                
                <div class="control-group">
                    <label for="tamanho-fonte">Tamanho da Fonte:</label>
                    <div class="button-group">
                        <button onclick="acessibilidade.alterarTamanhoFonte(-1)" aria-label="Diminuir fonte">A-</button>
                        <button onclick="acessibilidade.alterarTamanhoFonte(0)" aria-label="Fonte normal">A</button>
                        <button onclick="acessibilidade.alterarTamanhoFonte(1)" aria-label="Aumentar fonte">A+</button>
                    </div>
                </div>
                
                <div class="control-group">
                    <label>
                        <input type="checkbox" id="alto-contraste" onchange="acessibilidade.alternarAltoContraste()">
                        Alto Contraste
                    </label>
                </div>
                
                <div class="control-group">
                    <label>
                        <input type="checkbox" id="leitura-automatica" onchange="acessibilidade.alternarLeituraAutomatica()">
                        Leitura Automática
                    </label>
                </div>
                
                <div class="control-group">
                    <button onclick="acessibilidade.lerPagina()" class="btn-acao">
                        🔊 Ler Página
                    </button>
                </div>
                
                <div class="control-group">
                    <button onclick="acessibilidade.pararLeitura()" class="btn-acao">
                        ⏹ Parar Leitura
                    </button>
                </div>
                
                <div class="control-group">
                    <button onclick="acessibilidade.resetarConfiguracoes()" class="btn-reset">
                        🔄 Resetar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(painel);
        
        // Configurar toggle do painel
        const toggle = painel.querySelector('.panel-toggle');
        const content = painel.querySelector('.panel-content');
        
        toggle.addEventListener('click', () => {
            const isOpen = content.style.display !== 'none';
            content.style.display = isOpen ? 'none' : 'block';
            toggle.setAttribute('aria-expanded', !isOpen);
            
            if (!isOpen) {
                content.querySelector('h3').focus();
            }
        });
        
        // Fechar com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && content.style.display !== 'none') {
                content.style.display = 'none';
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }
    
    // ===========================================
    // SKIP LINKS PARA NAVEGAÇÃO RÁPIDA - AULA 10
    // ===========================================
    
    criarSkipLinks() {
        if (document.querySelector('.skip-links')) return;
        
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
            <a href="#navigation" class="skip-link">Pular para navegação</a>
            <a href="#footer" class="skip-link">Pular para rodapé</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
        
        // Adicionar IDs aos elementos se não existirem
        this.adicionarIDsSeNecessario();
    }
    
    adicionarIDsSeNecessario() {
        if (!document.getElementById('main-content')) {
            const main = document.querySelector('main') || document.querySelector('.main-content');
            if (main) main.id = 'main-content';
        }
        
        if (!document.getElementById('navigation')) {
            const nav = document.querySelector('nav') || document.querySelector('.navigation');
            if (nav) nav.id = 'navigation';
        }
        
        if (!document.getElementById('footer')) {
            const footer = document.querySelector('footer');
            if (footer) footer.id = 'footer';
        }
    }
    
    // ===========================================
    // TAMANHO DE FONTE AJUSTÁVEL
    // ===========================================
    
    alterarTamanhoFonte(incremento) {
        const tamanhos = ['14px', '16px', '18px', '20px', '24px'];
        const indices = [-2, -1, 0, 1, 2];
        
        let indiceAtual = indices.indexOf(this.configuracoes.tamanhoFonte);
        
        // Se não encontrou o valor ou é primeira vez, usar padrão (índice 2 = 16px)
        if (indiceAtual === -1) {
            indiceAtual = 2;
        }
        
        if (incremento === 0) {
            indiceAtual = 2; // Tamanho normal (16px)
        } else {
            indiceAtual = Math.max(0, Math.min(4, indiceAtual + incremento));
        }
        
        this.configuracoes.tamanhoFonte = indices[indiceAtual];
        const tamanho = tamanhos[indiceAtual];
        
        document.documentElement.style.fontSize = tamanho;
        
        // Salvar configuração
        localStorage.setItem('acessibilidade_tamanho_fonte', this.configuracoes.tamanhoFonte.toString());
        
        // Anunciar mudança para leitores de tela
        this.anunciarMudanca(`Tamanho da fonte alterado para ${tamanho}`);
    }
    
    obterTamanhoFonte() {
        return parseInt(localStorage.getItem('acessibilidade_tamanho_fonte') || '0');
    }
    
    // ===========================================
    // ALTO CONTRASTE - AULA 10
    // ===========================================
    
    alternarAltoContraste() {
        this.configuracoes.altoContraste = !this.configuracoes.altoContraste;
        
        document.body.classList.toggle('high-contrast-mode', this.configuracoes.altoContraste);
        
        // Salvar configuração
        localStorage.setItem('acessibilidade_alto_contraste', this.configuracoes.altoContraste.toString());
        
        // Atualizar checkbox
        const checkbox = document.getElementById('alto-contraste');
        if (checkbox) checkbox.checked = this.configuracoes.altoContraste;
        
        // Anunciar mudança
        const estado = this.configuracoes.altoContraste ? 'ativado' : 'desativado';
        this.anunciarMudanca(`Alto contraste ${estado}`);
    }
    
    obterAltoContraste() {
        return localStorage.getItem('acessibilidade_alto_contraste') === 'true';
    }
    
    // ===========================================
    // NAVEGAÇÃO POR TECLADO - AULA 10
    // ===========================================
    
    configurarNavegacaoTeclado() {
        // Tornar elementos interativos focáveis
        document.querySelectorAll('[onclick]:not(button):not(a)').forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
            }
            
            // Adicionar suporte a Enter e Space
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
        
        // Melhorar indicação de foco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('navegacao-teclado');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('navegacao-teclado');
        });
        
        // Navegação com teclas de seta em listas e grids
        this.configurarNavegacaoSetas();
    }
    
    configurarNavegacaoSetas() {
        const listas = document.querySelectorAll('[role="listbox"], [role="grid"], .product-grid');
        
        listas.forEach(lista => {
            lista.addEventListener('keydown', (e) => {
                const itens = lista.querySelectorAll('[tabindex="0"], [tabindex="-1"]');
                const indiceAtual = Array.from(itens).indexOf(document.activeElement);
                
                let novoIndice;
                
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        novoIndice = Math.min(itens.length - 1, indiceAtual + 1);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        novoIndice = Math.max(0, indiceAtual - 1);
                        break;
                    case 'Home':
                        e.preventDefault();
                        novoIndice = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        novoIndice = itens.length - 1;
                        break;
                }
                
                if (novoIndice !== undefined && itens[novoIndice]) {
                    itens[novoIndice].focus();
                }
            });
        });
    }
    
    // ===========================================
    // VERIFICAÇÃO DE IMAGENS SEM ALT - AULA 10
    // ===========================================
    
    verificarAltEmImagens() {
        const imagensSemAlt = document.querySelectorAll('img:not([alt])');
        
        if (imagensSemAlt.length > 0) {
            console.warn('⚠️ ACESSIBILIDADE: Encontradas imagens sem atributo alt:', imagensSemAlt);
            
            // Adicionar border vermelho em modo de desenvolvimento
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                imagensSemAlt.forEach(img => {
                    img.style.border = '3px solid red';
                    img.title = 'ERRO: Imagem sem atributo alt';
                });
            }
        }
        
        // Verificar imagens com alt vazio inadequado
        const imagensAltVazio = document.querySelectorAll('img[alt=""]');
        imagensAltVazio.forEach(img => {
            // Se não é decorativa, deveria ter alt descritivo
            if (!img.hasAttribute('role') || img.getAttribute('role') !== 'presentation') {
                console.warn('⚠️ ACESSIBILIDADE: Imagem com alt vazio que pode precisar de descrição:', img);
            }
        });
    }
    
    // ===========================================
    // ARIA LABELS E LEITORES DE TELA - AULA 10
    // ===========================================
    
    configurarLeitoresDeTelaAria() {
        // Adicionar ARIA labels a elementos que precisam
        document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(btn => {
            if (!btn.textContent.trim()) {
                console.warn('⚠️ ACESSIBILIDADE: Botão sem texto ou aria-label:', btn);
            }
        });
        
        // Configurar live regions para atualizações dinâmicas
        this.criarLiveRegions();
        
        // Marcar formulários com labels adequados
        this.verificarLabelsFormularios();
    }
    
    criarLiveRegions() {
        if (!document.getElementById('live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }
    }
    
    verificarLabelsFormularios() {
        document.querySelectorAll('input, select, textarea').forEach(campo => {
            const id = campo.id;
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            
            if (!label && !campo.getAttribute('aria-label') && !campo.getAttribute('aria-labelledby')) {
                console.warn('⚠️ ACESSIBILIDADE: Campo de formulário sem label associado:', campo);
            }
        });
    }
    
    // ===========================================
    // LEITURA AUTOMÁTICA COM WEB SPEECH API
    // ===========================================
    
    alternarLeituraAutomatica() {
        this.configuracoes.leituraAutomatica = !this.configuracoes.leituraAutomatica;
        
        const checkbox = document.getElementById('leitura-automatica');
        if (checkbox) checkbox.checked = this.configuracoes.leituraAutomatica;
        
        if (this.configuracoes.leituraAutomatica) {
            this.lerPagina();
        } else {
            this.pararLeitura();
        }
    }
    
    lerPagina() {
        if (!('speechSynthesis' in window)) {
            this.anunciarMudanca('Síntese de voz não suportada neste navegador');
            return;
        }
        
        this.pararLeitura();
        
        // Obter texto principal da página
        const conteudoPrincipal = document.querySelector('main, #main-content, .main-content') || document.body;
        const texto = this.extrairTextoParaLeitura(conteudoPrincipal);
        
        if (texto.trim()) {
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            
            utterance.onstart = () => {
                this.anunciarMudanca('Iniciando leitura da página');
            };
            
            utterance.onend = () => {
                this.anunciarMudanca('Leitura da página concluída');
            };
            
            speechSynthesis.speak(utterance);
        }
    }
    
    extrairTextoParaLeitura(elemento) {
        // Clone o elemento para não afetar o original
        const clone = elemento.cloneNode(true);
        
        // Remover elementos desnecessários
        clone.querySelectorAll('script, style, nav, .sr-only, .accessibility-panel').forEach(el => {
            el.remove();
        });
        
        // Substituir elementos por texto descritivo
        clone.querySelectorAll('img[alt]').forEach(img => {
            const alt = img.getAttribute('alt');
            if (alt) {
                img.outerHTML = ` Imagem: ${alt}. `;
            }
        });
        
        clone.querySelectorAll('a').forEach(link => {
            const texto = link.textContent.trim();
            const href = link.getAttribute('href');
            if (texto) {
                link.outerHTML = ` Link para ${texto}. `;
            }
        });
        
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }
    
    pararLeitura() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
    
    // ===========================================
    // ANÚNCIOS PARA LEITORES DE TELA
    // ===========================================
    
    anunciarMudanca(mensagem) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = mensagem;
            
            // Limpar após anúncio
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }
    
    // ===========================================
    // SALVAR E CARREGAR CONFIGURAÇÕES
    // ===========================================
    
    aplicarConfiguracoesSalvas() {
        // Aplicar tamanho de fonte salvo
        if (this.configuracoes.tamanhoFonte !== 0) {
            this.alterarTamanhoFonte(0); // Isso aplicará o valor salvo
        }
        
        // Aplicar alto contraste salvo
        if (this.configuracoes.altoContraste) {
            document.body.classList.add('high-contrast-mode');
            const checkbox = document.getElementById('alto-contraste');
            if (checkbox) checkbox.checked = true;
        }
    }
    
    resetarConfiguracoes() {
        // Limpar localStorage
        localStorage.removeItem('acessibilidade_tamanho_fonte');
        localStorage.removeItem('acessibilidade_alto_contraste');
        
        // Resetar configurações
        this.configuracoes = {
            tamanhoFonte: 0,
            altoContraste: false,
            navegacaoTeclado: true,
            leituraAutomatica: false
        };
        
        // Aplicar reset visual
        document.documentElement.style.fontSize = '';
        document.body.classList.remove('high-contrast-mode');
        
        // Atualizar controles
        const checkboxContraste = document.getElementById('alto-contraste');
        const checkboxLeitura = document.getElementById('leitura-automatica');
        
        if (checkboxContraste) checkboxContraste.checked = false;
        if (checkboxLeitura) checkboxLeitura.checked = false;
        
        this.pararLeitura();
        this.anunciarMudanca('Configurações de acessibilidade resetadas');
    }
}


// Inicializar acessibilidade
let acessibilidade;

document.addEventListener('DOMContentLoaded', function() {
    acessibilidade = new GerenciadorAcessibilidade();
    
    console.log('✅ Sistema de acessibilidade inicializado conforme Aula 10');
});
