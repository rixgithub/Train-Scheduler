$(document).ready(function() {

    // initailize firebase ************
    var config = {
    apiKey: "AIzaSyBccJHcQfyJuzGBJf2iPkfnItAtEZnifEQ",
    authDomain: "train-scheduler-43ae9.firebaseapp.com",
    databaseURL: "https://train-scheduler-43ae9.firebaseio.com",
    storageBucket: "train-scheduler-43ae9.appspot.com",
    messagingSenderId: "1046913959404"
	};
	
	firebase.initializeApp(config);
	
	// variable to reference the database
  	
  	database = firebase.database();

  	// Variables  ************
    
    var nextArrival = 1235;
    var minutesAway = 30;


    // Functions ***************

    $("#addTrain").on("click", function() {
    	event.preventDefault();
    	var trainName = $("#trainNameInput").val().trim();
    	var destination = $("#destinationInput").val().trim();
    	var firstTrainTime = $("#firstTrainInput").val().trim();
    	var frequency = $("#frequencyInput").val().trim();

    	$("input:text").val("");

    	database.ref().push({
    		trainName: trainName,
    		destination: destination,
    		firstTrainTime: firstTrainTime,
    		frequency: frequency
    	});
    });

    database.ref().on("child_added", function(snapshot) {
    	$(".table").find('tbody')
	    		.append("<tr><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")
	    	 		// .append("<td>" + snapshot.val().destination + "</td>")
	    				// .append("<td>" + snapshot.val().frequency + "</td>")
	    				// 	.append("<td>" + nextArrival + "</td>")
	    				// 		.append("<td>" + minutesAway + "</td></tr>")
	    							

    });


});