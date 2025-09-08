/* ============================================
   SISTEMA DE FORMULÁRIOS
   VALIDAÇÃO E MÁSCARAS DE ENTRADA
   ============================================ */

// Classe para validação de formulários

class ValidadorFormularios {
    constructor() {
        this.regexPatterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            telefone: /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/,
            cpf: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/,
            cep: /^\d{5}-?\d{3}$/
        };
        
        this.mensagensErro = {
            required: 'Este campo é obrigatório',
            email: 'Por favor, insira um e-mail válido',
            telefone: 'Por favor, insira um telefone válido (ex: (11) 99999-9999)',
            cpf: 'Por favor, insira um CPF válido',
            cep: 'Por favor, insira um CEP válido (ex: 12345-678)',
            minLength: 'Este campo deve ter pelo menos {min} caracteres',
            maxLength: 'Este campo deve ter no máximo {max} caracteres',
            pattern: 'Por favor, insira um valor válido'
        };
        
        this.inicializar();
    }
    
    inicializar() {
        document.addEventListener('DOMContentLoaded', () => {
            this.configurarFormularios();
            this.adicionarMascaras();
        });
    }
    
    configurarFormularios() {
        const formularios = document.querySelectorAll('form');
        
        formularios.forEach(form => {
            // Desabilitar validação nativa do browser
            form.setAttribute('novalidate', 'true');
            
            // Configurar validação em tempo real
            const campos = form.querySelectorAll('input, select, textarea');
            campos.forEach(campo => {
                // Validar quando sair do campo
                campo.addEventListener('blur', (e) => {
                    this.validarCampo(e.target);
                });
                
                // Validar durante digitação com delay
                let timeoutId;
                campo.addEventListener('input', (e) => {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        this.validarCampo(e.target);
                    }, 500);
                });
            });
            
            // Evento de submit
            form.addEventListener('submit', (e) => {
                this.validarFormulario(e);
            });
        });
    }
    
    validarCampo(campo) {
        this.limparErros(campo);
        
        const valor = campo.value.trim();
        const tipo = campo.type;
        const required = campo.hasAttribute('required');
        
        // Campos obrigatórios vazios
        if (required && !valor) {
            this.mostrarErro(campo, this.mensagensErro.required);
            return false;
        }
        
        // Pular validação em campos opcionais vazios
        if (!required && !valor) {
            return true;
        }
        
        // Validação por tipo de campo
        switch (tipo) {
            case 'email':
                return this.validarEmail(campo, valor);
            case 'tel':
                return this.validarTelefone(campo, valor);
            case 'text':
                if (campo.name === 'cpf' || campo.id === 'cpf') {
                    return this.validarCPF(campo, valor);
                }
                if (campo.name === 'cep' || campo.id === 'cep') {
                    return this.validarCEP(campo, valor);
                }
                break;
        }
        
        // Verificar tamanho do texto
        return this.validarComprimento(campo, valor);
    }
    
    validarEmail(campo, valor) {
        if (!this.regexPatterns.email.test(valor)) {
            this.mostrarErro(campo, this.mensagensErro.email);
            return false;
        }
        this.mostrarSucesso(campo);
        return true;
    }
    
    validarTelefone(campo, valor) {
        const telefone = valor.replace(/\D/g, '');
        if (telefone.length < 10 || telefone.length > 11) {
            this.mostrarErro(campo, this.mensagensErro.telefone);
            return false;
        }
        this.mostrarSucesso(campo);
        return true;
    }
    
    validarCPF(campo, valor) {
        const cpf = valor.replace(/\D/g, '');
        
        if (cpf.length !== 11 || !this.validarDigitosCPF(cpf)) {
            this.mostrarErro(campo, this.mensagensErro.cpf);
            return false;
        }
        
        this.mostrarSucesso(campo);
        return true;
    }
    
    validarDigitosCPF(cpf) {
        // CPF com todos os dígitos iguais é inválido
        if (/^(\d)\1{10}$/.test(cpf)) return false;
        
        // Primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digito1 = 11 - (soma % 11);
        if (digito1 > 9) digito1 = 0;
        
        if (parseInt(cpf.charAt(9)) !== digito1) return false;
        
        // Segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digito2 = 11 - (soma % 11);
        if (digito2 > 9) digito2 = 0;
        
        return parseInt(cpf.charAt(10)) === digito2;
    }
    
    validarCEP(campo, valor) {
        const cep = valor.replace(/\D/g, '');
        if (cep.length !== 8) {
            this.mostrarErro(campo, this.mensagensErro.cep);
            return false;
        }
        
        // Buscar endereço automaticamente
        this.buscarEnderecoPorCEP(cep, campo);
        this.mostrarSucesso(campo);
        return true;
    }
    
    validarComprimento(campo, valor) {
        const min = campo.getAttribute('minlength');
        const max = campo.getAttribute('maxlength');
        
        if (min && valor.length < parseInt(min)) {
            const msg = this.mensagensErro.minLength.replace('{min}', min);
            this.mostrarErro(campo, msg);
            return false;
        }
        
        if (max && valor.length > parseInt(max)) {
            const msg = this.mensagensErro.maxLength.replace('{max}', max);
            this.mostrarErro(campo, msg);
            return false;
        }
        
        this.mostrarSucesso(campo);
        return true;
    }
    
    mostrarErro(campo, mensagem) {
        campo.classList.add('is-invalid');
        campo.classList.remove('is-valid');
        
        let divErro = campo.parentNode.querySelector('.invalid-feedback');
        if (!divErro) {
            divErro = document.createElement('div');
            divErro.className = 'invalid-feedback';
            campo.parentNode.appendChild(divErro);
        }
        
        divErro.textContent = mensagem;
        divErro.style.display = 'block';
    }
    
    mostrarSucesso(campo) {
        campo.classList.add('is-valid');
        campo.classList.remove('is-invalid');
        
        const divErro = campo.parentNode.querySelector('.invalid-feedback');
        if (divErro) {
            divErro.style.display = 'none';
        }
    }
    
    limparErros(campo) {
        campo.classList.remove('is-invalid', 'is-valid');
        const divErro = campo.parentNode.querySelector('.invalid-feedback');
        if (divErro) {
            divErro.style.display = 'none';
        }
    }
    
    validarFormulario(evento) {
        const form = evento.target;
        const campos = form.querySelectorAll('input, select, textarea');
        let formularioValido = true;
        
        // Verificar cada campo do formulário
        campos.forEach(campo => {
            if (!this.validarCampo(campo)) {
                formularioValido = false;
            }
        });
        
        // Validações customizadas
        if (form.id === 'form-cadastro') {
            if (!this.validarTermosAceitos(form)) {
                formularioValido = false;
            }
        }
        
        if (!formularioValido) {
            evento.preventDefault();
            this.focarPrimeiroErro(form);
            this.mostrarMensagemGeral('Por favor, corrija os erros indicados antes de continuar.', 'error');
        } else {
            // Enviar dados
            this.processarEnvio(form, evento);
        }
    }
    
    validarTermosAceitos(form) {
        const checkbox = form.querySelector('input[name="termos"]');
        if (checkbox && !checkbox.checked) {
            this.mostrarErro(checkbox, 'Você deve aceitar os termos para continuar');
            return false;
        }
        return true;
    }
    
    focarPrimeiroErro(form) {
        const primeiroErro = form.querySelector('.is-invalid');
        if (primeiroErro) {
            primeiroErro.focus();
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    mostrarMensagemGeral(mensagem, tipo = 'info') {
        const alerta = document.createElement('div');
        alerta.className = `alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show`;
        alerta.innerHTML = `
            ${mensagem}
            <button type="button" class="btn-close" aria-label="Fechar"></button>
        `;
        
        // Mostrar no topo
        document.body.insertBefore(alerta, document.body.firstChild);
        
        // Remover automaticamente
        setTimeout(() => {
            alerta.remove();
        }, 5000);
        
        // Botão de fechar
        alerta.querySelector('.btn-close').addEventListener('click', () => {
            alerta.remove();
        });
    }
    
    processarEnvio(form, evento) {
        evento.preventDefault();
        
        // Simular envio para servidor
        const btnSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.textContent;
        
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Processando...';
        
        // Extrair dados dos campos
        const formData = new FormData(form);
        const dados = Object.fromEntries(formData.entries());
        
        // Simular delay de rede
        setTimeout(() => {
            console.log('Dados do formulário:', dados);
            
            // Armazenar dados localmente
            localStorage.setItem(`dados_${form.id}`, JSON.stringify(dados));
            
            btnSubmit.disabled = false;
            btnSubmit.textContent = textoOriginal;
            
            this.mostrarMensagemGeral('Formulário enviado com sucesso!', 'success');
            
            // Reset do formulário
            if (form.dataset.clearOnSuccess !== 'false') {
                form.reset();
                this.limparTodosErros(form);
            }
        }, 2000);
    }
    
    limparTodosErros(form) {
        const campos = form.querySelectorAll('input, select, textarea');
        campos.forEach(campo => this.limparErros(campo));
    }
    
    // Sistema de máscaras para campos
    
    adicionarMascaras() {
        // Formatação de CPF
        document.querySelectorAll('input[name="cpf"], input[id="cpf"]').forEach(campo => {
            campo.addEventListener('input', (e) => {
                e.target.value = this.formatarCPF(e.target.value);
            });
        });
        
        // Formatação de telefone
        document.querySelectorAll('input[type="tel"]').forEach(campo => {
            campo.addEventListener('input', (e) => {
                e.target.value = this.formatarTelefone(e.target.value);
            });
        });
        
        // Formatação de CEP
        document.querySelectorAll('input[name="cep"], input[id="cep"]').forEach(campo => {
            campo.addEventListener('input', (e) => {
                e.target.value = this.formatarCEP(e.target.value);
            });
        });
    }
    
    formatarCPF(valor) {
        const numeros = valor.replace(/\D/g, '');
        return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    
    formatarTelefone(valor) {
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length <= 10) {
            return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    }
    
    formatarCEP(valor) {
        const numeros = valor.replace(/\D/g, '');
        return numeros.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    
    // Integração com API de CEP
    
    async buscarEnderecoPorCEP(cep, campoCep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const dados = await response.json();
            
            if (!dados.erro) {
                this.preencherEndereco(dados, campoCep);
            }
        } catch (error) {
            console.log('Erro ao buscar CEP:', error);
        }
    }
    
    preencherEndereco(dados, campoCep) {
        const form = campoCep.closest('form');
        if (!form) return;
        
        // Campos correspondentes
        const mapeamento = {
            logradouro: ['rua', 'endereco', 'logradouro'],
            bairro: ['bairro'],
            localidade: ['cidade', 'localidade'],
            uf: ['estado', 'uf']
        };
        
        Object.keys(mapeamento).forEach(chaveDados => {
            const valor = dados[chaveDados];
            if (valor) {
                mapeamento[chaveDados].forEach(nomeCampo => {
                    const campo = form.querySelector(`[name="${nomeCampo}"], [id="${nomeCampo}"]`);
                    if (campo && !campo.value) {
                        campo.value = valor;
                        this.validarCampo(campo);
                    }
                });
            }
        });
    }
}

// Ativar sistema de validação
const validador = new ValidadorFormularios();

// Estilos para feedback visual
function adicionarEstilosValidacao() {
    if (document.getElementById('validation-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'validation-styles';
    styles.textContent = `
        .is-valid {
            border-color: var(--primary-color) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='m2.3 6.73.8-.8-.8-.8 1.2-1.2.8.8L7.7 1.33 9 2.7l-5.4 5.37-1.3-1.34z'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
            padding-right: 40px;
        }
        
        .is-invalid {
            border-color: var(--danger-color) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath d='m5.8 4.6 2.4 2.4M8.2 4.6l-2.4 2.4'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 12px center;
            background-size: 16px;
            padding-right: 40px;
        }
        
        .invalid-feedback {
            display: none;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875rem;
            color: var(--danger-color);
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .alert {
            padding: 0.75rem 1.25rem;
            margin-bottom: 1rem;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            position: relative;
        }
        
        .alert-danger {
            color: var(--danger-color);
            background-color: var(--light-color);
            border-color: var(--border-color);
        }
        
        .alert-success {
            color: var(--primary-color);
            background-color: var(--light-color);
            border-color: var(--border-color);
        }
        
        .btn-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            font-size: 1.25rem;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(styles);
}

// Aplicar estilos automaticamente
document.addEventListener('DOMContentLoaded', adicionarEstilosValidacao);
