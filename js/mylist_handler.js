//displays all shows from personal list
function myShowList() {
    var list = JSON.parse(localStorage.getItem("myShows"));;
    var num = 1;
  
    if(!list || !list.length){
      document.getElementById("saved-shows").innerHTML = '<li>No saved shows</li>';
    } else {
      document.getElementById("saved-shows").innerHTML = '';
  
      //creates elements for show details and options
      for(i of list){
        var res = document.createElement("li");
        var btn = document.createElement("button");
        var opt = document.createElement("span");
        var del = document.createElement("button");
        var inp = document.createElement("input");
  
        res.textContent = i[0];
        btn.name = i[0]+num;
  
        opt.id = i[0]+num;
        opt.style.display = "none";
        opt.style.paddingTop = "7px";
        opt.style.margin = "auto";
        opt.style.alignItems = "center";
        opt.style.justifyContent = "center";
  
        inp.name = i[0]+num;
        inp.type = "text";
        
        //checks if user saved a link for the show
        if(i[1] === "#"){
          inp.placeholder = "Watch link... (Enter to save)";
        } else {
          inp.value = i[1];
        }
        
        inp.name = i[0];
        inp.style.width = "80%";
        inp.style.padding = "5px";
        inp.style.border = "1px solid lightgray";
        inp.style.outline = "1px solid black";
  
        del.name = i[0]+num;
        del.style.marginLeft = "30px";
        del.style.padding = "0";
        del.style.background = "url('/icons/trash.svg') no-repeat center center / cover";
  
        btn.addEventListener("click", function(event){showOptions(event)});
        inp.addEventListener("keypress", function(event){showLink(event)});
        del.addEventListener("click", function(event){removeShow(event)});
        opt.appendChild(inp);
        opt.appendChild(del);
        res.appendChild(btn);
        res.appendChild(opt);
  
        document.getElementById("saved-shows").appendChild(res);
  
        num++;
      }
    }
}

//displays options for each show in list  
function showOptions(event){
    event.preventDefault();
  
    var name = event.target.name;
    var bck = document.getElementById(name);
  
    if(bck.style.display == "none"){
      bck.style.display = "flex";
    } else {
      bck.style.display = "none";
    }
}
  
//stores link inputted from user within personal list
function showLink(event){
    if(event.key === "Enter" && event.target.value != ""){
      var name = event.target.name;
      var list = JSON.parse(localStorage.getItem("myShows"));
  
      for(l of list){
        if(l[0].includes(name)){
          l[1] = event.target.value;
          break;
        }
      }
  
      localStorage.setItem("myShows", JSON.stringify(list));
    }
}

//removes show from user's personal list
function removeShow(event){
    event.preventDefault();
  
    var name = event.target.name.slice(0, -1);
    var list = JSON.parse(localStorage.getItem("myShows"));
    
    if(list === undefined){
      list = [];
    }
  
    for(l of list){
      if(l[0].includes(name)){
        list.splice(list.indexOf(l), 1);
      }
    }
    
    localStorage.setItem("myShows", JSON.stringify(list));
  
    myShowList();
}
  