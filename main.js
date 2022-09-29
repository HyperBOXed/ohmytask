for (var i=0; i<document.querySelectorAll(".dropdown-container .dropdown .cont .option").length; i++) {
    if (document.querySelector(".dropdown-container .dropdown .upper").getAttribute("chosenOption")==i) {
        document.querySelector(".dropdown-container .dropdown .upper").setAttribute("chosenOption",i);
        document.querySelector(".dropdown-container .dropdown .upper p").innerHTML=document.querySelectorAll(".dropdown-container .dropdown .cont .option")[i].innerText;
    }
}
window.addEventListener("click",(ev)=>{
    if (ev.target!==document.querySelector(".dropdown-container .dropdown .upper")&&ev.target!==document.querySelector(".dropdown-container .dropdown .upper p")) {
        document.querySelector(".dropdown-container .dropdown .cont").classList.add("hidden");
        document.querySelectorAll(".dropdown-container .dropdown .cont .option").forEach(element => {
            if (ev.target==element) {
                document.querySelector(".dropdown-container .dropdown .upper").setAttribute("chosenOption",element.getAttribute("id"));
                document.querySelector(".dropdown-container .dropdown .upper p").innerHTML=element.innerText;
            }
        });
    }else{
        document.querySelector(".dropdown-container .dropdown .cont").classList.toggle("hidden");
    }
});