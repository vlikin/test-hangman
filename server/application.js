"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const web = require("express-decorators");
const express = require("express");
/*** define a controller class ***/
let TestController = class TestController {
    constructor(target) {
        this.target = target;
    }
    sayHelloAction(request, response) {
        response.send(`Viktor hello, ${this.target}`);
    }
};
__decorate([
    web.get('/world')
], TestController.prototype, "sayHelloAction", null);
TestController = __decorate([
    web.basePath('/hello')
], TestController);
exports.TestController = TestController;
function buildApp() {
    /*** install the routes in an express app ***/
    let app = express();
    let test = new TestController('world');
    web.register(app, test);
    return app;
}
exports.buildApp = buildApp;
//# sourceMappingURL=application.js.map