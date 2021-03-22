var quoteNum = 1;
var collectionLength = 1;
var lstID = 0;
function Quote (quote,author){
    this.quote = quote;
    this.author = author;
}

function load(){
    const xhttp = new XMLHttpRequest();
    let readurl = "https://zichliu.com/readquote";
    xhttp.open("GET",readurl,true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("reading");
            console.log(xhttp.status);
            let collection = JSON.parse(this.responseText);
            if(collection.length == 0) {
                add(1,"","");
            } else {
                collectionLength = collection.length;
            for(i = 0; i < collection.length;i++) {
                add(collection[i]["quoteID"],collection[i]["quoteEntry"],collection[i]["quoteAuthor"]);
                }
            }
        }
    }
}

function backBtnClick(){
    window.location.href = './home.html'
}
document.getElementById("backBtn").onclick = backBtnClick; 

//quote add

function checkNew() {

    let newEntry = this.parentNode.childNodes[0].value;
    let newauthor = this.parentNode.childNodes[1].value;
    let chID = this.parentNode.id;
    let isNew = true;

    let currentLength = document.getElementById("quoteContainer").childNodes.length - 1;
    console.log(currentLength);

            if(collectionLength == currentLength) {
               isNew = false;
            } else {
            isNew = true;
            }
        

    if (!isNew) {
        update(chID,newEntry,newauthor);
        
    } else {
        write(newEntry,newauthor);
    }
}

function write(entry,author) {
    const xhttp = new XMLHttpRequest();
    let writeurl = "https://zichliu.com/writequote/?quote="

    let authorConnect = "&author=";
    xhttp.open("POST", writeurl + entry + authorConnect + author, true );
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("Inserted!");
        }
    }
}
function update(id,entry,author){
    const xhttp = new XMLHttpRequest();
    let updatedurl = "https://zichliu.com/updatequote/?id=";
    let entryConnect = "&entry=";
    let authorConnect = "&author=";
    xhttp.open("PUT", updatedurl + id + entryConnect + entry + authorConnect + author, true );
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("Updted");
        }
    }
}
function add(id,block, author){
    
    let  quoteDiv = document.createElement("div");
    quoteDiv.className = "quote";
    quoteDiv.id = id;

    let quoteEntry = document.createElement("textarea");
    quoteEntry.className = "entry";
    quoteEntry.value = block;

    let quoteAuthor = document.createElement("textarea");
    quoteAuthor.className = "author";
    quoteAuthor.value = author;

    let quoteDelete = document.createElement("button");
    quoteDelete.className = "delete";
    quoteDelete.innerText = "Delete";
    quoteDelete.onclick = del;

    let quoteUpdate = document.createElement("button");
    quoteUpdate.className = "update";
    quoteUpdate.innerText = "Update"
    quoteUpdate.onclick = checkNew;


    quoteDiv.appendChild(quoteEntry);
    quoteDiv.appendChild(quoteAuthor);
    quoteDiv.appendChild(quoteDelete);
    quoteDiv.appendChild(quoteUpdate);
    
    document.getElementById("quoteContainer").append(quoteDiv);
    quoteNum++;
    
}

function addClick(){
    // save();
    let quoteCollection = document.getElementById("quoteContainer");
    add("","");
}
document.getElementById("addBtn").onclick = addClick;


function del(){
    let quoteCollection = document.getElementById("quoteContainer");
    let quote = this.parentNode;
    const xhttp = new XMLHttpRequest();
    let deleteurl = "https://zichliu.com/deletequote/?id=";
    console.log(this.parentNode.id);
    var delID = this.parentNode.id;
    xhttp.open("DELETE", deleteurl + delID, true );
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("Deleted");
        }
    }
    quote.parentNode.removeChild(quote);
    console.log(quoteCollection.childNodes.length);
    quoteNum--;
    for(i = 1; i < quoteCollection.length; i++){
        quoteCollection.childNodes[i].id = i;
        console.log(quoteCollection.childNodes[i].id);
    }
    
}


load();