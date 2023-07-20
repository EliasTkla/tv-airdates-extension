const url = 'https://show-air-dates.p.rapidapi.com/next7days';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '62e74ef50fmsh422a925295de4b0p177217jsne32c48befabe',
		'X-RapidAPI-Host': 'show-air-dates.p.rapidapi.com'
	}
};

document.body.onload = loadAirDate = async () => {
    var shows = JSON.parse(localStorage.getItem("weekShows"));
    var day = localStorage.getItem("sessionDay");
    var date = new Date();

    //checks if data wasn't stored already or if its a new day
    if(shows === null || date.getDay() != day){
        try {
        const response = await fetch(url, options);
        const result = await response.text();
        shows = JSON.parse(result);
        var date = new Date();

        /*stores the data pulled from api and the day it was pulled
        within local storage */
        localStorage.setItem("weekShows", JSON.stringify(shows));
        localStorage.setItem("sessionDay", date.getDay());

        getShows();
        } catch (error) {
        console.error(error);
        }
    } else {
        getShows();
    }
}