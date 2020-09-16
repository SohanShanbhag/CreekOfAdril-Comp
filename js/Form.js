class Form{
    constructor(){
        this.input = createInput();

        this.enterButton = createButton("Enter Game");

        this.greet = createElement("h2");
        
        this.instruct1 = createElement("h3");

        this.instruct2 = createElement("h3");

        this.instruct3 = createElement("h3");
        
        this.wait = createElement("h3");

        this.startButton = createButton("Start Game");

        this.tellUser = createElement("h2");

        this.resetButton = createButton("Reset")
    }

    hide(){
        this.enterButton.hide();
        this.greet.hide();
        this.input.hide();
        this.instruct1.hide();
        this.instruct2.hide();
        this.instruct3.hide();
        this.wait.hide();
    }

    display(){
        this.input.position(displayWidth/2 - 110, displayHeight/2 - 150);
        this.input.style("font-size", "24px");
        this.input.style("font-weight", "bold")
        this.input.style("background", "#56FF00");
        this.input.style("width", "310px");
        this.input.style("height", "30px")
        this.input.style("text-align", "center");
        this.input;

        this.startButton.hide();
        this.tellUser.hide();

        this.enterButton.position(displayWidth/2 - 60, displayHeight/2 - 100);
        this.enterButton.style("width", "220px");
        this.enterButton.style("height", "30px");
        this.enterButton.style("background", "yellow");
        this.enterButton.style("font-weight", "bold");

        this.instruct1.html("Enter your name in the box below");
        this.instruct1.position(displayWidth/2 - 130, displayHeight/2 - 200);
        this.instruct1.style("color", "white");
        this.instruct1.style("font-family", "verdana");

        this.instruct2.html("Call a friend of yours and play this fun game!");
        this.instruct2.style("color", "white");
        this.instruct2.style("font-family", "verdana");
        this.instruct2.position(displayWidth/2 - 200, displayHeight/2 + 100)

        this.instruct3.html("•Press the Space Bar to jump and avoid the moving monsters. Collect coins and reach the finish line. Are you in it to win it?")
        this.instruct3.style("color", "white");
        this.instruct3.style("font-family", "verdana");
        this.instruct3.position(displayWidth/2 - 600, displayHeight/2 + 150);

        this.resetButton.style("background", "cyan");
        this.resetButton.style("font-family", "verdana");
        this.resetButton.style("font-weight", "bold");
        this.resetButton.style("width", "220px");
        this.resetButton.style("height", "30px");
        this.resetButton.position(displayWidth/2 - 60, displayHeight/2 + 400)

        this.enterButton.mousePressed(()=>{
            this.instruct1.hide();
            this.enterButton.hide();
            this.input.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greet.html("Hello " + player.name);
            this.greet.position(displayWidth/2 - 0, displayHeight/4 + 100);
            this.greet.style("font-family", "verdana");
            this.greet.style("color", "white");
            this.wait.html("Waiting for the other Player to join...");
            this.wait.position(displayWidth/2 - 120, displayHeight/4 + 50)
            this.wait.style("color", "white");
            this.wait.style("font-family", "verdana")
        })

        this.resetButton.mousePressed(()=>{
            game.update(0);
            player.updateCount(0);
            Player.updatePlayersAtEnd(0);
            database.ref("players/").remove();
        })
    }
}