module.exports = function(drawingService, wordService, dataService, scoreService) {
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
        var res = "";

        var userData = dataService.getUserGame(user);
        if (!userData || !userData.isPlaying) {
            var wordToFind = getRandomWord();
            var wordToShow = getWordToShow(wordToFind, []);
            dataService.initializeUserGame(user, wordToFind, wordToShow);

            res += "Let's begin to play!\n";
            res += wordToShow;
        } else {
            res += "You are already playing!\n";
            res += userData.wordToShow;
        }

        return res;
    }

    this.playTurn = function(message) {
        var data = dataService.getUserGame(message.user);

        /* Not playing yet */
        if (!data || !data.isPlaying) {
            var res = "You are not playing yet.\n"
            res += "Type `start` to play again\n"
            res += "Type `leaderboard` to show the scores";

            return res;
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
                res += "*YOU WIN*\n";
                res += "You had to find " + data.wordToFind + "\n";
                res += "Type `start` to play again\n"
                res += "Type `leaderboard` to show the scores";

                dataService.endUserGame(message.user, true);
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

            if (data.failedAttemps == 7) {
                res += "\n*YOU LOSE*\n";
                res += "You had to find " + data.wordToFind + "\n";
                res += "Type `start` to play again\n"
                res += "Type `leaderboard` to show the scores";

                dataService.endUserGame(message.user, false);
            }
        }

        return res;
    }

    this.leaderboard = function(user) {
        var leaderBoard = scoreService.getGlobalLeaderboardWithUser(user);
        var res = "*Leaderboard!*\n";
        res += leaderBoard;

        return res;
    }
};
