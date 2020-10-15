//Variables - Main, images and animations, sprites, states, groups, music;
var canvas, database, game, player, form;
var playerCount, allPlayers;
var logo, player1, player2, startPlayer1, startPlayer2, startMonster, startFly, flyingLand, flyingMonster, monster, coin, coin2, invisi, castle;
var monsterGroup, flyingMonsterGroup, flyingLandGroup, coinGroup, bulletGroup1, bulletGroup2;
var gameState = 0, players;
var logoImg, player1Ani, player2Ani, groundImg, trackImg, coinAni, flyingMonsterAni, flyingLandImg, startMonsterAni, castleImg, fireBall, overImg;
var bullet, bullet2;
var introMusic, jumpSound, loseSound, coinSound, winSound, hitSound, landSound;

var player1Score = 0;
var player2Score = 0;

function preload(){
  startImg = loadImage("images/startImg.png");
  logoImg = loadImage("images/Logo2.png");
  player1Ani = loadAnimation("images/Player1ImgA.png","images/Player1ImgB.png","images/Player1ImgC.png");
  player2Ani = loadAnimation("images/Player2ImgA.png","images/Player2ImgB.png","images/Player2ImgC.png");
  groundImg = loadImage("images/GroundImg2.png");
  trackImg = loadImage("images/track.jpg");
  floorImg = loadImage("images/FloorImg.png");
  coinAni = loadAnimation("images/CoinA.png", "images/CoinB.png");
  groundImgBack = loadImage("images/GroundImg.png");
  coinAni = loadAnimation("images/CoinA.png", "images/CoinB.png");
  flyingLandImg = loadImage("images/FlyingLand.png");
  startMonsterAni = loadAnimation("images/Monster1.png", "images/Monster2.png");
  flyingMonsterAni = loadAnimation("images/FlyingMonster1.png", "images/FlyingMonster2.png");
  startMonsterAni2 = loadAnimation("images/StartMonster1.png", "images/StartMonster2.png");
  castleImg = loadImage("images/Castle.png");
  fireBall = loadImage("images/FireBall.png");
  overImg = loadImage("images/GameOver.jpg")

  introMusic = loadSound("Music/IntroMusic.mp3");
  jumpSound = loadSound("Music/Jump.mp3");
  loseSound = loadSound("Music/Lose.flac");
  coinSound = loadSound("Music/Coin.wav");
  winSound = loadSound("Music/Win.wav");
  hitSound = loadSound("Music/Hit.flac");
  landSound = loadSound("Music/Land.wav");

  monsterGroup = new Group();
  flyingLandGroup = new Group();
  flyingMonsterGroup = new Group();
  coinGroup = new Group();
  bulletGroup1 = new Group();
  bulletGroup2 = new Group();
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

  startMonster = createSprite(displayWidth/2 - 300, displayHeight - 150);
  startMonster.addAnimation("Monster", startMonsterAni2);
  startMonster.scale = 0.45
  startMonster.velocityX = 10;

  startFly = createSprite(displayWidth/2 + 300, displayHeight - 150);
  startFly.addAnimation("FlyingMonster", flyingMonsterAni)
  startFly.scale = 0.3;
  startFly.velocityX = -10;

  leftE = createSprite(displayWidth - 1535, displayHeight/2, 10, 846);
  rightE = createSprite(displayWidth - 1, displayHeight/2, 10, 864);

  game = new Game();
  game.getState();
  game.start();

  console.log("DISPLAY : " + displayWidth, displayHeight)
}

function draw(){
  background(startImg);

  logo.display();
  startPlayer1.display();
  startPlayer2.display();
  startMonster.display();
  startFly.display();

  // edges = createEdgeSprites();
  // edges.shapeColor = "cyan"

  startFly.bounceOff(leftE);
  startFly.bounceOff(rightE);

  startMonster.bounceOff(leftE)
  startMonster.bounceOff(rightE)


  if(gameState === 0){
    introMusic.play();
  }

  if(playerCount === 2){
    game.update(1);
  }

  if(gameState === 1){
    game.play();
    introMusic.stop();
  }

  // if(playerCount > 2){
  //   game.wait();
  // }
}