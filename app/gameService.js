var latinize = require('latinize');

module.exports = function(drawingService, wordService, dataService, scoreService) {
    var drawingService = drawingService;
    var wordToFind;
    var wordToShow;
    var playedLetters = [];
    var isPlaying = false;
    var failedAttemps = 0;

    var getWordToShow = function(wordToFind, playedLetters) {
        var wordToShow = ""

        for (var i = 0; i < wordToFind.length; i++) {
            var latinizedLetter = latinize(wordToFind[i].toUpperCase());
            if (playedLetters.includes(latinizedLetter)) {
                wordToShow += wordToFind[i] + " ";
            } else {
                wordToShow += "* ";
            }
        }
        return wordToShow;
    }

    var endUserGame = function(user, won) {
        var data = dataService.getUserGame(user);

        delete data.wordToShow;
        delete data.wordToFind;
        delete data.failedAttemps;
        delete data.playedLetters;

        if (won) {
            data.gamesWon += 1;
        }

        data.gamesPlayed += 1;
        data.ratio = Math.floor((100 * data.gamesWon) / data.gamesPlayed);
        data.isPlaying = false;

        dataService.endUserGame(user);
    };

    this.startGame = function(user) {
        return new Promise(function(resolve, reject) {
            var res = "";

            var userData = dataService.getUserGame(user);
            if (!userData || !userData.isPlaying) {
                wordService.getRandomWord().then(function(randomWord) {
                    var wordToFind = randomWord;
                    var wordToShow = getWordToShow(wordToFind, []);
                    dataService.initializeUserGame(user, wordToFind, wordToShow);

                    res += "Let's begin to play!\n";
                    res += wordToShow;

                    resolve(res);
                });
            } else {
                res += "You are already playing!\n";
                res += userData.wordToShow;
                resolve(res);
            }
        });
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

        message.text = latinize(message.text);
        /* If the player sent more than one letter check if they were right */
        var completeMessage = message.text.toUpperCase().trim();
        if (completeMessage.length > 1) {
            var res = "";
            if ( completeMessage === data.wordToFind) {
                res += "*YOU WIN*\n";
                res += "You had to find " + data.wordToFind + "\n";
                res += "Type `start` to play again\n"
                res += "Type `leaderboard` to show the scores";

                endUserGame(message.user, true);
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

                    endUserGame(message.user, false);
                }
            }
            return res;
        }

        /* Otherwise test the letter and update the game */
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

                endUserGame(message.user, true);
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

                endUserGame(message.user, false);
            }
        }

        return res;
    }

    this.leaderboard = function(user) {
        return new Promise(function(resolve, reject) {
            scoreService.getGlobalLeaderboardWithUser(user).then(function(leaderboard) {
                var res = "*Leaderboard!*\n";
                res += leaderboard;

                resolve(res);
            });
        });
    };

    this.getHelp = function(user) {
        var res = "";
        if (user) {
            var data = dataService.getUserGame(user);
            if (data && data.isPlaying) {
                res += "You are currently playing hangman!\n"
                res += "Type any letter to continue playing\n";
                res += data.wordToShow;
                return res;
            }
        }
        res += "Type `start` to begin to play\n";
        res += "Type `leaderboard` to show the scores";

        return res;
    };

    this.sayHello = function() {
        var res = "";
        res += "Hello!\n";
        res += "Beep. Boop. I am a bot and I can play hangman with you!\n";

        return res;
    };
};
