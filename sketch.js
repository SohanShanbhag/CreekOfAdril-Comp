var canvas;
var startImg, GroundImg;
var database, playerCount, waitCount;
var logo, logoImg, startPlayer1, startPlayer2, player1Ani, player2Ani, groundImg, groundImgBack;
var form, game, player;
var allPlayers;
var gameState=0;
var player1, player2, players, invisi, coin, coinAni;

function preload(){
  startImg = loadImage("images/startImg.png");
  logoImg = loadImage("images/Logo2.png");
  player1Ani = loadAnimation("images/Player1ImgA.png","images/Player1ImgB.png","images/Player1ImgC.png");
  player2Ani = loadAnimation("images/Player2ImgA.png","images/Player2ImgB.png","images/Player2ImgC.png");
  groundImg = loadImage("images/GroundImg2.png");
  floorImg = loadImage("images/FloorImg.png");
  startImg2 = loadImage("images/startImg2.png");
  coinAni = loadAnimation("images/CoinA.png", "images/CoinB.png");
  groundImgBack = loadImage("images/GroundImg.png")
}

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);

  database = firebase.database();

  logo = createSprite(displayWidth/2, displayHeight - 800);
  logo.addImage(logoImg);
  logo.scale = 0.4;

  startPlayer1 = createSprite(displayWidth/2 - 500, displayHeight - 700);
  startPlayer1.addAnimation("Player1", player1Ani);

  startPlayer2 = createSprite(displayWidth/2 + 500, displayHeight - 700);
  startPlayer2.addAnimation("Player2", player2Ani)

  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  background(startImg);

  logo.display();
  startPlayer1.display();
  startPlayer2.display();

  //showMobileControls(true, true, true, false); 

  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === 1){
    game.play()
  }
}