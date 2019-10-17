
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
            currentTime: firebase.database.ServerValue.TIMESTAMP,
        });

        // let keyRef = db.ref();
        // keyRef.once("value")
        // .then(function(keySnap) {
        //     var key = keySnap.key;
        //     console.log(key)
        // });
        // console.log("yes")
        
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
        
    })
    db.ref().on("child_added", function(snapshot) {
        let sv = snapshot.val();
        
        // let key = sv.key
        // console.log(key)

        let tr = $("<tr>");
        tr.addClass("trainRow")
        $("#train-schedule").append(tr)

        let tdn = $("<td>");
        tdn.text(sv.trainName);
        $(tr).append(tdn);

        let tdd = $("<td>");
        tdd.text(sv.destination);
        $(tr).append(tdd);

        let tdf = $("<td>");
        tdf.text(sv.frequency);
        $(tr).append(tdf);

        //moment stuff
        let freqData = sv.frequency
        
        let firstTrainTime = 0;
        
        let firstTimeConv = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        
        let timeDif = moment().diff(moment(firstTimeConv), "minutes");
        
        let timeRemainder = timeDif % freqData;
        
        let timeToTrain = freqData - timeRemainder;
        
        let nxtTrn = moment().add(timeToTrain, "minutes");
        
        let tdna = $("<td>");
        tdna.text(moment(nxtTrn).format('LT'));
        $(tr).append(tdna);
        
        let tdtt = $("<td>");
        tdtt.text(timeToTrain);
        $(tr).append(tdtt);
    });

    

