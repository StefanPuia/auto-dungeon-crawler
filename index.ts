import express, { Request, Response, NextFunction } from "express";
import { gameController } from "./src/app/api/game.controller";
import { GameFactory } from "./src/app/game/game.factory";
const app = express();


app.use("/static", express.static("static"));
app.get("/favicon.ico", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(404);
})

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    console.log(new Date(), req.method, req.originalUrl);
    next();
})
app.use("/play/:game", express.static("game"));
app.use("/game", gameController);

app.use("*", (req: Request, res: Response) => {
    res.redirect(`/play/${GameFactory.generateKey()}/`);
})

app.listen(8080, () => { console.log("listening") });