import * as web from 'express-decorators';
import * as express from 'express';

/*** define a controller class ***/

@web.basePath('/hello')
export class TestController {
    private target: string;

    constructor(target) {
        this.target = target;
    }

    @web.get('/world')
    sayHelloAction(request, response) {
        response.send(`Viktor hello, ${this.target}`);
    }

}

export function buildApp(): express.Application {
    /*** install the routes in an express app ***/
    let app: express.Application = express();
    let test: TestController = new TestController('world');
    web.register(app, test);
    return app;
}