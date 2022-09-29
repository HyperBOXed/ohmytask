var drag = false;
var currentelem = undefined;
var IDs = [];
tippy('#ne-1', {
    content: 'Create a new note',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-2', {
    content: 'Tooltip',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-3', {
    content: 'Tooltip',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-4', {
    content: 'Tooltip',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-5', {
    content: 'Tooltip',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#si1', {
    content: 'Profile',
    animation: 'perspective',
    theme: 'theme1',
    placement: 'right'
});
tippy('#si2', {
    content: 'Menu',
    animation: 'perspective',
    theme: 'theme1',
    placement: 'right'
});
tippy('#si3', {
    content: 'Settings',
    animation: 'perspective',
    theme: 'theme1',
    placement: 'right'
});
tippy('#si4', {
    content: 'Leave',
    animation: 'perspective',
    theme: 'theme1',
    placement: 'right'
});
var today = new Date();
//Create a new note
document.getElementById("ne-1").addEventListener("click",(ev)=>{
    document.querySelector(".workspace").insertAdjacentHTML("afterbegin",`
    <div class="omt-wp_note" editable>
    <div id="dragger"></div>
    <br>
    <input type="text" placeholder="Title">
    <br>
    <textarea placeholder="Note description"></textarea>
    <br>
    <label>Beginning date</label>
    <br>
    <input type="date" name="date-start">
    <br>
    <label for="date-end">Ending date</label>
    <br>
    <input type="date" name="date-end">
    <br>
    <input type="button" value="Done">
    <br>
    <br>
    <p>Created on ${today.getDate()+"."+today.getMonth()+"."+today.getFullYear()} at ${today.getHours()+":"+(today.getMinutes()<10 ? "0" : "")+today.getMinutes()}</p>
    </div>
    `);
    dragInit(document.querySelector(".omt-wp_note"));
});
function dragInit(targetelem) {
//Make the DIV element draggagle:
dragElement(targetelem);
}
function dragElement(elmnt) {
    elmnt.eID = document.querySelectorAll(".omt-wp_note").length;
    IDs.push(elmnt.eID);
    currentelem = elmnt;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "dragger")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "dragger").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
        pos1 = pos3 - e.clientX + 10;
        pos3 = e.clientX;
        pos2 = pos4 - e.clientY + 40;
        pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.zIndex = "999";
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement(e) {
        let par = e.target.parentElement;
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      if (par != null) {
        par.style.zIndex = par.eID;
        if (currentelem.offsetLeft - pos1 <= 0) {
          currentelem.style.left = 0+"px";
          }
          if (currentelem.offsetTop - pos2 <= 0) {
            currentelem.style.top = 0+"px";
          }
      }else{
        currentelem.style.zIndex = currentelem.eID;
        if (currentelem.offsetTop - pos2 <= 0) {
          currentelem.style.top = 0+"px";
        }
        if (currentelem.offsetLeft - pos1 <= 0) {
          currentelem.style.left = 0+"px";
        }
      }
    }
  }