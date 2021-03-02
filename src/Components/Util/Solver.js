import trie from './Trie';

const solver = {
    allWords: [],
    paths: [],
    currentBoard: [],

    solveBoard (board) {
        this.currentBoard = board;
        board.forEach((row, x) => {
            row.forEach((letter, y) => {
                this.findWords(letter, [x, y]);
            });
        });
    },

    findWords(string, location, path = [], used = new Set()) {
        const usedCopy = new Set(used);
        const pathCopy = path.slice();
        usedCopy.add(`${location[0]}${location[1]}`);
        pathCopy.push(location);
        if(string.length >= 3) {
            if(trie.checkWord(string) && !this.allWords.includes(string)) {
                this.allWords.push(string);
                this.paths.push(pathCopy);
            }
        }
        const adjacent = this.getAdjacentTiles(location).filter(loc => {
            const locationString = `${loc[0]}${loc[1]}`;
            return !usedCopy.has(locationString);
        });

        adjacent.forEach(tile => {
            const newString = string + this.currentBoard[tile[0]][tile[1]]
            if(trie.isValidPrefix(newString)) {
                this.findWords(newString, tile, pathCopy, usedCopy);
            }
        });
    },

    getAdjacentTiles (location) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
        ];
        return directions.map(dir => {
            const x = dir[0] + location[0];
            const y = dir[1] + location[1];
            return [x, y];
        }).filter(coord => {
            return coord[0] >= 0 && coord[0] < 4 && coord[1] >= 0 && coord[1] < 4;
        });
    },

    checkUsed (adjacent, used) {
        for (let i = 0; i < used.length; i++) {
            let matches = 0;
            for (let j = 0; j < adjacent.length; j++) {
                if(adjacent[j] === used[i][j]) {
                    matches++;
                }
            }
            if(matches > 1) {
                return false;
            }
        }
        return true;
    },

    getWords() {
        return this.allWords;
    },

    getPaths() {
        return this.paths;
    },

    clear() {
        this.paths = [];
        this.allWords = [];
    }
}

export default solver;
