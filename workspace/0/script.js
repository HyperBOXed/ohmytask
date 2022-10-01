var drag = false;
var currentelem = undefined;
var IDs = [];
tippy('#ne-1', {
    content: 'Default Note',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-2', {
    content: 'Table Note',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-3', {
  content: 'Card Group',
  animation: 'perspective',
  theme: 'theme1'
});
tippy('#ne-4', {
  content: 'Square Group',
  animation: 'perspective',
  theme: 'theme1'
});
tippy('#ne-5', {
    content: 'Progress Note',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-6', {
    content: 'Quadratic Graph Note',
    animation: 'perspective',
    theme: 'theme1'
});
tippy('#ne-7', {
    content: 'Delayed Note',
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
tippy('#dd_more', {
    content: 'More',
    animation: 'perspective',
    theme: 'theme1',
    placement: 'right'
});
var today = new Date();
//Create a new note
document.getElementById("ne-1").addEventListener("click",(ev)=>{
  //console.log(`${today.getFullYear()}-${((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))}-${(today.getDate()<10?"0"+today.getDate():today.getDate())}`)
    document.querySelector(".workspace").insertAdjacentHTML("afterbegin",`
    <div class="omt-wp_note" editable>
    <div class="inliner">
    <div id="cross"></div>
    <div id="dragger"></div>
    <div class="dropdown-container">
      <div class="dropdown">
        <div class="content-container">
            <div class="cont hidden" style="width: 158px;">
              <div class="option" id="0"><img class="ddc-opt-LangIco" src="../../img/OhMyTask_PNGs_ICOs/PNGs/ico_pin.png" draggable="false">Pin</div>
                  <div class="option" id="1"><img class="ddc-opt-LangIco" src="../../img/OhMyTask_PNGs_ICOs/PNGs/ico_edit.png" draggable="false">Edit</div>
                  <div class="option" id="3"><img class="ddc-opt-LangIco" src="../../img/OhMyTask_PNGs_ICOs/PNGs/ico_minimize.png" draggable="false">Minimize</div>
              </div>
              </div>
              <div class="upper upper2"  id="dd_more" chosenOption="0" style="color: #000;">
              <p></p>
          </div>
      </div>
    </div>
    </div>
    <br id="input">
    <input type="text" id="input" class="inp-title" placeholder="Title">
    <br id="input">
    <textarea id="input" class="inp-desc" placeholder="Do the washing up..."></textarea>
    <br id="input">
    <label id="input">Beginning date</label>
    <br id="input">
    <input type="date" min="${today.getFullYear()}-${((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))}-${(today.getDate()<10?"0"+today.getDate():today.getDate())}" class="inp-date0" id="input" name="date-start">
    <br id="input">
    <label id="input">Ending date</label>
    <br id="input">
    <input type="date" class="inp-date1" min="${today.getFullYear()}-${((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))}-${(today.getDate()<10?"0"+today.getDate():today.getDate())}" id="input" name="date-end">
    <br id="input">
    <input type="button" id="edit-done" value="Done">
    <br id="input">
    <br>
    <div class="contain">
    <br>
    <p id="nc-date">Created on ${today.getDate()+"."+today.getMonth()+"."+today.getFullYear()} at ${today.getHours()+":"+(today.getMinutes()<10 ? "0" : "")+today.getMinutes()}</p>
    </div>
    </div>
    `);
    dragInit(document.querySelector(".omt-wp_note"));
});
function dragInit(targetelem) {
//Make the DIV element draggagle:
dragElement(targetelem);
targetelem.querySelector("#cross").onmouseup = removeElement;
targetelem.querySelector("#edit-done").onmouseup = stopEditing;
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
      currentelem = e.target.parentElement;
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
      document.querySelectorAll(".omt-wp_note").forEach(elem => {
        if (elem != elmnt) {
          elem.style.zIndex = elem.eID;
        }
        
      });
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement(e) {
        let par = e.target.parentElement;
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
        if (currentelem.parentElement.offsetTop - pos2 <= 0) {
          currentelem.parentElement.style.top = 0+"px";
        }
        if (currentelem.parentElement.offsetLeft - pos1 <= 0) {
          currentelem.parentElement.style.left = 0+"px";
        }
      /*if (par != null) {
        console.log(par);
        par.style.zIndex = par.eID;
        if (par.offsetLeft - pos1 <= 0) {
          par.style.left = 0+"px";
          }
          if (par.offsetTop - pos2 <= 0) {
            par.style.top = 0+"px";
          }
      }else{
        console.log(currentelem);
        currentelem.style.zIndex = currentelem.eID;
        if (currentelem.offsetTop - pos2 <= 0) {
          currentelem.style.top = 0+"px";
        }
        if (currentelem.offsetLeft - pos1 <= 0) {
          currentelem.style.left = 0+"px";
        }
      }*/
    }
  }
function removeElement(e) {
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
}
function stopEditing(e) {
  let date0 = e.target.parentElement.querySelector(".inp-date0");
  let date1 = e.target.parentElement.querySelector(".inp-date1");
  if (date1.value.toString() != "" && date0.value.toString() != "") {
    if (parseInt(date0.value.replace(/\D/g, "")) > parseInt(date1.value.replace(/\D/g, ""))) {
      date0.focus();
      return;
    }
  }
  if (date1.value.toString() != "" && date0.value.toString() == "") {
    date0.focus();
    return;
  }
  if (date0.value.toString() != "" && date1.value.toString() == "") {
    date1.focus();
    return;
  }
  if (date0.value.toString() == "" && date1.value.toString() == "") {
    date0.focus();
    return;
  }
  e.target.parentElement.toggleAttribute("editable");
  let title = e.target.parentElement.querySelector(".inp-title").value;
  let desc = e.target.parentElement.querySelector(".inp-desc").value.replace(/\n\r?/g, '<br />');
  
  console.log(date0);
  if (e.target.parentElement.getAttribute("editable") == null) {
    document.querySelectorAll("#input").forEach(elem => {
      e.target.parentElement.querySelector("#nc-date").innerHTML = "<span id='nonselect'>🕓</span>"+date0.value+"<br>     "+date1.value;
      e.target.parentElement.removeChild(elem);
    });
    e.target.parentElement.querySelector(".contain").insertAdjacentHTML("afterbegin",'<p id="pst_0" style="">'+'<span id="nonselect">👉</span>'+title+'</p>'+'<fieldset id="nc-desc"><legend><span id="nonselect">📝</span></legend><div id="nc-fs-cont"><p id="pst_1">'+desc+'</p></div></fieldset>'+'');
    e.target.parentElement.removeChild(document.querySelector("#edit-done"));
  }else{

  }
}