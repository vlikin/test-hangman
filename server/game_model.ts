import * as _ from 'lodash';

// Game's status codes.
export enum EGameStatus {
    Winner,
    GameOver,
    Fail,
    Right
}

// Status answer interface .
export interface IGameStatus {
    attempts: number;
    chars: number[] | boolean;
    status: EGameStatus;
}

// Game's model interface.
export interface IGameModel {
    getWord(): string;
    getOpenedWord(): string;
    play(char: number): IGameStatus;
}

// Game implementation.
export class GameModel implements IGameModel {

    // Chars opened successfully before.
    private openedChars: boolean[];

    // Mystery.
    private chars: number[];

    constructor(word: string, private attemptsLeft: number = 5) {
        this.chars = this.strToChars(word);
        this.openedChars = _.fill(Array(this.chars.length), false);
    }

    /**
     * Convert string to array of char codes.
     * 
     * @param str
     * @returns {number[]}
     */
    private strToChars(str: string): number[] {
        return str
            .split('')
            .map((value:string) => {
                return value.charCodeAt(0);
            });
    }

    /**
     * Converts char codes to string.
     *
     * @param chars
     * @returns {string}
     */
    private charsToStr(chars: number[]): string {
        return chars
            .map((char :number) => {
                return char == -1 ? '_': String.fromCharCode(char);
            })
            .join('');
    }

    /**
     * Retrieve the mystery.
     *
     * @returns {string}
     */
    public getWord(): string {
        return this.charsToStr(this.chars);
    }

    /**
     * Factory.
     *
     * @returns {GameModel}
     */
    public static create(): IGameModel {
        let words: string[] = [
            '3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'
        ];

        let word = words[_.random(0, words.length - 1)];
        return new GameModel(word);
    }

    /**
     * Retrieves the word opened list. Closed chars are replaced.
     *
     * @returns {number[]}
     */
    private getOpenedChars(): number[] {
        return this.openedChars.map((isOpened: boolean, index: number) => {
            if (isOpened) {
                return this.chars[index];
            }
            else {
                return -1
            }
        });
    }

    /**
     * Retrieves the word opened string. Closed chars are replaced.
     *
     * @returns {string}
     */
    public getOpenedWord(): string {
        return this.charsToStr(this.getOpenedChars());
    }

    /**
     * The method to play.
     *
     * @param char
     * @returns {{attempts: number, chars: number[], status: EGameStatus}}
     */
    public play(char: number): IGameStatus {
        // Retrieves positions guessed.
        let positions: number[] = this.chars
            .map((value: number, index: number) => {
                return char == value ? index : -1;
            })
            .filter((value: number) => {
                return value != -1;
            });

        // Checks attempts.
        if (this.attemptsLeft == 0) {
            return {
                attempts: 0,
                chars: this.getOpenedChars(),
                status: EGameStatus.GameOver
            };
        }

        let status: EGameStatus = EGameStatus.Winner; // :)

        if (positions.length > 0) {
            // Something is found.
            positions.forEach((position: number) => {
               this.openedChars[position] = true;
            });

            // Checks if all chars are opened.
            if (_.every(this.openedChars)) {
                status = EGameStatus.Winner;
            } else {
                status = EGameStatus.Right
            }

        } else {
            // Nothing is found.
            this.attemptsLeft--;
            if (this.attemptsLeft == 0) {
                status = EGameStatus.GameOver
            } else {
                status = EGameStatus.Fail
            }
        }

        return {
            attempts: this.attemptsLeft,
            chars: this.getOpenedChars(),
            status: status
        };
    };
}
