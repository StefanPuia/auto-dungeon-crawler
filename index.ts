import express from "express";
import { gameController } from "./src/app/api/game.controller";
const app = express();
app.use("/", express.static("game"));

app.use("/game", gameController);

app.listen(8080, () => { console.log("listening") });