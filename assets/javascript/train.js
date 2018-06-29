$(document).ready(function () {

    //data from user form
    let train = "none";
    let destination = 'N/A';
    let time = 'N/A';
    let frequency = 'N/A';
    let nextTrain = 0;


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBIfentxrqsMirS1G-WxweSxxDkGjtZPb4",
        authDomain: "train-assignment-1a88d.firebaseapp.com",
        databaseURL: "https://train-assignment-1a88d.firebaseio.com",
        projectId: "train-assignment-1a88d",
        storageBucket: "",
        messagingSenderId: "731932658470"
    };
    firebase.initializeApp(config);


    var dataRef = firebase.database();

    $('#submit').on('click', function (event) {
        event.preventDefault();



        //data from user form
        train = $('#train').val().trim();
        destination = $('#destination').val().trim();
        time = $('#time').val().trim();
        frequency = $('#frequency').val().trim();

        if (train !== "" && destination !== "" && time !== "" && frequency !== "") {

            dataRef.ref().push({

                train: train,
                destination: destination,
                time: time,
                frequency: frequency
            })
        }
        else {
            alert("Fill out form completely before submission");
        }
    });


    dataRef.ref().on("child_added", function (childSnapshot) {
        let firstTrain = moment(childSnapshot.val().time, "HH:mm");
        let b = moment().subtract(firstTrain.format("HH"), 'hours').minutes(firstTrain.format('mm'));
        let c = parseInt(b.format("HH")) * 60 + parseInt(b.format("mm"));
        let frequency = moment(childSnapshot.val().frequency, "mm")
        let nextTrain = parseInt(frequency.format('mm')) - c % parseInt(frequency.format('mm'));

        $('#trainDiv').append(`<div class="trainElement"><span class="trainName"><b>    Train:</b> ${childSnapshot.val().train}</span><span class="trainDestination"> <b>    Destination:</b> ${childSnapshot.val().destination}</span><span class="trainTime"><b>     First Train:</b> ${childSnapshot.val().time}</span><span class="trainFrequency"><b>     Frequency:</b> ${childSnapshot.val().frequency} mins</span><span class="trainName"><b>    Next Train:</b> ${nextTrain} mins</span></div><hr>`)
    })
});