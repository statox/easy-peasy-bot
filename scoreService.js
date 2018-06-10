module.exports = function(dataService) {

    this.getGlobalLeaderboardWithUser = function(user) {
        return new Promise(function(resolve, reject) {
            // Get all scores in the app asyncrhonously from the localstorage
            dataService.getAllUserScores(user).then(function(data) {
                // Sort the score by decreasing ratio
                data.sort((a,b) => {
                    if (a.ratio < b.ratio)
                        return 1;
                    if (a.ratio > b.ratio)
                        return -1;
                    return 0;
                });

                // Get the rank of the user
                var userRank = data.map(s => s.isCurrentUser).indexOf(true);

                var res = "```\n";
                if (data.length > 0) {
                    res += "========================\n";
                    res += "Played    Won    Ratio\n"
                    var sizePlayed = "Played    ".length;
                    var sizeWon = "Won    ".length;

                    data.forEach(function(user) {
                        res += user.played;
                        res += " ".repeat(sizePlayed - user.played.toString().length);
                        res += user.won;
                        res += " ".repeat(sizeWon - user.won.toString().length);
                        res += Math.floor((100 * user.won) / user.played);
                        if (user.isCurrentUser) {
                            res += "             YOU";
                        }
                        res += "\n";
                    });

                    res += "========================";
                } else {
                    res += "No one played yet. Be the first!";
                }
                res += "```";

                if (userRank > -1) {
                    res += "\nYou are ranked *" + ( userRank + 1 ) + "*";
                }

                resolve(res);
            });
        });
    };
};
