'use strict';
require("mocha");
const request = require("supertest");
const application_1 = require("./application");
describe('routes', function () {
    const app = application_1.buildApp();
    it('GET /test', function (done) {
        request(app)
            .get('/hello/world')
            .expect('Viktor hello, world')
            .expect(200, done);
    });
});
//# sourceMappingURL=server_test.js.map