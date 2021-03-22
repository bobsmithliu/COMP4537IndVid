const xhttp = new XMLHttpRequest();
function add(entry, author){
    
    let  quoteDiv = document.createElement("div");

    let quoteEntry = document.createElement("textarea");
    quoteEntry.className = "entry";
    quoteEntry.value = entry;

    let quoteAuthor = document.createElement("textarea");
    quoteAuthor.className = "author";
    quoteAuthor.value = author;

    quoteDiv.appendChild(quoteEntry);
    quoteDiv.appendChild(quoteAuthor);

    document.getElementById("quoteContainer").append(quoteDiv);
    
}
function load(){
    let readurl = "https://zichliu.com/readquote";
    xhttp.open("GET",readurl,true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        console.log("reading");
        console.log(xhttp.status);
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("quoteContainer").innerHTML = "";
            let collection = JSON.parse(this.responseText);
            if(collection.length == 0) {
                add("","");
            } else {
            for(i = 0; i < collection.length;i++) {
                add(collection[i]["quoteEntry"],collection[i]["quoteAuthor"]);
                }
            }
        }
    }
}


function loadOne(){
    const xhttp = new XMLHttpRequest();
    let readurl = "https://zichliu.com/studentreadquote/recent";
    xhttp.open("GET",readurl,true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        console.log("reading");
        console.log(xhttp.status);
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let collection = JSON.parse(this.responseText);
            console.log("Recent");
            document.getElementById("quoteContainer").innerHTML = "";
            add(collection[0]["quoteEntry"],collection[0]["quoteAuthor"]);
        }
    }
}