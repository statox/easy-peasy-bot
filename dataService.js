module.exports = function(controller) {
    var data = {};

    var showData = function(id) {
        console.log(data[id]);
    }

    this.initializeUserGame = function(user, wordToFind, wordToShow) {
        var userData = {
            id: user,
            wordToFind: wordToFind,
            wordToShow: wordToShow,
            playedLetters: [],
            failedAttemps: 0,
            isPlaying: true
        };

        data[user] = userData;
        showData(user);
    }

    this.getUserGame = function(user) {
        return data[user];
    }
};
