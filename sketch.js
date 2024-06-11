 //variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete =150;
let raqueteComprimento = 14;
let raqueteAltura = 98;

//variáveis do oponente
let xRaqueteOponente = 581;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let Raquetada;
let ponto;
let Bonk;
let trilha;

let pausado = false
let pausaTempo =3000
let pausaInicio = 0
let imagem;

function preload() {
  trilha = loadSound("trilha.wav");
  ponto = loadSound("ponto.mp3");
  Raquetada = loadSound("Raquetada.mp3")
  Bonk = loadSound("Bonk.mp3")
  imagem = loadImage("imagem.png");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  cor = "purple"
  cor2 = "#EBD505"
  cor3 = "#32E699"
  cor4 = "#AB29F0"
  stroke("purple");
  strokeWeight(3);
}

function draw() {
  background(imagem);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  fill("magenta");
  circle(xBolinha, yBolinha , diametro);
  fill(cor2);
}

function movimentaBolinha(){
if (pausado){
  if (millis() - pausaInicio >= pausaTempo){
pausado = false
 } else {
 return
 }
}
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
if (xBolinha + raio > width ||
  xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
 }
 if(yBolinha + raio > height || 
yBolinha - raio < 0){
   velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
  fill(cor3);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  Raquetada.play();
  }
}

function verificaColisaoRaquete(x,y) {
  colidiu= collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
  Raquetada.play();
  }
}

function movimentaRaqueteOponente() {
   if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluiPlacar(){
  textAlign(CENTER);
  textSize(26);
  fill ("cyan")
  rect(30, 17, 40, 27);
  fill("#3529F0");
  text(meusPontos, 50, 40);
  fill("cyan");
  rect(530,17, 40, 27);
  fill("red");
  text(pontosDoOponente, 550, 40);
  fill ("magenta")
  text ("meus pontos", 150, 35);
  textFont('Bodoni');
  fill("yellow");
  text ("pontos oponente", 435, 35);
  textFont('Bodoni');
}

function  marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
  ponto.play();
  xBolinha = 300
  yBolinha = 200
  pausado = true
  pausaInicio = millis()
 }
  if (xBolinha < 10){
    pontosDoOponente += 1;
  Bonk.play();
  xBolinha = 300
  yBolinha = 200
  pausado = true
  pausaInicio = millis()
 }
}
