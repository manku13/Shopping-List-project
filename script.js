const itemForm = document.getElementById("item-form")
const itemInput = document.getElementById("item-input")
const itemList = document.querySelector("#item-list")
const clearBtn = document.getElementById("clear")


function addItem(event) {
  event.preventDefault()

  const newItem = itemInput.value
  if (newItem === ""){
    alert ("Please add an item")
    return
  }

  const li = document.createElement("li")
  li.appendChild(document.createTextNode(newItem))

  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)
  itemList.appendChild(li)
  itemInput.value = ""
}

function createButton(classes){
  const button = document.createElement("button")
  button.className = classes
  const icon = createIcon("fa-solid fa-xmark")
  button.appendChild(icon)
  return button
}

function createIcon(classes){
  const icon = document.createElement("i")
  icon.className = classes
  return icon
}

function removeItem (event){
  if (event.target.parentElement.classList.contains("remove-items")){
    event.target.parentElement.parentElement.remove()
  }
}

function clearAll(){
  Array.from(itemList.children).forEach(child => {
  itemList.removeChild(child)
  });
}

// function clearAll() {
//   while (itemList.firstChild) {
//     itemList.removeChild(itemList.firstChild);
//   }
// }

itemForm.addEventListener("submit", addItem)

clearBtn.addEventListener("click", clearAll)