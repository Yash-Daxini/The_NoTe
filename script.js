shownotes();
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {
    let addtext = document.getElementById('addtext');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    let obj = {
        text : addtext.value,
        title : addtitle.value
    }
    notesarr.push(obj);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    addtext.value = "";
    addtitle.value = "";
    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    let html = "";
    notesarr.forEach(function (element, index) {
        html += `
        <div class="card my-4 mx-4 container notecard" style="width: 20rem;">
            <div class="card-body">
                <h3 class="card-title">${element.title}</h3>
                <p class="card-text cardtext">${element.text}</p>
                <button id="${index}" onclick="deletenote(this.id)" class="btn btn-outline-danger">Delete Note</button>
            </div>
        </div>`
});
    let notesElm = document.getElementById("notes");
    if (notesarr.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h3>Nothing to show! Use "Add a Note" section above to add notes.</h3>`;
    }
}

function deletenote(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }

    notesarr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    shownotes();
}

let search = document.getElementById('search');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let notecard = document.getElementsByClassName('notecard'); 
    // console.log(notecard);
    Array.from(notecard).forEach(function(element){
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        console.log(cardtext);
        if(cardtext.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        
    });
});

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 