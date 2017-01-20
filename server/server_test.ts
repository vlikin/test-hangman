'use strict';
import 'mocha';
import * as express from 'express';
import * as request from 'supertest-as-promised';
import { buildApp } from './application';
import * as should from 'should';
import {EGameStatus} from "./game_model";


describe('Game routing', function() {
    const app: express.Application = buildApp();

    it('Winner', function(done) {
        let uuid: string;

        // Starts game
        request(app)
            .get('/game/start')
            .expect((res) => {
                uuid = res.body.uuid;
            })
            .expect((res) => {
              should(res.body.word).is.equal('__');
            })
            .expect(200)
            .then(() => {
                // `a` - Right suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'b'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Right);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Fail);
                    });
            })
            .then(() => {
                // `a` - Right suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'a'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Winner);
                    });
            })
            .then(() => {
                done();
            })
    });

    it('Game Over', function(done) {
        let uuid: string;

        // Starts game
        request(app)
            .get('/game/start')
            .expect((res) => {
                uuid = res.body.uuid;
            })
            .expect((res) => {
                should(res.body.word).is.equal('__');
            })
            .expect(200)
            .then(() => {
                // `a` - Right suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'b'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Right);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Fail);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Fail);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Fail);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.Fail);
                    });
            })
            .then(() => {
                // `c` - Wrong suggestion.
                return request(app)
                    .post('/game/play')
                    .send({
                        uuid: uuid,
                        char: 'c'.charCodeAt(0)
                    })
                    .expect(200)
                    .expect((res) => {
                        should(res.body.status).is.equal(EGameStatus.GameOver);
                    });
            })
            .then(() => {
                done();
            })
    });
});