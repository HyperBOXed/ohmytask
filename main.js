var dd = document.querySelectorAll(".dropdown-container");
dd.forEach(list => {
    for (var i=0; i<list.querySelectorAll(".dropdown .cont .option").length; i++) {
        if (list.querySelector(".dropdown .upper").getAttribute("chosenOption")==i) {
            list.querySelector(".dropdown .upper").setAttribute("chosenOption",i);
            list.querySelector(".dropdown .upper p").innerHTML=list.querySelectorAll(".dropdown .cont .option")[i].innerText;
        }
    }
});
window.addEventListener("click",(ev)=>{
    var dd = document.querySelectorAll(".dropdown-container");
    dd.forEach(list => {
        if (ev.target!==list.querySelector(".dropdown .upper")&&ev.target!==list.querySelector(".dropdown .upper p")) {
            list.querySelector(".dropdown .cont").classList.add("hidden");
            list.querySelectorAll(".dropdown .cont .option").forEach(element => {
                if (ev.target==element) {
                    list.querySelector(".dropdown .upper").setAttribute("chosenOption",element.getAttribute("id"));
                    list.querySelector(".dropdown .upper p").innerHTML=element.innerText;
                }
            });
        }else{
            list.querySelector(".dropdown .cont").classList.toggle("hidden");
        }
    });
});