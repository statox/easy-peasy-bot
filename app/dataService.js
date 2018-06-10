module.exports = function(controller) {
    var data = {};

    var showData = function(id) {
        console.log(data[id]);
    }

    this.initializeUserGame = function(user, wordToFind, wordToShow) {
        var userData;

        if (!data[user]) {
            controller.storage.users.get(user, function(err, userData) {
                if (userData == null) {
                    userData = {
                        id: user,
                        gamesPlayed: 0,
                        gamesWon: 0
                    };
                }

                userData.wordToFind = wordToFind;
                userData.wordToShow = wordToShow;
                userData.playedLetters = [];
                userData.failedAttemps = 0;
                userData.isPlaying = true;

                data[user] = userData;
            });
        } else {
            data[user].wordToFind = wordToFind;
            data[user].wordToShow = wordToShow;
            data[user].failedAttemps = 0;
            data[user].playedLetters = [];
            data[user].isPlaying = true;
        }
    };

    this.endUserGame = function(user, won) {
        var userData = this.getUserGame(user);
        controller.storage.users.save(userData);
        delete data[user];
    };

    this.getUserGame = function(user) {
        return data[user];
    };

    this.getAllUserScores = function(user) {
        return new Promise(function(resolve, reject) {
            controller.storage.users.all(function(err, allUserData) {
                var result = allUserData.map((userData) => {
                    return {
                        won: userData.gamesWon,
                        played: userData.gamesPlayed,
                        isCurrentUser: userData.id === user
                    };
                });

                resolve(result);
            });
        });
    };
};
