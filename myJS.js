"use strict";
var myApp = {
    Car: function (make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    },
    Cars: [],
    createCar: function () {
        var makeVal = document.getElementById("carMake").value;
        var modelVal = document.getElementById("carModel").value;
        var colorVal = document.getElementById("carColor").value;
        //myApp.Cars.push(new myApp.Car(makeVal, modelVal, colorVal));

        myApp.postToDB(makeVal, modelVal, colorVal);

        document.getElementById("carMake").value = "";
        document.getElementById("carModel").value = "";
        document.getElementById("carColor").value = "";
       myApp.getData();
    },
    postToDB: function (makeVal, modelVal, colorVal) {
        var car = {make:makeVal, model: modelVal, color: colorVal };
        var request = XMLHttpRequest();
        var url = "https://cardb0123.firebaseio.com/.json";
        request.open ('POST', url, true);
        request.onload = function() {
            if(this.status >= 200 && this.status < 400) {
                //alert ("Data Uploaded");
            } else  {
                alert ("ERROR");
            }
        };
        request.onerror = function () {
            alert("Fatal Error");
        }
        request.send(JSON.stringify(car));
    },
    getData: function() {
        var request = XMLHttpRequest();
        var url = "https://cardb0123.firebaseio.com/.json";
        request.open('GET', url, true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(request.response);
                for (var i in data){
                    myApp.Cars.push(data[i]);
                }
               
            } else {
                alert("ERROR");
            }
            myApp.redrawCars();
        };
        request.onerror = function () {
            alert("Fatal Error");
        }
        request.send();
    },
    redrawCars: function () {

        var allCars = document.getElementById("allCars");
        allCars.innerHTML = "";
        allCars.setAttribute("style", "visibility: visible;");
        var prop = "";
        for (var i in myApp.Cars) {
            prop += '<tr><td>' + myApp.Cars[i].make + '</td><td>'
                + myApp.Cars[i].model + '</td><td>' + myApp.Cars[i].color
            + '</td><td><div class="btn btn-info" onclick="myApp.editCar(' + i + ')">Edit</div><div class="btn btn-danger" onclick="myApp.deleteCar(' + i + ')">Delete</div></tr>';

        }
        allCars.innerHTML += prop;
    },
    editCar: function (index) {
        //hide create button
        //unhide a button for update
        //unhide a second button to cancel
        var hideCreate = document.getElementById("createCar");
        hideCreate.style.visibility = "hidden";

        var updateButton = document.getElementById("updateCar");
        updateButton.style.visibility = "visible";

        var cancelButton = document.getElementById("cancelEdit");
        cancelButton.style.visibility = "visible";

        document.getElementById("carMake").value = myApp.Cars[index].make;
        document.getElementById("carModel").value = myApp.Cars[index].model;
        document.getElementById("carColor").value = myApp.Cars[index].color;

        //set hidden input or as a variable
        myApp.currentEdit = index;
    },
    saveEditCar: function () {


        myApp.Cars[myApp.currentEdit].make = document.getElementById("carMake").value;
        myApp.Cars[myApp.currentEdit].model = document.getElementById("carModel").value;
        myApp.Cars[myApp.currentEdit].color = document.getElementById("carColor").value;
        myApp.currentEdit = -1;

        document.getElementById("carMake").value = "";
        document.getElementById("carModel").value = "";
        document.getElementById("carColor").value = "";

        myApp.redrawCars();

        var hideCreate = document.getElementById("createCar");
        hideCreate.style.visibility = "visible";

        var updateButton = document.getElementById("updateCar");
        updateButton.style.visibility = "hidden";

        var cancelButton = document.getElementById("cancelEdit");
        cancelButton.style.visibility = "hidden";

    },

    cancelEditCar: function () {
        hideCreate.style.visibility = "visible";
    },



    deleteCar: function (index) {
        myApp.Cars.splice(index, 1);
        myApp.redrawCars();

    },
    sortCars: function () {
        myApp.redrawCars();
    }

};