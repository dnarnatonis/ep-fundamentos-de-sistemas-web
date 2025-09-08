/* ============================================
   SISTEMA DE CALENDÁRIO - FASE 2
   BASEADO NA AULA 8 - JAVASCRIPT FUNDAMENTALS
   ============================================ */

class CalendarioAgendamento {
    constructor(elementoId, opcoes = {}) {
        this.elemento = document.getElementById(elementoId);
        this.opcoes = {
            idioma: 'pt-BR',
            horarioMinimo: '08:00',
            horarioMaximo: '18:00',
            intervaloMinutos: 30,
            diasBloqueados: [0], // Domingo = 0
            ...opcoes
        };
        
        this.dataAtual = new Date();
        this.dataSelecionada = null;
        this.horarioSelecionado = null;
        this.mesAtual = this.dataAtual.getMonth();
        this.anoAtual = this.dataAtual.getFullYear();
        
        // Arrays para nomes - usando métodos da Aula 8
        this.nomesMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        this.nomesDias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        // Horários disponíveis para agendamento
        this.horariosDisponiveis = this.gerarHorarios();
        
        if (this.elemento) {
            this.inicializar();
        }
    }
    
    inicializar() {
        this.criarEstrutura();
        this.configurarEventos();
        this.renderizarCalendario();
    }
    
    criarEstrutura() {
        this.elemento.innerHTML = `
            <div class="calendario-container">
                <div class="calendario-header">
                    <button class="btn-nav" id="btn-mes-anterior" aria-label="Mês anterior">‹</button>
                    <h3 class="mes-ano" id="mes-ano"></h3>
                    <button class="btn-nav" id="btn-mes-proximo" aria-label="Próximo mês">›</button>
                </div>
                
                <div class="calendario-grid">
                    <div class="dias-semana">
                        ${this.nomesDias.map(dia => `<div class="dia-semana">${dia}</div>`).join('')}
                    </div>
                    <div class="dias-mes" id="dias-mes"></div>
                </div>
                
                <div class="horarios-container" id="horarios-container" style="display: none;">
                    <h4>Horários Disponíveis</h4>
                    <div class="horarios-grid" id="horarios-grid"></div>
                    <div class="resumo-agendamento" id="resumo-agendamento" style="display: none;">
                        <h5>Resumo do Agendamento</h5>
                        <p><strong>Data:</strong> <span id="data-resumo"></span></p>
                        <p><strong>Horário:</strong> <span id="horario-resumo"></span></p>
                        <button class="btn btn-primary" onclick="confirmarAgendamento()">Confirmar Agendamento</button>
                        <button class="btn btn-secondary" onclick="cancelarAgendamento()">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    configurarEventos() {
        // Navegação entre meses
        document.getElementById('btn-mes-anterior').addEventListener('click', () => {
            this.mesAnterior();
        });
        
        document.getElementById('btn-mes-proximo').addEventListener('click', () => {
            this.proximoMes();
        });
        
        // Navegação por teclado
        this.elemento.addEventListener('keydown', (e) => {
            this.navegarPorTeclado(e);
        });
    }
    
    // Métodos de arrays e estruturas de controle - Aula 8
    gerarHorarios() {
        const horarios = [];
        const [horaMin, minMin] = this.opcoes.horarioMinimo.split(':').map(Number);
        const [horaMax, minMax] = this.opcoes.horarioMaximo.split(':').map(Number);
        
        const minutosInicio = horaMin * 60 + minMin;
        const minutosFim = horaMax * 60 + minMax;
        
        // Loop for para gerar horários - Aula 8
        for (let minutos = minutosInicio; minutos < minutosFim; minutos += this.opcoes.intervaloMinutos) {
            const horas = Math.floor(minutos / 60);
            const mins = minutos % 60;
            const horarioFormatado = `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
            horarios.push(horarioFormatado);
        }
        
        return horarios;
    }
    
    renderizarCalendario() {
        const mesAno = document.getElementById('mes-ano');
        const diasMes = document.getElementById('dias-mes');
        
        // Usar join para criar string - método de array da Aula 8
        mesAno.textContent = `${this.nomesMeses[this.mesAtual]} ${this.anoAtual}`;
        
        // Calcular primeiro dia do mês e quantidade de dias
        const primeiroDia = new Date(this.anoAtual, this.mesAtual, 1).getDay();
        const diasNoMes = new Date(this.anoAtual, this.mesAtual + 1, 0).getDate();
        
        let htmlDias = '';
        
        // Dias vazios do mês anterior
        for (let i = 0; i < primeiroDia; i++) {
            htmlDias += '<div class="dia-vazio"></div>';
        }
        
        // Dias do mês atual - loop for da Aula 8
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const dataCompleta = new Date(this.anoAtual, this.mesAtual, dia);
            const classes = this.obterClassesDia(dataCompleta, dia);
            
            htmlDias += `
                <div class="${classes}" data-dia="${dia}" 
                     ${this.isDiaDisponivel(dataCompleta) ? 'tabindex="0"' : ''}>
                    ${dia}
                </div>
            `;
        }
        
        diasMes.innerHTML = htmlDias;
        
        // Adicionar eventos de clique aos dias disponíveis
        diasMes.querySelectorAll('.dia-disponivel').forEach(diaElement => {
            diaElement.addEventListener('click', (e) => {
                this.selecionarDia(parseInt(e.target.dataset.dia));
            });
        });
    }
    
    obterClassesDia(data, dia) {
        let classes = ['dia'];
        
        // Verificar se é hoje
        const hoje = new Date();
        if (data.toDateString() === hoje.toDateString()) {
            classes.push('dia-hoje');
        }
        
        // Verificar se está no passado
        if (data < hoje.setHours(0, 0, 0, 0)) {
            classes.push('dia-passado');
        }
        // Verificar se é dia bloqueado (domingo, feriados, etc.)
        else if (this.opcoes.diasBloqueados.includes(data.getDay())) {
            classes.push('dia-bloqueado');
        }
        // Dia disponível
        else {
            classes.push('dia-disponivel');
        }
        
        // Verificar se está selecionado
        if (this.dataSelecionada && 
            data.toDateString() === this.dataSelecionada.toDateString()) {
            classes.push('dia-selecionado');
        }
        
        // Usar join para unir classes - método de array da Aula 8
        return classes.join(' ');
    }
    
    isDiaDisponivel(data) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        return data >= hoje && !this.opcoes.diasBloqueados.includes(data.getDay());
    }
    
    selecionarDia(dia) {
        this.dataSelecionada = new Date(this.anoAtual, this.mesAtual, dia);
        
        // Remover seleção anterior
        document.querySelectorAll('.dia-selecionado').forEach(el => {
            el.classList.remove('dia-selecionado');
        });
        
        // Adicionar seleção ao dia clicado
        const diaElement = document.querySelector(`[data-dia="${dia}"]`);
        diaElement.classList.add('dia-selecionado');
        
        // Mostrar horários disponíveis
        this.mostrarHorarios();
    }
    
    mostrarHorarios() {
        const container = document.getElementById('horarios-container');
        const grid = document.getElementById('horarios-grid');
        
        // Filtrar horários ocupados (simulação)
        const horariosOcupados = this.obterHorariosOcupados(this.dataSelecionada);
        const horariosLivres = this.horariosDisponiveis.filter(horario => 
            !horariosOcupados.includes(horario)
        );
        
        // Criar botões de horário usando map - método de array da Aula 8
        const botoesHorarios = horariosLivres.map(horario => `
            <button class="btn-horario" data-horario="${horario}" 
                    onclick="selecionarHorario('${horario}')">
                ${horario}
            </button>
        `).join('');
        
        grid.innerHTML = botoesHorarios;
        container.style.display = 'block';
        
        // Scroll suave para os horários
        container.scrollIntoView({ behavior: 'smooth' });
    }
    
    obterHorariosOcupados(data) {
        // Simulação de horários ocupados
        // Em uma aplicação real, isso viria de uma API
        const horariosOcupados = JSON.parse(
            localStorage.getItem(`agendamentos_${data.toDateString()}`) || '[]'
        );
        
        return horariosOcupados;
    }
    
    selecionarHorario(horario) {
        this.horarioSelecionado = horario;
        
        // Remover seleção anterior
        document.querySelectorAll('.btn-horario.selecionado').forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        // Adicionar seleção ao horário clicado
        document.querySelector(`[data-horario="${horario}"]`).classList.add('selecionado');
        
        // Mostrar resumo
        this.mostrarResumo();
    }
    
    mostrarResumo() {
        const resumo = document.getElementById('resumo-agendamento');
        const dataResumo = document.getElementById('data-resumo');
        const horarioResumo = document.getElementById('horario-resumo');
        
        // Formatar data
        const dataFormatada = this.dataSelecionada.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        dataResumo.textContent = dataFormatada;
        horarioResumo.textContent = this.horarioSelecionado;
        
        resumo.style.display = 'block';
        resumo.scrollIntoView({ behavior: 'smooth' });
    }
    
    confirmarAgendamento() {
        if (!this.dataSelecionada || !this.horarioSelecionado) {
            alert('Por favor, selecione uma data e horário.');
            return;
        }
        
        // Salvar agendamento no localStorage (simulação)
        const agendamento = {
            data: this.dataSelecionada.toDateString(),
            horario: this.horarioSelecionado,
            timestamp: new Date().toISOString()
        };
        
        // Usar método push para adicionar ao array - Aula 8
        const agendamentosExistentes = JSON.parse(
            localStorage.getItem(`agendamentos_${this.dataSelecionada.toDateString()}`) || '[]'
        );
        agendamentosExistentes.push(this.horarioSelecionado);
        
        localStorage.setItem(
            `agendamentos_${this.dataSelecionada.toDateString()}`,
            JSON.stringify(agendamentosExistentes)
        );
        
        // Salvar detalhes do agendamento
        localStorage.setItem('ultimo_agendamento', JSON.stringify(agendamento));
        
        // Mostrar confirmação
        alert(`Agendamento confirmado para ${this.dataSelecionada.toLocaleDateString('pt-BR')} às ${this.horarioSelecionado}!`);
        
        // Resetar seleções
        this.resetar();
    }
    
    cancelarAgendamento() {
        this.resetar();
    }
    
    resetar() {
        this.dataSelecionada = null;
        this.horarioSelecionado = null;
        
        // Esconder containers
        document.getElementById('horarios-container').style.display = 'none';
        document.getElementById('resumo-agendamento').style.display = 'none';
        
        // Remover seleções visuais
        document.querySelectorAll('.dia-selecionado, .btn-horario.selecionado').forEach(el => {
            el.classList.remove('dia-selecionado', 'selecionado');
        });
        
        // Re-renderizar calendário
        this.renderizarCalendario();
    }
    
    mesAnterior() {
        this.mesAtual--;
        if (this.mesAtual < 0) {
            this.mesAtual = 11;
            this.anoAtual--;
        }
        this.renderizarCalendario();
    }
    
    proximoMes() {
        this.mesAtual++;
        if (this.mesAtual > 11) {
            this.mesAtual = 0;
            this.anoAtual++;
        }
        this.renderizarCalendario();
    }
    
    navegarPorTeclado(evento) {
        const diasDisponiveis = this.elemento.querySelectorAll('.dia-disponivel');
        const diaAtivo = document.activeElement;
        
        if (!diaAtivo || !diaAtivo.classList.contains('dia-disponivel')) {
            return;
        }
        
        const indiceAtual = Array.from(diasDisponiveis).indexOf(diaAtivo);
        let novoIndice;
        
        // Estrutura switch da Aula 8
        switch (evento.key) {
            case 'ArrowLeft':
                novoIndice = Math.max(0, indiceAtual - 1);
                break;
            case 'ArrowRight':
                novoIndice = Math.min(diasDisponiveis.length - 1, indiceAtual + 1);
                break;
            case 'ArrowUp':
                novoIndice = Math.max(0, indiceAtual - 7);
                break;
            case 'ArrowDown':
                novoIndice = Math.min(diasDisponiveis.length - 1, indiceAtual + 7);
                break;
            case 'Enter':
            case ' ':
                evento.preventDefault();
                diaAtivo.click();
                return;
            default:
                return;
        }
        
        if (novoIndice !== undefined && diasDisponiveis[novoIndice]) {
            evento.preventDefault();
            diasDisponiveis[novoIndice].focus();
        }
    }
}

// Funções globais para callbacks
function selecionarHorario(horario) {
    if (window.calendario) {
        window.calendario.selecionarHorario(horario);
    }
}

function confirmarAgendamento() {
    if (window.calendario) {
        window.calendario.confirmarAgendamento();
    }
}

function cancelarAgendamento() {
    if (window.calendario) {
        window.calendario.cancelarAgendamento();
    }
}

// CSS para o calendário
function adicionarEstilosCalendario() {
    if (document.getElementById('calendar-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'calendar-styles';
    styles.textContent = `
        .calendario-container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .calendario-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background: linear-gradient(135deg, #2c5530, #4a7c59);
            color: white;
        }
        
        .btn-nav {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .btn-nav:hover {
            background: rgba(255,255,255,0.3);
            transform: scale(1.1);
        }
        
        .mes-ano {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .calendario-grid {
            padding: 20px;
        }
        
        .dias-semana {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-bottom: 15px;
        }
        
        .dia-semana {
            text-align: center;
            font-weight: 600;
            color: #666;
            padding: 10px 0;
            font-size: 0.9rem;
        }
        
        .dias-mes {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
        }
        
        .dia {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            position: relative;
        }
        
        .dia-vazio {
            aspect-ratio: 1;
        }
        
        .dia-disponivel {
            background: #f8f9fa;
            color: #333;
            border: 2px solid transparent;
        }
        
        .dia-disponivel:hover {
            background: #e9ecef;
            transform: scale(1.05);
        }
        
        .dia-disponivel:focus {
            outline: none;
            border-color: #2c5530;
            box-shadow: 0 0 0 3px rgba(44, 85, 48, 0.2);
        }
        
        .dia-hoje {
            background: #2c5530;
            color: white;
        }
        
        .dia-selecionado {
            background: #4a7c59 !important;
            color: white !important;
            transform: scale(1.1);
        }
        
        .dia-passado {
            color: #ccc;
            cursor: not-allowed;
        }
        
        .dia-bloqueado {
            color: #999;
            background: #f5f5f5;
            cursor: not-allowed;
        }
        
        .horarios-container {
            padding: 20px;
            border-top: 1px solid #eee;
            background: #f8f9fa;
        }
        
        .horarios-container h4 {
            margin: 0 0 15px 0;
            color: #2c5530;
            text-align: center;
        }
        
        .horarios-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .btn-horario {
            padding: 10px;
            border: 2px solid #2c5530;
            background: white;
            color: #2c5530;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .btn-horario:hover {
            background: #2c5530;
            color: white;
            transform: translateY(-2px);
        }
        
        .btn-horario.selecionado {
            background: #4a7c59;
            color: white;
            border-color: #4a7c59;
        }
        
        .resumo-agendamento {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 15px;
        }
        
        .resumo-agendamento h5 {
            color: #2c5530;
            margin-bottom: 15px;
        }
        
        .resumo-agendamento p {
            margin: 10px 0;
            font-size: 1.1rem;
        }
        
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin: 0 5px;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .btn-primary {
            background: #2c5530;
            color: white;
        }
        
        .btn-primary:hover {
            background: #4a7c59;
            transform: translateY(-2px);
        }
        
        .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .btn-secondary:hover {
            background: #5a6268;
        }
        
        @media (max-width: 480px) {
            .calendario-container {
                margin: 10px;
            }
            
            .horarios-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .resumo-agendamento {
                padding: 15px;
            }
            
            .btn {
                display: block;
                width: 100%;
                margin: 5px 0;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

// Inicializar calendário quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    adicionarEstilosCalendario();
    
    // Criar calendário se elemento existir
    const calendarioElement = document.getElementById('calendario-agendamento');
    if (calendarioElement) {
        window.calendario = new CalendarioAgendamento('calendario-agendamento', {
            horarioMinimo: '08:00',
            horarioMaximo: '18:00',
            intervaloMinutos: 30,
            diasBloqueados: [0] // Domingo fechado
        });
    }
});
