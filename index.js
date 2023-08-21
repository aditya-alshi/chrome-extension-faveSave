let myFavs = [];
const renList = document.getElementById("fav-list");
const fromTextbox = document.getElementById("input-el");
const saveFavorite = document.getElementById("save-fav");
const deleteAll = document.getElementById("delete-all");
const saveTabs = document.getElementById("save-tabs");

if(localStorage.getItem("myFavs")){
    myFavs = JSON.parse(localStorage.getItem("myFavs"));
    render(myFavs);
}


saveFavorite.addEventListener("click", function(){
    if(fromTextbox.value){
        myFavs.push(fromTextbox.value);
        fromTextbox.value = "";
        render(myFavs);
        localStorage.setItem("myFavs", JSON.stringify(myFavs));
    }
    
})

saveTabs.addEventListener("click",function(){
    
    chrome.tabs.query({active:true, currentWindow:true}, function(acTab){
        myFavs.push(acTab[0].url);
        render(myFavs);
        localStorage.setItem("myFavs", JSON.stringify(myFavs));
    })
    
})

deleteAll.addEventListener("dblclick", function(){
    localStorage.clear();
    myFavs = [];
    render(myFavs);
})

function render(favs){
    let fiString = ``;
    
    for(let e=0; e<favs.length; e++){
        fiString += `
            <li>
                <a href = "${favs[e]}" target = "_blank">${favs[e]}</a>
            </li>
        `;
    }
    renList.innerHTML = fiString;
}