var canvas;
var startImg, GroundImg;
var database, playerCount, waitCount;
var logo, logoImg, startPlayer1, startPlayer2, startMonster,startMonsterAni, player1Ani, player2Ani, groundImg, groundImgBack, trackImg, coinAni, flyingLandImg;
var introMusic;
var form, game, player;
var allPlayers, leftE, rightE;
var gameState=0;
var player1, player2, players, invisi, coin, coinAni, flyingLand, monster, flyingMonster, flyingMonsterAni, bullet, bullet2, startMonsterAni2;
var startFly;
var monsterGroup, flyingMonsterGroup, flyingLandGroup;

function preload(){
  startImg = loadImage("images/startImg.png");
  logoImg = loadImage("images/Logo2.png");
  player1Ani = loadAnimation("images/Player1ImgA.png","images/Player1ImgB.png","images/Player1ImgC.png");
  player2Ani = loadAnimation("images/Player2ImgA.png","images/Player2ImgB.png","images/Player2ImgC.png");
  groundImg = loadImage("images/GroundImg2.png");
  trackImg = loadImage("images/track.jpg");
  floorImg = loadImage("images/FloorImg.png");
  // startImg2 = loadImage("images/startImg2.png");
  coinAni = loadAnimation("images/CoinA.png", "images/CoinB.png");
  groundImgBack = loadImage("images/GroundImg.png");
  coinAni = loadAnimation("images/CoinA.png", "images/CoinB.png");
  flyingLandImg = loadImage("images/FlyingLand.png");
  startMonsterAni = loadAnimation("images/Monster1.png", "images/Monster2.png");
  flyingMonsterAni = loadAnimation("images/FlyingMonster1.png", "images/FlyingMonster2.png");
  startMonsterAni2 = loadAnimation("images/StartMonster1.png", "images/StartMonster2.png")

  introMusic = loadSound("Music/IntroMusic.mp3");

  monsterGroup = new Group();
  flyingLandGroup = new Group();
  flyingMonsterGroup = new Group();
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
}

function bounceOff(arg1, arg2){
  if (arg1.x - arg2.x < arg2.width/2 + arg1.width/2
      && arg2.x - arg1.x < arg2.width/2 + arg1.width/2) {
        arg1.velocityX = arg1.velocityX * (-1);
        arg2.velocityX = arg2.velocityX * (-1);
  }
  if (arg1.y - arg2.y < arg2.height/2 + arg1.height/2
    && arg2.y - arg1.y < arg2.height/2 + arg1.height/2){
      arg1.velocityY = arg1.velocityY * (-1);
      arg2.velocityY = arg2.velocityY * (-1);
  }
}