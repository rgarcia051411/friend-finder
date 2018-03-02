var path = require('path');

// import the list of potential dates.
var friends = require ('../data/friends.js');



// ===============================================================================
// ROUTING
// ===============================================================================


// Export API routes
module.exports = function(app){
	console.log("apiRoutes.js");

	// Get lists of potential date.
	app.get('/api/friends', function(req, res){
		res.json(friends);
	});

	// Add user as a new friend entry
	app.post('/api/friends', function(req, res){
		// Capture the userInput object
		var userInput = req.body;
		console.log('userInput = ' + JSON.stringify(userInput));

		var userScore = userInput.scores;
		console.log('userScore' + userScore);


		// date match
		var matchName = '';
		var mathImage = '';
		var totalDifference = 1000;

		// check all friends in the list
		for(var i = 0; friends.length; i++){

			var diff = 0;
			for(var j = 0; j < userScore.length; j++){
				dif += Math.abs(friends[i].scores[j] - userScore[j]);
			}

			// To determine the match record the lowest difference
			if(diff < totalDifference){
				// console.log(diff)

				totalDifference = diff;
				matchName = friends[i].matchName;
				mathImage = friends[i].photo;
			}

		}

		// push new user to potential date list
		friends.push(userInput);

		// send response
		res.json({status: 'Approve', matchName: matchName, mathImage: mathImage});

	});



};




