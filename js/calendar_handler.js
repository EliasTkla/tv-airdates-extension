var currentPage = "calendar";
var dayIndex = 0;
var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
var dayNum = date.getDay();

// switches page content according to toggle icon
document.getElementById("toggle-page").onclick = function(){
  if(currentPage === "calendar"){
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
    dayNum = date.getDay();
    getShows();
  }
}

// called to set all show information within calendar
function getShows() {
    var shows = JSON.parse(localStorage.getItem("weekShows"));

    if(shows != null){
      var date1 = shows[dayIndex].date
      var weekDay = days[dayNum];
      console.log(weekDay);
      var month = months[Number(date1.slice(4, 6))-1];
      var day = date1.slice(6, 8)
      var list = JSON.parse(localStorage.getItem("myShows"));
    
      document.getElementById("calendar-date").innerHTML = "";
      document.getElementById("calendar-date").innerHTML += weekDay+' '+month+' '+day;
        
      document.getElementById('show-list').innerHTML = "";
    
      var shwList = document.getElementById('show-list');
      var empty = true;

      for(show of shows[dayIndex].shows){
        //if user has no personal list, display all airing shows
        if(list === null || !list.length){
          shwList.innerHTML += '<li>'+show.name+'<br/>Season '+show.saison+' - Episode '+show.episode+'</li>';
        } else {
          for(l of list){
            if(l[0].includes(show.name)){
              empty = false;
              if(l[1] === "#"){
                shwList.innerHTML += '<li>'+show.name+'<br/>Season '+show.saison+' - Episode '+show.episode+'</li>';
              } else {
                shwList.innerHTML += '<li>'+show.name+'<a href="'+l[1]+'" target="_blank"></a><br/>Season '+show.saison+' - Episode '+show.episode+'</li>';
              }
            }
          }
        }
      }

      //if no shows air on a day
      if(empty){
        shwList.innerHTML += '<li>No New Episodes</li>';
      }
    }
  }

  //both functions below increment and decrement dayIndex to display different day of the week

  document.getElementById("left-arrow").onclick = function(){
    if(dayIndex > 0){
      dayIndex -= 1;

      if(dayNum != 0){
        dayNum -= 1;
      } else {
        dayNum = 6;
      }
      
      getShows();
    }
  }
  
  document.getElementById("right-arrow").onclick = function(){
    if(dayIndex < 6){
      dayIndex += 1;

      if(dayNum != 6){
        dayNum += 1;
      } else {
        dayNum = 0;
      }

      getShows();
    }
  }

  