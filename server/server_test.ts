'use strict';
import 'mocha';
import * as express from 'express';
import * as request from 'supertest';
import { buildApp } from './application';

describe('routes', function() {
    const app: express.Application = buildApp();
    it('GET /test', function(done) {
        request(app)
            .get('/hello/world')
            .expect('Viktor hello, world')
            .expect(200, done);
    });
});