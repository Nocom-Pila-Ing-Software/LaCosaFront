import { createServer, Model, hasMany, belongsTo } from "miragejs";

export default function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,
        models: {
            waitingRoom: Model.extend({
                players: hasMany()
            }),
            player: Model.extend({
                room: belongsTo("waitingRoom")
            }),
            game: Model.extend({
                waitingRoom: belongsTo(),
                players: hasMany("player"),
                cards: hasMany(),
            }),
            card: Model.extend({
                player: belongsTo(),
                deck: belongsTo("game"),
            }),
        },

        routes() {
            this.post("/room", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);
                let newRoom = schema.waitingRooms.create(attrs);
                return newRoom;
            });

            this.post("/room/:id/players", (schema, request) => {
                let newPlayer = schema.players.create(JSON.parse(request.requestBody));
                return newPlayer;
            });

            this.get("/room/:id", (schema, request) => {
                let id = request.params.id;
                return schema.waitingRooms.find(id);
            });

            this.post("/game", (schema, request) => {
                let newGame = schema.games.create(JSON.parse(request.requestBody));
                return newGame;
            });

            this.put("/game/:gameID/play-card", (schema, request) => {
                let game = schema.games.find(request.params.gameID);
                let card = JSON.parse(request.requestBody);
                game.update(card);
                return game;
            });

            this.put("/game/:gameID/deal-card", (schema, request) => {
                let game = schema.games.find(request.params.gameID);
                let card = JSON.parse(request.requestBody);
                game.update(card);
                return game;
            });

            this.get("/game/:gameID", (schema, request) => {
                return schema.games.find(request.params.gameID);
            });

            this.get("/player/:playerId", (schema, request) => {
                return schema.players.find(request.params.playerId);
            });
        },
    });
    return server
}

