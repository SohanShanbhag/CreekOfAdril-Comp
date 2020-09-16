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

        console.log(introMusic);

        player1 = createSprite(50, displayHeight - 200);
        player2 = createSprite(50, displayHeight - 200);
        player1.addAnimation("PlayerNew", player1Ani);
        player2.addAnimation("PlayerNew2", player2Ani);

        invisi = createSprite(displayWidth/2 + 7300, displayHeight - 140, 16000, 100);
        invisi.visible = false;

        player1.collide(invisi);
        player2.collide(invisi);

        players = [player1, player2];

        for(var land = displayWidth - 1310; land < 23000; land += random(2000, 3000)){
            flyingLand = createSprite(land, random(displayHeight - 600, displayHeight - 650));
            flyingLand.addImage(flyingLandImg);
            flyingLand.scale = 0.5;

            flyingLandGroup.add(flyingLand);
        }
        
        for(var mon = displayWidth + 400; mon < 33000; mon += random(3000,4000)){
            monster = createSprite(mon, displayHeight - 300);
            monster.addAnimation("Monster", startMonsterAni);
            monster.scale = 0.4;
            monster.velocityX = -7;

            bullet = createSprite(monster.x, monster.y, 30, 5);
            bullet.shapeColor = "red";
            bullet.velocityX = -7.3;

            monsterGroup.add(monster);
        }

        for(var fly = displayHeight + 400; fly < 22000; fly += random(4000, 5000)){
            flyingMonster = createSprite(fly, random(displayHeight - 450, displayHeight - 650));
            flyingMonster.addAnimation("FlyingMonster", flyingMonsterAni);
            flyingMonster.scale = 0.3;
            flyingMonster.velocityX = -7.5;

            flyingMonsterGroup.add(flyingMonster);
        }
    }

    play(){ 
        form.hide();

        Player.getPlayerInfo();
        player.getPlayersAtEnd();

        startPlayer1.visible = false;
        startPlayer2.visible = false;
        startMonster.visible = false;
        startFly.visible = false;
        leftE.visible = false;
        rightE.visible = false;
        if(allPlayers !== undefined){
            var index = 0;
            var x = 50;
            var y;

            background("cyan");
            console.log();

            for(var plr in allPlayers){
                index ++ ;

                logo.x = players[index - 1].x;

                image(groundImg, 0, displayHeight - 250, displayWidth*17, 250);

                x = displayWidth + allPlayers[plr].distance;
                players[index - 1].x = x;

                if(index === player.index){
                    camera.position.x = players[index - 1].x;
                    camera.position.y = displayHeight/2;

                    fill("black");
                    textSize(25)
                    text(player.name + "(You) : " + Math.round(player.distance / 2), players[index - 1].x - 650, displayHeight - 800);
                }

                if(index !== player.index){
                    fill("black");
                    textSize(25);
                    textFont("verdana")
                    text(allPlayers[plr].name + " : " + Math.round(allPlayers[plr].distance / 2), players[index - 1].x - 650, displayHeight - 750)
                }
            }

            if(player.index !== null){
                for(var collide1 = 0; collide1 < flyingLandGroup.length; collide1 ++){
                    flyingLandGroup[collide1].collide(player1);
                }

                for(var collide2 = 0; collide2 < monsterGroup.length; collide2 ++){
                    if(monsterGroup[collide2].isTouching(player1)){
                        monsterGroup[collide2].destroy();
                    }
                }

                for(var collide3 = 0; collide3 < flyingMonsterGroup.length; collide3 ++){
                    if(flyingMonsterGroup[collide3].collide(player1)){
                        flyingMonsterGroup[collide3].destroy();
                    }
                }

                for(var collide4 = 0; collide4 < flyingLandGroup.length; collide4 ++){
                    flyingLandGroup[collide4].collide(player2);
                }

                for(var collide5 = 0; collide5 < monsterGroup.length; collide5 ++){
                   if(monsterGroup[collide5].isTouching(player2)){
                        monsterGroup[collide5].destroy();
                    }
                }

                for(var collide6 = 0; collide6 < flyingMonsterGroup.length; collide6 ++){
                    if(flyingMonsterGroup[collide6].isTouching(player2)){
                        flyingMonsterGroup[collide6].destroy();
                    }
                }
            }

            // if(keyIsDown(32)){
            //     bullet2 = createSprite(player.x, player.y, 30, 10);
            //     bullet2.shapeColor = "red";
            //     bullet2.velocityX = 7;
            // }
            
            if(keyIsDown(RIGHT_ARROW)){
                player.distance += 35;
                player.update();
            }
            if(keyIsDown(LEFT_ARROW) && player.distance > -760){
                player.distance -= 20;
                player.update();
            }
            if(keyIsDown(UP_ARROW)){
                player.velocityY = -10;
            }
            player.velocityY = player.velocityY + 0.8;

            drawSprites();
        }
    }
}