import { Request, Response, Router } from 'express';
import { Game } from '../game/game';

const gameController: Router = Router();

gameController.get("/getData", (req: Request, res: Response) => {
    res.json(Game.getData());
});

gameController.get("/click/:x/:y", (req: Request, res: Response) => {
    Game.handleClick({x: parseInt(req.params.x), y: parseInt(req.params.y)});
    res.json(Game.getData());
});

gameController.get("/start", (req: Request, res: Response) => {
    Game.stop();
    Game.start();
    res.json(Game.getData());
});

export { gameController };