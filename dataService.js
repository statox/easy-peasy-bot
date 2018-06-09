module.exports = function(controller) {
    var data = {};

    var showData = function(id) {
        console.log(data[id]);
    }

    this.initializeUserGame = function(user, wordToFind, wordToShow) {
        var userData;

        if (!data[user]) {
            userData = {
                id: user,
                wordToFind: wordToFind,
                wordToShow: wordToShow,
                playedLetters: [],
                failedAttemps: 0,
                isPlaying: true,
                gamesPlayed: 1,
                gamesWon: 0
            };

            data[user] = userData;
        } else {
            data[user].wordToFind = wordToFind;
            data[user].wordToShow = wordToShow;
            data[user].failedAttemps = 0;
            data[user].playedLetters = [];
            data[user].isPlaying = true,
            data[user].gamesPlayed += 1;
        }
    };

    this.endUserGame = function(user, won) {
        var data = this.getUserGame(user);

        data.isPlaying = false;
        delete data.wordToShow;
        delete data.wordToFind;
        delete data.failedAttemps;
        delete data.playedLetters;

        if (won) {
            data.gamesWon += 1;
        }
    };

    this.getUserGame = function(user) {
        return data[user];
    };

    this.getAllUserScores = function(user) {
        return Object.keys(data).map(function(key) {
            return {
                won: data[key].gamesWon,
                played: data[key].gamesPlayed,
                isCurrentUser: key === user
            }
        });
    };
};
