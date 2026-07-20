// script-labecan-filtro.js - Específico para seu HTML
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuração de verificação por seção
    const configSecoes = {
        'graduandoverificador': {
            nome: 'Graduandos',
            sempreMostrar: true // Sempre mostra graduandos mesmo se alguns estiverem vazios
        },
        'mestrandoverificador': {
            nome: 'Mestrandos',
            sempreMostrar: false
        },
        'doutorandoverificador': {
            nome: 'Doutorandos', 
            sempreMostrar: false
        },
        'colaboradorverificador': {
            nome: 'Colaboradores',
            sempreMostrar: false
        }
    };
    
    // Verifica cada seção
    Object.keys(configSecoes).forEach(id => {
        const config = configSecoes[id];
        const secao = document.getElementById(id);
        
        if (!secao) {
            console.warn(`⚠️ Seção ${config.nome} (${id}) não encontrada`);
            return;
        }
        
        // Se for para sempre mostrar, apenas loga
        if (config.sempreMostrar) {
            console.log(`🎓 ${config.nome}: Sempre visível`);
            return;
        }
        
        // Conta membros válidos
        const cards = secao.querySelectorAll('.membro-card');
        let membrosValidos = 0;
        
        cards.forEach(card => {
            const nome = card.querySelector('.nome-membro');
            const cargo = card.querySelector('.cargo-membro');
            
            // Considera válido se tiver nome ou cargo
            const nomeValido = nome && nome.textContent.trim() && 
                             nome.textContent.trim() !== '...';
            const cargoValido = cargo && cargo.textContent.trim() && 
                              cargo.textContent.trim() !== '...';
            
            if (nomeValido || cargoValido) {
                membrosValidos++;
            }
        });
        
        // Decide se mostra ou oculta
        if (membrosValidos === 0) {
            // Oculta seção
            secao.style.display = 'none';
            
            // Encontra e oculta HRs relacionados
            ocultarHRsRelacionados(secao);
            
            console.log(`🚫 ${config.nome}: OCULTADO (0 membros válidos)`);
        } else {
            console.log(`✅ ${config.nome}: VISÍVEL (${membrosValidos} membro(s) válido(s))`);
        }
    });
    
    // Função para ocultar HRs antes/depois de uma seção oculta
    function ocultarHRsRelacionados(secao) {
        // HR anterior
        let elemento = secao.previousElementSibling;
        while (elemento) {
            if (elemento.tagName === 'HR') {
                elemento.style.display = 'none';
                break;
            }
            elemento = elemento.previousElementSibling;
        }
        
        // HR posterior (próximo)
        elemento = secao.nextElementSibling;
        if (elemento && elemento.tagName === 'HR') {
            elemento.style.display = 'none';
        }
    }
    
    console.log('✨ Filtro de equipe aplicado com sucesso!');
});

// Função para calcular a completude de um card de membro
function calcularCompletude(card) {
    let score = 0;
    
    // Verificar se tem imagem (não placeholder e não quebrada)
    const img = card.querySelector('.foto-membro');
    if (img && img.src && !img.src.includes('placeholder') && !img.src.includes('default')) {
        // Verificar se a imagem não está quebrada (usando atributo alt como proxy)
        if (img.alt && img.alt.trim() !== '') score += 2;
    }
    
    // Verificar se tem nome
    const nome = card.querySelector('.nome-membro');
    if (nome && nome.textContent.trim() !== '') score += 3;
    
    // Verificar se tem cargo
    const cargo = card.querySelector('.cargo-membro');
    if (cargo && cargo.textContent.trim() !== '') score += 2;
    
    // Verificar se tem linha de pesquisa
    const pesquisa = card.querySelector('.linha-pesquisa');
    if (pesquisa && pesquisa.textContent.trim() !== '' && pesquisa.textContent.trim() !== '...') score += 2;
    
    return score;
}

// Função para ordenar cards em uma categoria
function ordenarCategoria(categoria) {
    const container = categoria.querySelector('.membros-container');
    if (!container) return;
    
    const cards = Array.from(container.querySelectorAll('.membro-card'));
    
    // Ordenar cards por completude (decrescente)
    cards.sort((a, b) => {
        const scoreA = calcularCompletude(a);
        const scoreB = calcularCompletude(b);
        return scoreB - scoreA; // Ordem decrescente
    });
    
    // Remover todos os cards do container
    cards.forEach(card => card.remove());
    
    // Adicionar cards ordenados de volta ao container
    cards.forEach(card => container.appendChild(card));
}

// Função principal para ordenar todas as categorias
function ordenarTodasCategorias() {
    // Selecionar todas as categorias
    const categorias = document.querySelectorAll('.categoria-equipe');
    
    categorias.forEach(categoria => {
        // Pular a categoria do professor (se necessário)
        const professorDestaque = categoria.querySelector('.professor-destaque');
        if (professorDestaque) {
            // Se quiser ordenar inclusive o professor, remova este if
            return;
        }
        
        ordenarCategoria(categoria);
    });
}

// Versão alternativa: ordenar categorias específicas por ID
function ordenarCategoriasEspecificas() {
    const categoriasIds = [
        'graduandoverificador',
        'mestrandoverificador', 
        'doutorandoverificador',
        'colaboradorverificador'
    ];
    
    categoriasIds.forEach(id => {
        const categoria = document.getElementById(id);
        if (categoria) {
            ordenarCategoria(categoria);
        }
    });
}

// Executar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Opção 1: Ordenar todas as categorias
    ordenarTodasCategorias();
    
    // Opção 2: Ordenar apenas categorias específicas (descomente a linha abaixo)
    // ordenarCategoriasEspecificas();
    
    console.log('Membros ordenados por completude dentro de cada categoria!');
});

// Função adicional: Destacar cards baseado na completude (opcional)
function destacarPorCompletude() {
    const todosCards = document.querySelectorAll('.membro-card');
    
    todosCards.forEach(card => {
        const score = calcularCompletude(card);
        
        // Remover classes anteriores (se houver)
        card.classList.remove('alta-completude', 'media-completude', 'baixa-completude');
        
        // Adicionar classe baseada no score
        if (score >= 7) {
            card.classList.add('alta-completude');
        } else if (score >= 4) {
            card.classList.add('media-completude');
        } else {
            card.classList.add('baixa-completude');
        }
        
        // Adicionar tooltip com o score (opcional)
        card.title = `Completude: ${score}/9 pontos`;
    });
}

// CSS opcional para destacar os cards
const estiloDestaque = `
    .alta-completude {
        border-left: 4px solid #4CAF50;
    }
    
    .media-completude {
        border-left: 4px solid #FFC107;
    }
    
    .baixa-completude {
        border-left: 4px solid #F44336;
        opacity: 0.8;
    }
    
    .membro-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .membro-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
`;

// Adicionar CSS de destaque (opcional)
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilos
    const style = document.createElement('style');
    style.textContent = estiloDestaque;
    document.head.appendChild(style);
    
    // Destacar cards por completude (opcional - descomente se quiser)
    // destacarPorCompletude();
});