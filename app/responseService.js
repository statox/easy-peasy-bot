module.exports = function() {
    this.startGame = function(wordToShow) {
        return "Let's begin to play!\n" + wordToShow;
    };

    this.lookingForWord = function() {
        return "I'm looking for a word to play with";
    }

    this.alreadyPlaying = function(wordToShow) {
        return "You are already playing!\n" + wordToShow;
    };

    this.notPlayingYet = function() {
        return "You are not playing yet.\n"
            + "Type `start` to play again\n"
            + "Type `leaderboard` to show the scores";
    }

    this.letterAlreadyPlayed = function(letterAlreadyPlayed, wordToShow) {
        return "You already played this letter: " + letterAlreadyPlayed + "\n"
            + wordToShow;
    }

    this.leaderboard = function(leaderboard) {
        return "*Leaderboard!*\n" + leaderboard;
    }

    this.helpInGame = function(wordToShow) {
        return "You are currently playing hangman!\n"
            + "Type any letter to continue playing\n"
            + wordToShow;
    }

    this.helpOutOfGame = function() {
        return "Type `start` to begin to play\n"
            + "Type `leaderboard` to show the scores";
    }

    this.hello = function() {
        return "Hello!\n"
            + "Beep. Boop. I am a bot and I can play hangman with you!\n";
    }

    this.winHangman = function(wordToFind) {
        return "*YOU WIN*\n"
            + "You had to find " + wordToFind + "\n"
            + "Type `start` to play again\n"
            + "Type `leaderboard` to show the scores";
    }

    this.loseHangman = function(wordToFind) {
        return "\n*YOU LOSE*\n"
            + "You had to find " + wordToFind + "\n"
            + "Type `start` to play again\n"
            + "Type `leaderboard` to show the scores"
    }

    this.wrongLetter = function(failedAttemps, drawing, wordToShow) {
        return "WRONG\n"
            + "errors: " + failedAttemps + "\n"
            + "\n```"
            + drawing
            + "```\n\n"
            + wordToShow;
    }

};
