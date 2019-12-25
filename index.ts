import express, { Request, Response } from "express";
import { gameController } from "./src/app/api/game.controller";
import { GameFactory } from "./src/app/game/game.factory";
const app = express();

app.use("/info", (req: Request, res: Response) => {
    res.json(GameFactory.getAll());
})

app.use("/static", express.static("static"));
app.use("/play/:game", express.static("game"));
app.use("/game", gameController);
app.use("*", (req: Request, res: Response) => {
    res.redirect("/play/" + GameFactory.generateKey());
})

app.listen(8080, () => { console.log("listening") });