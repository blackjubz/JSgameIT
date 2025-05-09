// GET-ID
georgie = document.getElementById("georgie"); // Imagem georgie
fundo = document.getElementById("fundo"); // imagem de fundo da tela
// pega a div balões para enchela com balões
baloes = document.getElementById("baloes");
// FIM GET-ID

// VARIAVEIS
qtdinimigo = 50; //Quantidade de Inimigos
end = false; // Controla se o jogo acabou
a = false, d = false, w = false, s = false; //direções - controle do personagem
georgieX = 360; // eixo x do georgie
georgieY = 500; // eixo y do georgie
georgieVeloz = 3; // velocidade de andar do georgie
imunidade = false; //Variavel que controla se georgie toma dano ou não
georgieparado = true; //Variavel para controle do georgie se esta parado
vida = 3; // vidas do georgie
//FIM VARIAVEIS

//MUSICAS
MusicaInicial = new Audio("msc/inicial.mp3");
MusicaMeio = new Audio("msc/meio.mp3");
MusicaFinal = new Audio("msc/final.mp3");
MusicaGameOver = new Audio("msc/gameover.mp3");
MusicaGameOver2 = new Audio("msc/gameover2.mp3");
// FIM MUSICAS

//  Iniciar();

function Iniciar() {
    //Deixa o login Invisivel e faz Aparecer o fundo de jogo
    document.getElementById("jogo").style.display = "block";
    document.getElementById("log").style.display = "none";

    //Posiciona o Georgie
    georgie.style.marginLeft = georgieX + "px";
    georgie.style.marginTop = georgieY + "px";

    //Cria os Balões
    criabaloes();

    //Posiciona os Balões
    PosicionaBaloes();

    //Começa a musica
    MusicaInicial.play();

    //Introdução do PennyWise
    Introducao();


}

function jogo() {
    andainimigo();
    andageorgie();
    colisao();
    controleMusica();
    gameOver();
    document.getElementById("coracao").innerHTML = vida;
}


function Introducao() {


    // Gif do Pennywise
    penny = document.getElementById("pennywise");

    // Faz o gif aparecer caso esteja invisivel
    penny.style.display == "block";


    // Tira a Gif depois que acaba a introdução
    somepenny = setTimeout(() => {
        penny.style.display = "none";

        // Começa atualizar o jogo
        f5 = setInterval(jogo, 1000 / 60);
    }, 17500);

}

function gameOver() {
    if (vida == 0 && !end) { // verifica se acabou as vidas e se ja é o final do jogo
        end = true; // final do jogo como true
        fundo.src = "img/gameover.gif";
        georgie.style.display = "none";
        baloes.style.display = "none";
        fim = setTimeout(() => { // depois de o georgie morrer, aparece a cena de game over
            fundo.src = "img/GameOverFinal.jpeg"; // cena de game Over
            MusicaGameOver2.pause(); // Para a Musica
            acabou = setTimeout(() => {
                reinicia();
                clearTimeout(acabou);
            }, 5000);
        }, 8900);
        clearInterval(f5); // termina as atualizações do jogo


    }
}

function reinicia() {
    vida = 3;
    fundo.src = "img/giphy.gif";

    //faz o Georgie aparecer caso esteja invisivel
    georgie.style.display = "inline";

    //Mostra os Balões caso esteja invisivel
    baloes.style.display = "inline";



    end = false;

    // Posição Inicial do Georgie
    georgieX = 360; // eixo x do georgie
    georgieY = 500; // eixo y do georgie

    //Deixa o login Invisivel e faz Aparecer o fundo de jogo
    document.getElementById("jogo").style.display = "none";
    document.getElementById("log").style.display = "block";



}

function controleMusica() {
    // as Musicas Mudam de acordo com a quantidade de vidas
    switch (vida) {
        case 3:
            MusicaInicial.play();
            break;
        case 2:
            MusicaInicial.pause();
            MusicaMeio.play();
            break;
        case 1:
            MusicaInicial.pause();
            MusicaMeio.pause();
            MusicaFinal.play();
            break
        case 0:
            MusicaInicial.pause();
            MusicaMeio.pause();
            MusicaFinal.pause();
            MusicaGameOver2.play();
            break;
    }
}

function colisao() {
    // pega a localização e diametro do personagem
    georgieX2 = georgieX + 50;
    georgieY2 = georgieY + 100;

    // for para a localização e diametro de cada balão e comparar com o do personagem
    for (ct = 1; ct <= qtdinimigo; ct++) {
        // pega os balões
        ballon = document.getElementById("ballon" + ct);
        //localização e diametro do balão
        inimigoX1 = parseInt(ballon.style.marginLeft.replace("px", "")); //conversão para int e replace para tirar o px 
        inimigoX2 = inimigoX1 + 50;
        inimigoY1 = parseInt(ballon.style.marginTop.replace("px", "")); //conversão para int e replace para tirar o px 
        inimigoY2 = inimigoY1 + 100;

        //verifica se ouve uma colissão 
        if (georgieX >= inimigoX1 && georgieX <= inimigoX2 && georgieY >= inimigoY1 && georgieY <= inimigoY2 || georgieX2 >= inimigoX1 && georgieX2 <= inimigoX2 && georgieY2 >= inimigoY1 && georgieY2 <= inimigoY2) {
            // se não estiver imune perde uma vida
            if (!imunidade) {
                imunidade = true; // fica imune
                vida--; // perde a vida
                georgie.src = "img/georgieapanhou.gif"; //gif sinalizando imunidade
                //console.log(vida);// printa a vida

                // faz o periodo de imunidade acabar depois de X segundos
                intervalo = setTimeout(() => {
                    imunidade = false; // tira a imunidade
                    georgie.src = "img/georgie1.png" // georgie img parado
                    georgieparado = true; // georgie esta parado 
                    clearTimeout(intervalo); // limpa o timeout
                }, 3000);
            }
        }
    }

}

function andageorgie() {

    // se a for true o eixo X diminui, e o georgie vai para esquerda 
    georgieX = a ? (georgieX >= 0 ? georgieX -= georgieVeloz : georgieX) : georgieX;

    // se d for true o eixo X aumenta, e o georgie vai para direita
    georgieX = d ? (georgieX <= 750 ? georgieX += georgieVeloz : georgieX) : georgieX;

    // se w for true o eixo Y diminui, e o georgie vai para cima
    georgieY = w ? (georgieY >= 0 ? georgieY -= georgieVeloz : georgieY) : georgieY;

    // se s for true o eixo Y aumenta, e o georgie vai para baixo
    georgieY = s ? (georgieY <= 495 ? georgieY += georgieVeloz : georgieY) : georgieY;

    georgie.style.marginLeft = georgieX + "px"; //usa o eixoX para mudar em px a posição do Georgie
    georgie.style.marginTop = georgieY + "px"; //usa o eixoY para mudar em px a posição do Georgie

    // se as teclas não tiverem sendo precionadas georgie para de se mexer
    if (!w && !s && !a && !d) {
        // se o georgie não estiver parado ele fica parado trocando a imagem da gif se mexendo por uma imagem do georgie parado
        if (!georgieparado) { // if para n ficar toda hora deixando georgie parado caso ele ja esteja parado
            georgie.src = "img/georgie1.png"; // imagem do georgie parado
        }
        georgieparado = true; // agora ele ta parado
    }
}

function andainimigo() {

    for (ct = 1; ct <= qtdinimigo; ct++) {
        ballon = document.getElementById("ballon" + ct);
        local = ballon.style.marginTop.replace("px", ""); // força a recupeçãp do local em int
        if (local < 497) {
            local++;
            ballon.style.marginTop = local + "px";
        } else {
            //gera uma posição no eixo X para cada balão
            pos = 751; // 751 para entrar no while e so sair dele quando for menor que 750
            while (pos > 750) { // 750 limite maximo da tela
                pos = Math.floor(Math.random() * 1000); // gera um numero inteiro aleatorio de 0 a 1000
            }
            ballon.style.marginLeft = pos + "px"; //  0 =>  750 LIMITE TELA
            ballon.style.marginTop = (-Math.floor(Math.random() * 1000) - 100) + "px";
        }
    }
    // console.log(ballon.style.marginTop)
}

function gifGeorgie() { //gif quando o georgie andar
    if (!imunidade) { // só se ele n estiver imune 
        if (w || s || a || d) { //se uma das teclas forem igual a true o georgie troca pela gif dele andando  
            if (georgieparado) { // se o georgie ja estiver andando não precisa mudar a src
                georgie.src = "img/georgieMV.gif"; // gif georgie andando
            }
            georgieparado = false; // para n deixar a gif geogie andando em um loop
        }
    }
}

function criabaloes() {
    // Se não tiver criado os balões, ele cria 
    if (!document.getElementById("ballon2")) {

        //deixa o balão visivel de novo, depois do pennywise
        document.getElementById("ballon1").style.display = "inline";


        // criando um elemento html
        cloneB = document.createElement("b");
        cloneB.innerHTML = baloes.innerHTML;

        //for para criar os clones
        for (ct1 = 1; ct1 < qtdinimigo; ct1++) {
            cloneB.innerHTML = cloneB.innerHTML.replace("ballon" + ct1, "ballon" + (ct1 + 1)); //substituição
            baloes.innerHTML += cloneB.innerHTML // cria na home os clones (elemento filho de um elemento pai)
        }
    }

}

function PosicionaBaloes() {

    // for para realocar cada balão
    for (ct2 = 1; ct2 <= qtdinimigo; ct2++) {
        // pega a imagem dos balões
        ballon = document.getElementById("ballon" + ct2);

        //gera uma posição no eixo X para cada balão
        pos = 751; // 751 para entrar no while e so sair dele quando for menor que 750
        while (pos > 750) { // 750 limite maximo da tela
            pos = Math.floor(Math.random() * 1000); // gera um numero inteiro aleatorio de 0 a 1000
        }

        //Alinha os balões no eixo X e o eixo Y
        ballon.style.marginLeft = pos + "px"; //  0 =>  750 LIMITE TELA

        //Gera um valor que manda os balões para cima para cair logo depois quando o jogo começar
        ballon.style.marginTop = (-Math.floor(Math.random() * 1000) - 100) + "px";
    }

}
// pega as teclas quando precionadas, e tornando as variaveis de controle true
document.addEventListener("keydown", () => {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 32: // Espaço
            reinicia();
            Iniciar();
            break;

        case 87: // W
        case 38: // Seta para cima
            w = true;
            gifGeorgie();
            break;

        case 83: // S
        case 40: // Seta para baixo
            s = true;
            gifGeorgie();
            break;

        case 65: // A
        case 37: // Sera para Esquerda
            a = true;
            gifGeorgie();
            break;

        case 68: // D
        case 39: // Seta para Direita
            d = true;
            gifGeorgie();
            break;

    }
});

// pega as teclas quando forem soltas, tornando as variaveis de controle false 
document.addEventListener("keyup", () => {

    switch (event.keyCode) {

        case 87: // W
        case 38: // Seta para cima
            w = false;
            break;

        case 83: // S
        case 40: // Seta para baixo
            s = false;
            break;

        case 65: // A
        case 37: // Sera para Esquerda
            a = false;
            break;

        case 68: // D
        case 39: // Seta para Direita
            d = false;
            break;

    }
});