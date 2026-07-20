// Obtém o elemento do header
const header = document.getElementById('header');
// Define a quantidade de pixels para rolar antes de mudar o header
const scrollThreshold = 50; 

window.addEventListener('scroll', () => {
    // Verifica a posição atual da rolagem vertical
    if (window.scrollY > scrollThreshold) {
        // Se rolou mais do que o limite, adiciona a classe 'scrolled'
        header.classList.add('scrolled');
    } else {
        // Caso contrário, remove a classe 'scrolled'
        header.classList.remove('scrolled');
    }
});

// rolar para contato
function rolarParaDivInicio() {
    var div = document.getElementById("conteudo1");
    div.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a div
}


// rolar para contato
function rolarParaDivContato() {
    var div = document.getElementById("contato");
    div.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a div
}

// rolar para conteudo2
function rolarParaDivSobre() {
    var div = document.getElementById("conteudo2");
    div.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a div
}

// rolar para conteudo3
function rolarParaDivProjetos() {
    var div = document.getElementById("conteudo3");
    div.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a div
}




// Elementos que vamos usar
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicadores = document.querySelectorAll('.indicador');
    
    // Controle de qual slide está visível
    let slideAtual = 0;
    const totalSlides = slides.length;
    
    // Função para ir para um slide específico
    function irParaSlide(n) {
        // Não deixar passar dos limites
        if (n >= totalSlides) slideAtual = 0;
        else if (n < 0) slideAtual = totalSlides - 1;
        else slideAtual = n;
        
        // Mover o carrossel
        carrossel.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        // Atualizar indicadores
        atualizarIndicadores();
    }
    
    // Função para atualizar os pontinhos
    function atualizarIndicadores() {
        indicadores.forEach((ind, index) => {
            if (index === slideAtual) {
                ind.classList.add('ativo');
            } else {
                ind.classList.remove('ativo');
            }
        });
    }
    
    // Próximo slide
    function proximoSlide() {
        irParaSlide(slideAtual + 1);
    }
    
    // Slide anterior
    function slideAnterior() {
        irParaSlide(slideAtual - 1);
    }
    
    // Event Listeners (cliques nos botões)
    nextBtn.addEventListener('click', proximoSlide);
    prevBtn.addEventListener('click', slideAnterior);
    
    // Cliques nos indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener('click', () => {
            irParaSlide(index);
        });
    });
    
    // Opcional: Passar automático a cada 5 segundos
    setInterval(proximoSlide, 5000);
