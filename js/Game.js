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

        player1 = createSprite(displayWidth/2 - 660, displayHeight - 185);
        player2 = createSprite(displayWidth/2 - 710, displayHeight - 185);
        player1.addAnimation("PlayerNew", player1Ani);
        player2.addAnimation("PlayerNew2", player2Ani);

        invisi = createSprite(displayWidth/2 + 7300, displayHeight - 140, 16000, 100);
        invisi.visible = false;

        player1.collide(invisi);
        player2.collide(invisi);

        players = [player1, player2];
    }

    play(){
        form.hide();

        Player.getPlayerInfo();
        player.getPlayersAtEnd();

        startPlayer1.visible = false;
        startPlayer2.visible = false;

        if(allPlayers !== undefined){
            var index = 0;
            var x = 50;
            var y;

            background("cyan");
            
            image(groundImg, displayWidth - 1550, displayHeight - 250, 32000, 250);

            for(var plr in allPlayers){
                console.log(plr);
                index ++ ;
                x = displayHeight - allPlayers[plr].distance;
                players[index - 1].x = x;

                if(index === player.index){
                    camera.position.x = players[index - 1].x;
                    camera.position.y = displayHeight/2;
                }
            }

            if(keyIsDown(RIGHT_ARROW)){
                player.distance -= 35;
                player.update();
            }
            if(keyIsDown(LEFT_ARROW)){
                player.distance += 20;
                player.update();
            }
            if(keyIsDown(UP_ARROW)){
                player.velocityY = -10;
            }
            player.velocityY = player.velocityY + 0.8;
        }

        drawSprites();
    }
}