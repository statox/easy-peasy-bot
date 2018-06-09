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
        console.log("updateWord");
        console.log("playedLetters: ");
        console.log(playedLetters);
        wordToShow = ""
        for (var i = 0; i < wordToFind.length; i++) {
            if (playedLetters.includes(wordToFind[i].toUpperCase())) {
                wordToShow += wordToFind[i] + " ";
            } else {
                wordToShow += "* ";
                wrongLetters = true;
            }
        }

        console.log("word to show: " + wordToShow);
    }

    this.startGame = function() {
        isPlaying = true;
        wordToFind = getRandomWord();
        updateWordToShow();

        console.log("Word to find: " + wordToFind);
        console.log("Word to show: " + wordToShow);

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
            res += wordToShow;
        }

        return res;
    }
};
