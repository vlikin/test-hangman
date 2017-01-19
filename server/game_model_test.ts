'use strict';
import 'mocha';
import * as should from 'should';
import { IGameStatus, IGameModel, EGameStatus, GameModel } from './game_model';


describe('Game model', function() {
    it('Initialization', function() {
        let game: IGameModel = new GameModel('abz');
        should(game.getWord()).is.equal('abz');
        let word = GameModel.create();
        should(['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'])
            .containEql(word.getWord());
    });

    it('Winner', function() {
        // Initialization.
        let game: IGameModel = new GameModel('abz');
        should(game.getWord()).is.equal('abz');
        let status: IGameStatus;

        // Right suggestion `a`.
        status = game.play('a'.charCodeAt(0));
        should(status.status).is.equal(EGameStatus.Right);

        // Failed suggestion.
        status = game.play('h'.charCodeAt(0));
        should(status.status).is.equal(EGameStatus.Fail);
        should(status.attempts).is.equal(4);
        status = game.play('b'.charCodeAt(0));

        // Right suggestion `b`.
        should(status.status).is.equal(EGameStatus.Right);
        should(game.getOpenedWord()[2]).is.equal('_');

        // Winner, the last right suggestion.
        status = game.play('z'.charCodeAt(0));
        should(status.attempts).is.equal(4);
        should(status.status).is.equal(EGameStatus.Winner);
    });

    it('Game over', function() {
        // Inititalization.
        let game: IGameModel = new GameModel('abz');
        should(game.getWord()).is.equal('abz');
        let status: IGameStatus;

        // Right `a`.
        status = game.play('a'.charCodeAt(0));
        should(status.status).is.equal(EGameStatus.Right);

        // 3 Fails ...
        ['h', 'c', 'd'].forEach((value: string) => {
            game.play(value.charCodeAt(0));
        });

        // The fail before game over.
        status = game.play('e'.charCodeAt(0));
        should(status.attempts).is.equal(1);
        should(status.status).is.equal(EGameStatus.Fail);

        // Game over. It was last attempt.
        status = game.play('c'.charCodeAt(0));
        should(status.attempts).is.equal(0);
        should(status.status).is.equal(EGameStatus.GameOver);
    });
});