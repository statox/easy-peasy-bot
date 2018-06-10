var latinize = require('latinize');

module.exports = function(drawingService, wordService, dataService, scoreService, responseService) {
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
            var userData = dataService.getUserGame(user);
            if (!userData || !userData.isPlaying) {
                wordService.getRandomWord().then(function(randomWord) {
                    var wordToFind = randomWord;
                    var wordToShow = getWordToShow(wordToFind, []);
                    dataService.initializeUserGame(user, wordToFind, wordToShow);

                    resolve(responseService.startGame(wordToShow));
                });
            } else {
                resolve(responseService.alreadyPlaying(userData.wordToShow));
            }
        });
    }

    this.playTurn = function(message) {
        var data = dataService.getUserGame(message.user);

        /* Not playing yet */
        if (!data || !data.isPlaying) {
            return responseService.notPlayingYet();
        }

        message.text = latinize(message.text);
        /* If the player sent more than one letter check if they were right */
        var completeMessage = message.text.toUpperCase().trim();
        if (completeMessage.length > 1) {
            var res = "";
            if ( completeMessage === data.wordToFind) {
                res += responseService.winHangman(data.wordToFind);
                endUserGame(message.user, true);
            } else {
                data.failedAttemps += 1;
                var drawing = drawingService.getDrawing(data.failedAttemps);
                res += responseService.wrongLetter(data.failedAttemps, drawing, data.wordToShow);

                if (data.failedAttemps == 7) {
                    res += responseService.loseHangman(data.wordToFind);
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
            return responseService.letterAlreadyPlayed(letter, data.wordToShow);
        }

        /* Update the word and the game with the new letter */
        data.playedLetters.push(letter);

        if (data.wordToFind.includes(letter)) {
            data.wordToShow = getWordToShow(data.wordToFind, data.playedLetters);
            if (data.wordToShow.includes("*")) {
                res += data.wordToShow;
            } else {
                res += responseService.winHangman(data.wordToFind);
                endUserGame(message.user, true);
            }
        } else {
            data.failedAttemps += 1;
            var drawing = drawingService.getDrawing(data.failedAttemps);
            res += responseService.wrongLetter(data.failedAttemps, drawing, data.wordToShow);

            if (data.failedAttemps == 7) {
                res += responseService.loseHangman(data.wordToFind);
                endUserGame(message.user, false);
            }
        }

        return res;
    }

    this.leaderboard = function(user) {
        return new Promise(function(resolve, reject) {
            scoreService.getGlobalLeaderboardWithUser(user).then(function(leaderboard) {
                resolve(responseService.leaderboard(leaderboard));
            });
        });
    };

    this.getHelp = function(user) {
        if (user) {
            var data = dataService.getUserGame(user);
            if (data && data.isPlaying) {
                return responseService.helpInGame(data.wordToShow);
            }
        }

        return responseService.helpOutOfGame();
    };
};
