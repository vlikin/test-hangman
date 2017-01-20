import * as express from 'express';
import { buildApp } from './application';

const app: express.Application = buildApp();
app.set('games', {});
app.listen(8181, function() {
    console.log('The server has started listening at 8181 port.');
});
