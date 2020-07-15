//grab all
const body = document.querySelector("body")
const input = document.querySelector(".inputsection input");
const button = document.querySelector(".inputsection button");
const displaysection = document.querySelector(".displaysection");
const errordisplay = document.querySelector("#error");
const select = document.querySelector(".select");
const darkmode = document.querySelector(".darkmode");
const heading = document.querySelector(".heading");
let notesarray = [];
const checked = [];
let todos = [];
let id = 22;

//class
class notes {
    constructor(name, checked) {
        this.name = name;
        this.checked = false;
        id++;
        this.id= id;
    }
}

//initialdisplay

errordisplay.style.display = "none";

//alleventlisteners
button.addEventListener("click", checkifempty);
displaysection.addEventListener("click", deletedorcompleted);
select.addEventListener("change", selectchange);
document.addEventListener("DOMContentLoaded", loadfromlocalstorage);
darkmode.addEventListener('click',darkmodefunction);
//
//all functions
//

//fn --- check if empty or not
function checkifempty() {
    if (input.value.length === 0) {
        errordisplay.style.display = "block"
        errordisplay.innerHTML = `<div>please enter valid input </div>`;
        setTimeout(() => {
            errordisplay.firstElementChild.remove();
        }, 1500);
    }
    else {

        var note = new notes(`${input.value}`, false);
        notesarray.push(note);
       
        pushtodo(note);
        createblockquote(notesarray);
    }

}
//fn --- create blockquote and display
function createblockquote(notesarraydummy) {
    //create block display code
    const div = document.createElement("div");

    let list = notesarraydummy;
    list.forEach((note) => {
        div.innerHTML = `<h2>${note.name}<span class="noteid" style="display:none" >${note.id}<span></h2>
        <div class="icons">
        <i class="fas fa-check-circle completed"></i>
        <i class="fas fa-trash trash"></i>
        <div>
        `;

        div.classList.add("contentsection");
        displaysection.prepend(div);
        input.value = "";
    })
}
//fn --- delete and completed
function deletedorcompleted(e) {
    //completed check
    if (e.target.classList[2] === "completed") {
        e.target.parentElement.parentElement.classList.toggle("checked");
  
        if (e.target.parentElement.parentElement.classList[1] === "checked") {
            let defaultheight = 65;
            let fullheight = e.target.parentElement.parentElement.parentElement.lastElementChild.getBoundingClientRect().top;

            let height = e.target.parentElement.parentElement.parentElement.clientHeight;
            if (height > 130 && e.target.parentElement.parentElement.nextElementSibling !== null) {
                e.target.parentElement.parentElement.style.transform = `translateY(${fullheight + defaultheight * 1.5 - e.clientY}px)`;
            }
            setTimeout(() => {
                displaysection.appendChild(e.target.parentElement.parentElement);
                e.target.parentElement.parentElement.style.transform = `translateY(${0}px)`;
            }, 500)

        }
        const noteid = document.querySelector(".noteid")
        console.log(noteid.textContent);
       
    }
    //delete check
    if (e.target.classList[2] === "trash") {
        e.target.parentElement.parentElement.classList.add("deletedanimation");
        let deletedid = e.target.parentElement.previousElementSibling.querySelector(".noteid").textContent; 
        deletetodo(deletedid);
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 400)
    }
}
//fn ---listen to select change
function selectchange(e) {
    const children = displaysection.children;

    if (e.target.value === "all") {
        if (checked.length !== 0) {
            checked[0].style.marginTop = "0rem";
        }

        Array.from(children).forEach((child) => {
            // child.style.display = "none";
            child.style.display = "flex";

        })
    }
    else if (e.target.value === "checked") {
        {


            Array.from(children).forEach((child) => {
                if (child.classList[1] === "checked") {
                    child.style.display = "flex";
                    checked.push(child);
                }
                else {
                    child.style.display = "none";
                }
            })
            if (checked.length !== 0) {
                checked[0].style.marginTop = "1.7rem";
            }


        }

    }
    else if (e.target.value === "unchecked") {
        Array.from(children).forEach((child) => {
            // child.style.display = "none"
            if (child.classList[1] === "checked") {
                child.style.display = "none"
            }
            else {
                child.style.display = "flex";
            }
        })
    }
}
//fn ---localstorage

//fetch content from local storage
function gettodo() {

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

}
//push in local storage
function pushtodo(todo) {
    gettodo();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
//delete from local storage
function deletetodo(id){
    gettodo();
    todos.forEach((todo,index) =>{
        if(id == todo.id){
     todos.splice(index,1)
        }  
    } )
    localStorage.setItem("todos", JSON.stringify(todos));

}

// fn ---load from local storage when page relaods
function loadfromlocalstorage() {
    gettodo();

    DOMloaded(todos)
}
//loading when page loads
function DOMloaded(todos) {
    //create block display code
    console.log(todos);
    todos.forEach((note) => {
        let div = document.createElement("div");
        div.innerHTML = `<h2>${note.name}<span class="noteid" style="display:none">${note.id}<span></h2>
        <div class="icons">
        <i class="fas fa-check-circle completed"></i>
        <i class="fas fa-trash trash"></i>
        <div>
        `;
        div.classList.add("contentsection");
        displaysection.prepend(div);
        updateidvalue(note.id);
    })
}
//update value of id after loadimg from localstorage
function updateidvalue(idvalue){
    id = idvalue;
}
//when checked update in array
function updatechecked(id){
notesarray.forEach((note)=>{
if(id == note.id){
    console.log(note);
}
})
}
//darkmode
function darkmodefunction(){

    body.classList.toggle("darkmodeactivatedbody")
    heading.classList.toggle("darkmodeactivatedheading")

    if(body.classList[0] === "darkmodeactivatedbody"){
        darkmode.innerHTML = `<i class="fas fa-sun"></i>`
    }
    else{
        darkmode.innerHTML = `<i class="fas fa-moon"></i>`
    }
}
// localStorage.clear();
