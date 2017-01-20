import * as web from 'express-decorators';
import * as express from 'express';
import { GameModel, IGameModel, IGameStatus, EGameStatus } from './game_model';
import * as _ from 'lodash';
import * as bodyParser from 'body-parser';


@web.basePath('/game')
export class GameController {

    /**
     * Generates UUID.
     *
     * @returns {String}
     */
    private getUUID(): string {
        return (Date.now().valueOf() + '-' + _.random(1111, 9999)).toString();
    }

    /**
     * Starts the game.
     *
     * @param request
     * @param response
     */
    @web.get('/start')
    public startAction(request: express.Request, response: express.Response) {
        let uuid: string = this.getUUID();
        let game: IGameModel = GameModel.create();
        let games: any = request.app.get('games');
        games[uuid] = game;
        response.json({
            uuid: uuid,
            word: game.getOpenedWord()
        });
    }

    /**
     * Plays the game.
     *
     * @param request
     * @param response
     */
    @web.post('/play')
    public tryAction(request: express.Request, response: express.Response) {
        let char: number = request.body['char'];
        let uuid: string = request.body['uuid'];
        let game: IGameModel = null;
        if (!!char && !!uuid) {
            game = request.app.get('games')[uuid];
        }
        else {
            response
                .status(301)
                .json({
                    message: 'Not enough parameters.'
                });
            return;
        }
        if (!game) {
            response
                .status(301)
                .json({
                    message: 'Wrong UUID'
                });
            return;
        }

        let status: IGameStatus = game.play(char);
        response
            .json(status);
    }

}

/**
 * Bootstrap factory.
 *
 * @returns {express.Application}
 */
export function buildApp(): express.Application {
    let app: express.Application = express();
    app.use(bodyParser.json());
    let games: any = {};
    app.set('games', games);
    web.register(app, new GameController());
    return app;
}