//grab all
const input = document.querySelector(".inputsection input");
const button = document.querySelector(".inputsection button");
const displaysection = document.querySelector(".displaysection");
const errordisplay = document.querySelector("#error");
const select = document.querySelector(".select");
let notesarray = [];

//class
class notes {
    constructor(name, checked) {
        this.name = name;
        this.checked = false;
    }
}

//initialdisplay

errordisplay.style.display = "none";

//alleventlisteners
button.addEventListener("click", checkifempty);
displaysection.addEventListener("click", deletedorcompleted);
select.addEventListener("change", selectchange);
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
    else
        createblockquote();
}
//fn --- create blockquote and display
function createblockquote() {
    //create block display code
    const div = document.createElement("div");
    div.innerHTML = `<h2>${input.value}</h2>
    <div class="icons">
    <i class="fas fa-check-circle completed"></i>
    <i class="fas fa-trash trash"></i>
    <div>
    `;
    div.classList.add("contentsection");
    displaysection.prepend(div);
    var note = new notes(`${input.value}`, false);
    notesarray.push(note);
    input.value = "";
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
    }
    //delete check
    if (e.target.classList[2] === "trash") {
        e.target.parentElement.parentElement.classList.add("deletedanimation");
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 400)
    }
}
//listen to select change
function selectchange(e) {
    if (e.target.value === "all") {

    }
    else if (e.target.value === "checked") {
        {

        }

    }
    else if (e.target.value === "unchecked") {

    }
}