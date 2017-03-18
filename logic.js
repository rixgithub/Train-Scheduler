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

    var trainName = "";
    var destination = "";
    var firstTrain = "";
    var frequency = "";
    var currentTime = "";
    var firstTrainConverted = "";
    var timeDifference = "";
    var timeApart = "";
    var minUntilTrain = "";
    var nextTrain = "";
    var nextTrainFormatted = "";
    var getKey = "";

    // Functions ***************

    $("#addTrain").on("click", function() {
    	event.preventDefault();
    	var trainName = $("#trainNameInput").val().trim();
    	var destination = $("#destinationInput").val().trim();
    	var firstTrain = $("#firstTrainInput").val().trim();
    	var frequency = $("#frequencyInput").val().trim();
    	currentTime = moment();
    	firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    	timeDifference = moment(currentTime).diff(moment(firstTrainConverted), "minutes");
    	timeApart = timeDifference % frequency;
    	minUntilTrain = frequency - timeApart;
    	nextTrain = moment(currentTime, "HH:MM").add(minUntilTrain, "minutes");
    	nextTrainFormatted = moment(nextTrain).format("h:mm A");

    	$("input:text").val("");

    	database.ref().push({
    		trainName: trainName,
    		destination: destination,
    		firstTrain: firstTrain,
    		frequency: frequency,
    		nextTrainFormatted: nextTrainFormatted,
    		minUntilTrain: minUntilTrain,
    	 	dateAdded: firebase.database.ServerValue.TIMESTAMP
    	});
    });

    database.ref().on("child_added", function(snapshot) {
    	console.log(snapshot.key);
    	$(".table").find('tbody')
			.append("<tr id=" + snapshot.key + "><td>" + snapshot.val().trainName + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextTrainFormatted + "</td><td>" + snapshot.val().minUntilTrain + "</td><td><button class='btn btn-defaut remove'>Remove Train</button></td></tr>")
    });

    $(document.body).on("click", ".remove", function() {
    	$(this).closest("tr").remove();
    	getKey = $(this).parent().parent().attr("id");
       	database.ref(getKey).remove();
    })

});