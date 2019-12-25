import { Request, Response, Router, NextFunction } from 'express';
import { GameFactory } from '../game/game.factory';

const gameController: Router = Router();

gameController.get("/:game/getData", (req: Request, res: Response) => {
    const game = GameFactory.get(req.params.game);
    res.json(game.getData());
});

gameController.get("/:game/click/:x/:y", (req: Request, res: Response) => {
    const game = GameFactory.get(req.params.game);
    game.handleClick({x: parseInt(req.params.x), y: parseInt(req.params.y)});
    res.json(game.getData());
});

gameController.get("/:game/start", (req: Request, res: Response) => {
    const game = GameFactory.get(req.params.game);
    game.stop();
    game.start();
    res.json(game.getData());
});

export { gameController };