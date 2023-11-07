//displays all shows from personal list
function myShowList() {
    var list = JSON.parse(localStorage.getItem("myShows"));;
    var num = 1;

    if (!list || !list.length) {
        document.getElementById("saved-shows").innerHTML = '<li>No saved shows</li>';
    } else {
        document.getElementById("saved-shows").innerHTML = '';

        //creates elements for show details and options
        for (i of list) {
            var item = document.createElement("li");
            var btn = document.createElement("button");
            var opt = document.createElement("span");
            var inp = document.createElement("input");
            var del = document.createElement("button");

            item.textContent = i[1];
            btn.name = i[0];

            opt.id = i[0];
            opt.style.width = "100%";
            opt.style.display = "none";
            opt.style.paddingTop = "7px";
            opt.style.margin = "auto";
            opt.style.alignItems = "center";
            opt.style.justifyContent = "center";

            inp.type = "text";
            inp.name = i[0];

            //checks if user saved a link for the show
            if (i[4] === "#") {
                inp.placeholder = "Watch link... (Enter to save)";
            } else {
                inp.value = i[4];
            }

            inp.style.width = "90%";
            inp.style.padding = "5px";
            inp.style.border = "1px solid lightgray";
            inp.style.outline = "1px solid black";

            del.name = i[0];
            del.style.marginLeft = "25px";
            del.style.padding = "0";
            del.style.background = "url('/icons/trash.svg') no-repeat center center / cover";

            btn.addEventListener("click", function (event) { showOptions(event) });
            inp.addEventListener("keypress", function (event) { showLink(event) });
            del.addEventListener("click", function (event) { removeShow(event) });
            opt.appendChild(inp);
            opt.appendChild(del);
            item.appendChild(btn);
            item.appendChild(opt);

            document.getElementById("saved-shows").appendChild(item);

            num++;
        }
    }
}

//displays options for each show in list  
function showOptions(event) {
    event.preventDefault();

    var bck = document.getElementById(event.target.name);

    if (bck.style.display == "none") {
        bck.style.display = "flex";
    } else {
        bck.style.display = "none";
    }
}

//stores link inputted from user within personal list
function showLink(event) {
    if (event.key === "Enter" && event.target.value != "") {
        var list = JSON.parse(localStorage.getItem("myShows"));

        for (l of list) {
            if (l[0] === event.target.name) {
                l[4] = event.target.value;
                break;
            }
        }

        localStorage.setItem("myShows", JSON.stringify(list));
        showOptions(event);
    }
}

//removes show from user's personal list
function removeShow(event) {
    event.preventDefault();

    var list = JSON.parse(localStorage.getItem("myShows"));
    var episodes = JSON.parse(localStorage.getItem("latestEpisodes"));

    if (list) {
        for (l of list) {
            if (l[0] === event.target.name) {
                list.splice(list.indexOf(l), 1);
            }
        }

        localStorage.setItem("myShows", JSON.stringify(list));
    }

    if (episodes) {
        for (e of episodes) {
            if (e[0] === event.target.name) {
                episodes.splice(episodes.indexOf(e), 1);
            }
        }

        localStorage.setItem("latestEpisodes", JSON.stringify(episodes));
    }

    myShowList();
}
