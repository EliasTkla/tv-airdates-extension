// require("dotenv").config();

const url = '';

const options = {
    method: 'GET',
    headers: {
        '': '',
        '': ''
    }
};

document.body.onload = loadAirDate = async () => {
    var shows = JSON.parse(localStorage.getItem("weekShows"));
    var day = localStorage.getItem("sessionDay");
    var date = new Date();

    //checks if data wasn't stored already or if its a new day
    if (shows === null || date.getDay() != day) {
        document.getElementById("loader").style.display = "block";

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            shows = JSON.parse(result);
            var date = new Date();

            /*stores the data pulled from api and the day it was pulled
            within local storage */
            localStorage.setItem("weekShows", JSON.stringify(shows));
            localStorage.setItem("sessionDay", date.getDay());

            document.getElementById("loader").style.display = "none";
            getShows();
        } catch (error) {
            console.error(error);
        }
    } else {
        getShows();
    }
}