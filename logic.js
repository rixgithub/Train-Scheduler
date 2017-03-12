$(document).ready(function() {
    console.log( "ready!" );

    // initailize firebase ************
    var config = {
    apiKey: "AIzaSyBccJHcQfyJuzGBJf2iPkfnItAtEZnifEQ",
    authDomain: "train-scheduler-43ae9.firebaseapp.com",
    databaseURL: "https://train-scheduler-43ae9.firebaseio.com",
    storageBucket: "train-scheduler-43ae9.appspot.com",
    messagingSenderId: "1046913959404"
  	};

  	firebase.initializeApp(config);

  	// Variables  ************
  	
    var trainName = 
    var destination = 
    var firstTrainTime = 
    var frequency = 
    var nextArrival = 
    var minutesAway = 


    // Functions ***************

    $("#addTrain").on("click", function() {
    	event.preventDefault();


    });



});