var DrawingService = require('./drawingService');
var drawingService = new DrawingService();

module.exports = function() {
    var wordList = [ 'arbre', 'bateau', 'couteau' ];
    var wordToFind;
    var wordToShow;
    var playedLetters = [];
    var isPlaying = false;
    var failedAttemps = 0;

    var getRandomWord = function() {
        var index = Math.floor(Math.random() * wordList.length);
        return wordList[index].toUpperCase();
    }

    var updateWordToShow = function() {
        wordToShow = ""
        for (var i = 0; i < wordToFind.length; i++) {
            if (playedLetters.includes(wordToFind[i].toUpperCase())) {
                wordToShow += wordToFind[i] + " ";
            } else {
                wordToShow += "* ";
                wrongLetters = true;
            }
        }
    }

    this.startGame = function() {
        isPlaying = true;
        wordToFind = getRandomWord();
        playedLetters = [];
        failedAttemps = 0;

        updateWordToShow();

        var res = "Let's begin to play!\n";
        res += wordToShow;

        return res;
    }

    this.handleAnswer = function(message) {
        /* Not playing yet */
        if (! isPlaying) {
            return "You are not playing yet, use `start` to begin."
        }

        var letter = message.toUpperCase().trim()[0];
        var res = "";

        /* Letter already played */
        if (playedLetters.includes(letter)) {
            res += "You already played this letter: " + letter + "\n";
            res += wordToShow;
            return res;
        }

        /* Update the word and the game with the new letter */
        playedLetters.push(letter);
        if (wordToFind.includes(letter)) {
            updateWordToShow();
            if (wordToShow.includes("*")) {
                res += wordToShow;
            } else {
                res += "YOU WIN\n";
                res += wordToFind;
                isPlaying = false;
            }
        } else {
            failedAttemps += 1;
            res += "WRONG\n";
            res += "errors: " + failedAttemps + "\n";
            var drawing = drawingService.getDrawing(failedAttemps);
            res += "\n```";
            res += drawing;
            res += "```\n\n";

            res += wordToShow;
        }

        if (failedAttemps == 7) {
            isPlaying = false;
            res += "\nYOU LOSE\n";
            res += "Type `start` to play again"
        }

        return res;
    }
};
