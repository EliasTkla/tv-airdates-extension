var input = document.getElementById("searchbar");

//listener checks input change to update results list
input.addEventListener("change", function() {
  var query = input.value;

  if(query === ""){
    document.getElementById("result-container").style.display = "none";
    document.getElementById("clear-search").style.display = "none";
  } else {
    var shows = JSON.parse(localStorage.getItem("weekShows"));
    var list = JSON.parse(localStorage.getItem("myShows"));
    var results = [];

    document.getElementById("result-container").style.display = "block";
    document.getElementById("clear-search").style.display = "block";

    document.getElementById("search-results").innerHTML = '';

    // stores all show containing search input to new array
    for(day of shows){
      for(shows of day.shows){
        if (shows.name.toLowerCase().includes(query.toLowerCase()) && !results.includes(shows.name)){
          results.push(shows.name);
        }
      }
    }
    
    //checks lists length to determine if any matches are found
    if(!results.length){
      document.getElementById("search-results").innerHTML += '<li>No results</li>';
    } else {
      var res;
      var btn;

      //creates elements and adding them to the results list
      for(s of results){
        res = document.createElement("li");
        res.textContent = s;
        btn = document.createElement("button")  ;
        btn.id = s;
        btn.addEventListener("click", function(event){saveShow(event)});
        res.appendChild(btn);

        document.getElementById("search-results").appendChild(res);

        //checks if any show was already saved and changes icon to clarify
        for(l of list){
            if(l[0].includes(s)){
                btn.style.background = "url('/icons/check.svg') no-repeat center center / cover";  
                break;
            }
        }
      }
    }
  }
});

//clears search and hides result list
document.getElementById("clear-search").onclick = function(){
  document.getElementById("result-container").style.display = "none";
  document.getElementById("clear-search").style.display = "none";
  input.value = "";
}

//saves show to user's personal list
function saveShow(event){
    event.preventDefault();
  
    var name = event.target.id;
    var bck = document.getElementById(name);
    var list = JSON.parse(localStorage.getItem("myShows"));
  
    if(!list){
      list = [];
    }
  
    var safe = true;

    for(l of list){
        if(l[0].includes(name)){
            safe = false;
            break;
        }
    }

    if(safe){
        var shw = [name, "#"];
        list.push(shw);
  
        localStorage.setItem("myShows", JSON.stringify(list));
        bck.style.background = "url('/icons/check.svg') no-repeat center center / cover";
    }
  
    myShowList();
  }