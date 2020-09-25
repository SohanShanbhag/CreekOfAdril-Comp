class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }

    update(state){
        database.ref("/").update({
            gameState: state
        })
    }

    async start(){
        if(gameState === 0){
            player = new Player();
            var playerCountRef = await database.ref("playerCount").once("value");
            if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getPlayerCount();
            }

            form = new Form();
            form.display();
        }
        

        player1 = createSprite(displayWidth - 1486, displayHeight - 200);
        player2 = createSprite(displayWidth - 1486, displayHeight - 200);
        player1.addAnimation("PlayerNew", player1Ani);
        player2.addAnimation("PlayerNew2", player2Ani);

        invisi = createSprite(displayWidth/ 2 + 7300, displayHeight - 50, 50000, 100);
        invisi.visible = false;

        players = [player1, player2];

        for(var land = displayWidth - 1310; land < 25000; land += random(2000, 3000)){
            flyingLand = createSprite(land, random(displayHeight - 500, displayHeight - 550), 10, 10);
            flyingLand.addImage(flyingLandImg);
            flyingLand.scale = 0.6;

            flyingLandGroup.add(flyingLand);

            coin = createSprite(flyingLand.x, flyingLand.y - 100);
            coin.addAnimation("COIN",coinAni);
            coin.scale = 0.1;

            coinGroup.add(coin);
        }
        
        for(var mon = displayWidth + 1000; mon < 50000; mon += random(4000,5000)){
            monster = createSprite(mon, displayHeight - 200);
            monster.addAnimation("Monster", startMonsterAni);
            monster.scale = 0.4;
            monster.velocityX = -7;

            bullet = createSprite(monster.x, monster.y, 30, 5);
            bullet.shapeColor = "red";
            bullet.velocityX = -10;

            monsterGroup.add(monster);
            bulletGroup1.add(bullet);
        }

        for(var fly = displayWidth + 1000; fly < 50000; fly += random(5000, 6000)){
            flyingMonster = createSprite(fly, random(displayHeight - 350, displayHeight - 550));
            flyingMonster.addAnimation("FlyingMonster", flyingMonsterAni);
            flyingMonster.scale = 0.3;
            flyingMonster.velocityX = -7.5;

            flyingMonsterGroup.add(flyingMonster);
        }

        for(var gCount = 0; gCount < 25000; gCount += random(1000, 1400)){
            coin2 = createSprite(gCount , displayHeight - 200);
            coin2.addAnimation("COIN", coinAni);
            coin2.scale = 0.1;
            coinGroup.add(coin2)
        }

        castle = createSprite(displayWidth + 24000, displayHeight/2 - 80);
        castle.addImage(castleImg);
        castle.scale = 3.5
    }

    play(){ 
        form.hide();

        Player.getPlayerInfo();
        player.getPlayersAtEnd();

        player1.collide(invisi);
        player2.collide(invisi);

        startPlayer1.visible = false;
        startPlayer2.visible = false;
        startMonster.visible = false;
        startFly.visible = false;
        leftE.visible = false;
        rightE.visible = false;
        if(allPlayers !== undefined){
            var index = 0;
            var x = 50;
            var y = 400;

            background("cyan");

            for(var plr in allPlayers){
                index ++ ;

                image(groundImg, 0, displayHeight - 150, displayWidth*17, 250);

                x = displayWidth + allPlayers[plr].distance;
                y = displayHeight - allPlayers[plr].distanceY;
                players[index - 1].x = x;
                // players[index - 1].y = y;

                if(index === player.index){
                    camera.position.x = players[index - 1].x;
                    camera.position.y = displayHeight/2;

                    fill("black");
                    textSize(25);
                    textStyle(BOLD)
                    text(player.name + " (You) : " + Math.round(player.distance / 2), players[index - 1].x - 60, players[index - 1].y - 212);
                    text("Lives x " + player.lives + " | Coins x " + player.coins, players[index - 1].x - 100, players[index - 1].y - 150);
                }

                if(index !== player.index){
                    fill("black");
                    textSize(25);
                    textStyle(BOLD);
                    text(allPlayers[plr].name + " : " + Math.round(allPlayers[plr].distance / 2), players[index - 1].x - 50, players[index - 1].y - 212);
                    text("Lives x " + allPlayers[plr].lives + " | Coins x " + allPlayers[plr].coins, players[index - 1].x - 100, players[index - 1].y - 150);
                }

                

                
            }

            console.log(player1.y);
            if(keyIsDown(UP_ARROW) && player1.y > 663){
                if(player.index === 1){
                    player1.velocityY = -30
                }
                
                jumpSound.play();
                player.update();
            }
            player1.velocityY = player1.velocityY + 1;
                
            if(keyIsDown(UP_ARROW) && player1.y > 663){
                if(player.index === 2){
                    player2.velocityY = -30
                }
                player2.velocityY = player2.velocityY + 1;
                jumpSound.play();
                player.update();
            }

            if(keyDown("space")){
                bullet2 = createSprite(players[index].x, players[index].y, 30, 10);
                bullet2.shapeColor = "red";
                bullet2.velocityX = 10;

                bullet2.addImage(fireBall);
                bullet2.scale = 0.1

                bullet2.lifetime = 50

                bulletGroup2.add(bullet2);
            }

            if(player.index !== null){
                for(var collide1 = 0; collide1 < flyingLandGroup.length; collide1 ++){
                    if(player1.isTouching(flyingLandGroup[collide1])){
                        player1.collide(flyingLandGroup[collide1]);
                        landSound.play();
                    }
                }

                for(var coin = 0; coin < coinGroup.length; coin ++){
                    if(player1.collide(coinGroup[coin])){
                        coinGroup[coin].destroy();
                        player.coins += 1;
                        coinSound.play();
                    }
                }

                for(var collide2 = 0; collide2 < monsterGroup.length; collide2 ++){
                    if(monsterGroup[collide2].isTouching(player1)){
                        monsterGroup[collide2].destroy();
                        player.lives -= 1;
                        hitSound.play();
                    }
                }

                for(var collide3 = 0; collide3 < flyingMonsterGroup.length; collide3 ++){
                    if(flyingMonsterGroup[collide3].collide(player1)){
                        flyingMonsterGroup[collide3].destroy();
                        player.lives -= 1;
                        hitSound.play();
                    }
                }

                for(var collide4 = 0; collide4 < flyingLandGroup.length; collide4 ++){
                    if(player2.isTouching(flyingLandGroup[collide4])){
                        player2.collide(flyingLandGroup[collide4])
                        landSound.play();
                    }
                }

                for(var coin = 0; coin < coinGroup.length; coin ++){
                    if(player2.collide(coinGroup[coin])){
                        coinGroup[coin].destroy();
                        player.coins += 1;
                        coinSound.play();
                    }
                }

                for(var collide5 = 0; collide5 < monsterGroup.length; collide5 ++){
                   if(monsterGroup[collide5].isTouching(player2)){
                        monsterGroup[collide5].destroy();
                        player.lives -= 1;
                        hitSound.play();
                    }
                }

                for(var collide6 = 0; collide6 < flyingMonsterGroup.length; collide6 ++){
                    if(flyingMonsterGroup[collide6].isTouching(player2)){
                        flyingMonsterGroup[collide6].destroy();
                        player.lives -= 1;
                        hitSound.play();
                    }
                }

                //BULLET
                for(var bc = 0; bc < bulletGroup1.length; bc ++){
                    if(bulletGroup1[bc].isTouching(player1)){
                        bulletGroup1[bc].destroy();
                        hitSound.play();
                        player.lives -= 1;
                    }
                }
                for(var bc2 = 0; bc2 < bulletGroup1.length; bc2 ++){
                    if(bulletGroup1[bc2].isTouching(player2)){
                        bulletGroup1[bc2].destroy();
                        hitSound.play();
                        player.lives -= 1;
                    }
                }

                for(var hit = 0; hit < bulletGroup2.length; hit ++){
                    for(var hit2 = 0; hit2 < monsterGroup.length; hit2 ++){
                        if(bulletGroup2.isTouching(monsterGroup[hit2])){
                            monsterGroup[hit2].destroy();
                            bulletGroup2[hit].destroy();
                            hitSound.play();
                        }
                    }
                }
            }
            
            if(keyIsDown(RIGHT_ARROW) && player.distance /2 < 11950){
                player.distance += 35;
                player.update();
            }
            if(keyIsDown(LEFT_ARROW) && player.distance > -760){
                player.distance -= 20;
                player.update();
            }

            if(player.lives <= 0){
                Swal.fire({
                    title: "You Lose :(",
                    text: "Oh No. You lost all your lives. Press the reset button and refresh the browser[ Both you and your friend ], to play again",
                })
            }

            if(Math.round(player.distance / 2) > 11950 && player.lives > 0){
                gameState = 2;
                player.rank += 1;
                Player.updatePlayersAtEnd(player.rank);
                if(player.rank === 1){
                    swal({
                        title: "Awesome! Rank " + player.rank,
                        text: "YOU WON! You reached the castle first! Well Played " + player.name,
                        icon: "success",
                        button: {
                            text: "Great"
                        },
                        className: "red-bg",

                        content:{
                            element: "input",
                            attributes: {
                                placeholder: "How much would you rate this game from 1 to 10?",
                            }
                        }
                    })
                }

                if(player.rank === 2){
                    swal({
                        title: "Awesome! Rank " + player.rank,
                        text: "You came Second! You reached the castle! You can win next time " + player.name,
                        icon: "success",
                        button: {
                            text: "Great"
                        },
                        className: "red-bg",

                        content:{
                            element: "input",
                            attributes: {
                                placeholder: "How much would you rate this game from 1 to 10?",
                            }
                        }
                    })
                }
            }
            
            drawSprites();
        }
    }
}