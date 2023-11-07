var input = document.getElementById("searchbar");

//listener checks input change to update results list
input.addEventListener("change", async function () {
    var query = input.value;

    if (query === "") {
        document.getElementById("result-container").style.display = "none";
        document.getElementById("clear-search").style.display = "none";
    } else {
        // var shows = JSON.parse(localStorage.getItem("weekShows"));
        var shows = await fetchSearch(query);
        var list = JSON.parse(localStorage.getItem("myShows"));

        document.getElementById("result-container").style.display = "block";
        document.getElementById("clear-search").style.display = "block";

        document.getElementById("search-results").innerHTML = '';

        //checks lists length to determine if any matches are found
        if (!shows.length) {
            document.getElementById("search-results").innerHTML += '<li>No results</li>';
        } else {
            var item;
            var btn;

            //creates elements and adds them to the results list
            for (s of shows) {
                item = document.createElement("li");
                item.textContent = s.name;

                btn = document.createElement("button");
                btn.id = s.name;
                btn.name = s.id + '/' + s.schedule.days + '/' + s.schedule.time;
                btn.addEventListener("click", function (event) { saveShow(event) });

                item.appendChild(btn);

                document.getElementById("search-results").appendChild(item);

                //checks if any show was already saved and changes icon to clarify
                if (list) {
                    for (l of list) {
                        if (l[1] === s.name) {
                            btn.style.background = "url('/icons/check.svg') no-repeat center center / cover";
                            break;
                        }
                    }
                }
            }
        }
    }
});

//clears search and hides result list
document.getElementById("clear-search").onclick = function () {
    document.getElementById("result-container").style.display = "none";
    document.getElementById("clear-search").style.display = "none";
    input.value = "";
}

//saves show to user's personal list
function saveShow(event, data) {
    event.preventDefault();

    var data = event.target.name.split('/');
    var bck = document.getElementById(event.target.id);
    var list = JSON.parse(localStorage.getItem("myShows"));

    if (!list) {
        list = [];
        var shw = [data[0], event.target.id, data[1], data[2], "#"];
        list.push(shw);

        localStorage.setItem("myShows", JSON.stringify(list));
        bck.style.background = "url('/icons/check.svg') no-repeat center center / cover";
    } else {
        var shw = [data[0], event.target.id, data[1], data[2], "#"];

        var check = list.some(item => item[0] === shw[0]);

        if (!check) {
            list.push(shw);

            localStorage.setItem("myShows", JSON.stringify(list));
            bck.style.background = "url('/icons/check.svg') no-repeat center center / cover";
        }
    }

    myShowList();
}

async function fetchSearch(query) {
    try {
        const response = await fetch('https://api.tvmaze.com/search/shows?q=' + query);
        const result = await response.json();
        var running = [];

        for (s of result) {
            if (s.show.status == "Running" && s.show.schedule.days != '') {
                running.push(s.show);
            }
        }

        return running;
    } catch (error) {
        console.error(error);
        return null;
    }
}