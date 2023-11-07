var currentPage = "calendar";
var dayIndex = 0;
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
var dayNum = date.getDay();

// switches page content according to toggle icon
document.getElementById("toggle-page").onclick = function () {
    if (currentPage === "calendar") {
        document.getElementById("show-calendar").style.display = "none";
        document.getElementById("search-container").style.display = "block";
        document.getElementById("toggle-page").style.background = "url('/icons/calendar.svg') no-repeat center center / cover";
        document.getElementById("clear-search").style.display = "none";
        input.value = "";

        currentPage = "search";
        myShowList();
    } else {
        document.getElementById("show-calendar").style.display = "block";
        document.getElementById("search-container").style.display = "none";
        document.getElementById("toggle-page").style.background = "url('/icons/list.svg') no-repeat center center / cover";
        document.getElementById("searchbar").value = "";
        document.getElementById("result-container").style.display = "none";

        currentPage = "calendar";
        dayIndex = 0;
        getShows();
    }
}

// called to set all show information within calendar
async function getShows() {
    document.getElementById("loader").style.display = "none";

    document.getElementById("calendar-date").innerHTML = days[dayNum] + ' ' + months[date.getMonth()] + ' ' + (date.getDate() + dayIndex);

    var list = JSON.parse(localStorage.getItem("myShows"));
    var shwList = document.getElementById('show-list');

    if (!list) {
        shwList.innerHTML = '<li>No Saved Shows</li>';
    } else {
        document.getElementById('show-list').innerHTML = null;

        for (l of list) {
            if (l[2] === days[dayNum]) {
                var time = l[3].split(":");
                var hours = Number(time[0]);
                var minutes = Number(time[1]);
                var period = "am";

                if (hours === 0) {
                    hours = 12;
                } else if (hours === 12) {
                    period = "pm";
                } else if (hours > 12) {
                    hours = hours - 12;
                    period = "pm";
                }

                if (minutes < 10) {
                    minutes = '0' + minutes;
                }

                var episode = await checkLatestEpisode(l[0], (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ((date.getDate() + dayIndex) < 10 ? '0' + (date.getDate() + dayIndex) : (date.getDate() + dayIndex))))

                if (l[4] === "#") {
                    shwList.innerHTML += '<li>' + '<p>' + (hours + ':' + minutes + ' ' + period) + ' - ' + l[1] + '</p>' + '<br/>Season ' + episode[0] + ' - Episode ' + episode[1] + '</li>';
                } else {
                    shwList.innerHTML += '<li>' + '<p>' + (hours + ':' + minutes + ' ' + period) + ' - ' + l[1] + '</p>' + '<a href="' + l[4] + '" target="_blank"></a><br/>Season ' + episode[0] + ' - Episode ' + episode[1] + '</li>';
                }
            }
        }

        if (shwList.innerHTML === "") {
            shwList.innerHTML = '<li>No New Episodes</li>';
        }
    }
}

async function checkLatestEpisode(id, date) {
    var latest = JSON.parse(localStorage.getItem("latestEpisodes"));

    if (!latest) {
        latest = [];
        localStorage.setItem("currentDate", new Date().toDateString());
        return await fetchLatestEpisode(id, date, latest);
    } else {
        var lastDate = localStorage.getItem("currentDate");

        if (lastDate === new Date().toDateString()) {
            for (i of latest) {
                if (i[0] === id) {
                    return [i[1], i[2]];
                }
            }
        }

        return await fetchLatestEpisode(id, date, latest);
    }
}

// TODO !! find another api to fetch episode data in case of empty returns
async function fetchLatestEpisode(id, date, latest) {
    try {
        const response = await fetch('https://api.tvmaze.com/shows/' + id + '/episodesbydate?date=' + date);
        const result = await response.json();

        if (response.status == 404) {
            throw new Error("Something went wrong!");
        }

        latest.push([id, result[0].season, result[0].number]);

        localStorage.setItem("latestEpisodes", JSON.stringify(latest));

        return [result[0].season, result[0].number];
    } catch (error) {
        console.log(error);

        latest.push([id, 'n/a', 'n/a']);
        localStorage.setItem("latestEpisodes", JSON.stringify(latest));

        return ['n/a', 'n/a'];
    }
}

//both functions below increment and decrement dayIndex to display different day of the week

document.getElementById("left-arrow").onclick = function () {
    if (dayIndex > 0) {
        dayIndex -= 1;

        if (dayNum != 0) {
            dayNum -= 1;
        } else {
            dayNum = 6;
        }

        getShows();
    }
}

document.getElementById("right-arrow").onclick = function () {
    if (dayIndex < 6) {
        dayIndex += 1;

        if (dayNum != 6) {
            dayNum += 1;
        } else {
            dayNum = 0;
        }

        getShows();
    }
}

