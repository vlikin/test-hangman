## How to deploy applicattion
* Clone the repository.
```
git clone git@github.com:vlikin/test-hangman.git
```
* Go to the `server/` directory.
* Install node modules.
```
npm i
```
* Run tests.
```
npm test
```
* If code is changed, run.
```
npm compile-test
```
* Check the logic in the *.ts files.

## Test task from 3D hubs.
The challenge is to build a simple HANGMAN game that works as follows:
* chooses a random word out of 6 words: (3dhubs, marvin, print, filament, order, layer)
* prints the spaces for the letters of the word (eg: ​_ _ _​ _ _ for order)
* the user can try to ask for a letter and that should be shown on the puzzle (eg: asks for "r" and now it shows ​_ r _​ _ r for order)
* the user can only ask 5 letters that don't exist in the word and then it's game over
* if the user wins, congratulate him!

You shouldn’t need a DB and no need to care about styling. We are aware that creating an application that satisfies the requirements is not that challenging but it does allow you to show us you master the fundamental concepts of coding. We’re looking for code that is well structured, optimised for maintainability and extendability. 

In terms of ‘interface’ you are free to choose, an HTML form or REST api interface are among the options.

It should take you around 4-8 hours.
## Used packages.
* [**express** Fast, unopinionated, minimalist web framework](https://www.npmjs.com/package/express)
* [**express-decorators** ES2015 decorators for express](https://www.npmjs.com/package/express-decorators)
* [**lowdb** JSON database for Node and the browser powered by lodash API](https://www.npmjs.com/package/lowdb)
## Development tips.
### Run server tests.
```
cd ./server
npm test
```
### Run server
```
cd ./server
npm start
```
### Compile server side.
```
cd ./server
npm-run tsc
```
## FAQ.
[What is the best solution for type definition management system(like tsd) for Typescript?](http://stackoverflow.com/questions/38942909/what-is-the-best-solution-for-type-definition-management-systemlike-tsd-for-ty)