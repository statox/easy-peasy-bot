module.exports = function(drawingService, wordService, dataService) {
    var drawingService = drawingService;
    var wordToFind;
    var wordToShow;
    var playedLetters = [];
    var isPlaying = false;
    var failedAttemps = 0;

    var getRandomWord = function() {
        return wordService.getRandomWord();
    }

    var getWordToShow = function(wordToFind, playedLetters) {
        var wordToShow = ""
        for (var i = 0; i < wordToFind.length; i++) {
            if (playedLetters.includes(wordToFind[i].toUpperCase())) {
                wordToShow += wordToFind[i] + " ";
            } else {
                wordToShow += "* ";
            }
        }
        return wordToShow;
    }

    this.startGame = function(user) {
        isPlaying = true;
        var wordToFind = getRandomWord();
        var wordToShow = getWordToShow(wordToFind, []);

        dataService.initializeUserGame(user, wordToFind, wordToShow);

        var res = "Let's begin to play!\n";
        res += wordToShow;

        return res;
    }

    this.handleAnswer = function(message) {
        var data = dataService.getUserGame(message.user);

        /* Not playing yet */
        if (!data || !data.isPlaying) {
            return "You are not playing yet, use `start` to begin."
        }

        var letter = message.text.toUpperCase().trim()[0];
        var res = "";

        /* Letter already played */
        if (data.playedLetters.includes(letter)) {
            res += "You already played this letter: " + letter + "\n";
            res += data.wordToShow;
            return res;
        }

        /* Update the word and the game with the new letter */
        data.playedLetters.push(letter);
        if (data.wordToFind.includes(letter)) {
            data.wordToShow = getWordToShow(data.wordToFind, data.playedLetters);
            if (data.wordToShow.includes("*")) {
                res += data.wordToShow;
            } else {
                res += "YOU WIN\n";
                res += data.wordToFind;
                res += "Type `start` to play again"
                data.isPlaying = false;
            }
        } else {
            data.failedAttemps += 1;
            res += "WRONG\n";
            res += "errors: " + data.failedAttemps + "\n";
            var drawing = drawingService.getDrawing(data.failedAttemps);
            res += "\n```";
            res += drawing;
            res += "```\n\n";

            res += data.wordToShow;
        }

        if (data.failedAttemps == 7) {
            data.isPlaying = false;
            res += "\nYOU LOSE\n";
            res += data.wordToFind;
            res += "\n";
            res += "Type `start` to play again"
        }

        return res;
    }
};
