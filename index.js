import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

initializeApp
const appSettings = {
  databaseURL: "https://endorsementapp-e0256-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endrosmentsInDb = ref(database, "endorsments")


//Inputs
const EndorsmentEL = document.querySelector("#MaininputEl")
const InputFromEl = document.querySelector("#InputFrom")
const InputToEl = document.querySelector("#InputTo")


//displays
const EndrosementSection = document.querySelector("#EndorsmentsSection")

//Buttons
const PublishBtnEl = document.querySelector("#PublishBtnEL")

//getting data
let Endorsment = EndorsmentEL.value
let From = InputFromEl.value
let To = InputToEl.value

//packing data

let EndorsementObject = {
                            from: "",
                            to: "",
                            Endorsement: "",
                            likes: 0
                        }



// where magics happens

onValue(endrosmentsInDb, function(snapshot) {
  let itemsArray = Object.entries(snapshot.val())
  if (snapshot.exists()) {
    EndrosementSection.innerHTML = ""
    for (let i = 0; i < itemsArray.length; i++) {
          const currentItem = itemsArray[i]
          const currentEndorsmentObj = currentItem[1]
          const ItemID = currentItem[0]
          const likesInDb = ref(database, `endorsments/${ItemID}`)
          
          EndrosementSection.innerHTML +=`        
          <div id="EndorsementsContainer">
            <h3 id="TxtToEl"> To ${currentEndorsmentObj.to} </h3>
            <p>
            ${currentEndorsmentObj.Endorsement} 
            </p>
            <span class="likesection">
                <h3 id="TxtFromEl">From ${currentEndorsmentObj.from} </h3>
                <button class="likeBTn" id="likeBtnEl">🥰 <span id="likeCountEl">${currentEndorsmentObj.like} </span></button>
            </span>
      </div>`
      const likeBTn = document.querySelector("#likeBtnEl")
      const likeCount = document.querySelector("#likeCountEl")
      likeBTn.addEventListener("click",function(){ // doesn't work yet

        let isLiked = false
          if(!isLiked){

            isLiked = true

          }else{
            isLiked = false
          }
          likeCount.textContent = item.likes;
      })
      } 
  } else {
    EndrosementSection.innerText += "Tsisy lty ah, tsisy 🥺"
  }

  
})


EndorsmentEL.addEventListener('input', () => autoResize(EndorsmentEL));

PublishBtnEl.addEventListener("click", function(){
 
    EndorsementObject = {
    from: InputFromEl.value,
    to: InputToEl.value,
    Endorsement: EndorsmentEL.value,
    like: 0
}
push(endrosmentsInDb, EndorsementObject)
clear(EndorsmentEL, InputFromEl, InputToEl)
})



//functions
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

function clear(Input1, Input2, Input3){
  Input1.value = ""
  Input2.value = ""
  Input3.value = ""
}