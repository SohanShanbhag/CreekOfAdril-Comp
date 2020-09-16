class Player{
    constructor(){
        this.index = null;
        this.distance = 0;
        this.distanceY = 1;
        this.score = 0;
        this.name = null;
        this.rank = null;
    }

    getPlayerCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", (data)=>{
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount: count
        })
    }

    update(){
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score: this.score
        })
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", (data)=>{
            allPlayers = data.val();
        })
    }

    getPlayersAtEnd(){
        var playersAtEndRef = database.ref("PlayersAtEnd");
        playersAtEndRef.on("value", (data)=>{
            this.rank = data.val();
        })
    }

    static updatePlayersAtEnd(rank){
        database.ref("/").update({
            playersAtEnd: rank
        })
    }
}