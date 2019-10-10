
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBialJH8Q5c39rkJH6qhz5G97jOne9UiE0",
        authDomain: "train-scheduler-e793b.firebaseapp.com",
        databaseURL: "https://train-scheduler-e793b.firebaseio.com",
        projectId: "train-scheduler-e793b",
        storageBucket: "",
        messagingSenderId: "266841674843",
        appId: "1:266841674843:web:4579f6333698f83bf51b7e",
        measurementId: "G-T5Q7MPHN30"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.database();
    
    $("#trn-submit").on("click", function(event){
        event.preventDefault();

        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTime = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        db.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            currentTime: firebase.database.ServerValue.TIMESTAMP
        });
        console.log("yes")

        
    })