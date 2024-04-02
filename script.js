const itemForm = document.getElementById("item-form")
const itemInput = document.getElementById("item-input")
const itemList = document.querySelector("#item-list")
const clearBtn = document.getElementById("clear")
const filter = document.querySelector(".filter")
const filterInput = document.getElementById("filter")
const formBtn = itemForm.querySelector(".btn")
let isEditMode = false

function getItemsFromStorage(){
  let itemsFromStorage 

  if (localStorage.getItem('items') === null){
    itemsFromStorage = []
  }
  else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  return itemsFromStorage
}

function addItem(event) {
  event.preventDefault()

  const newItem = itemInput.value
  if (newItem === ""){
    alert ("Please add an item")
    return
  }

  if (isEditMode){
    const itemToEdit = itemList.querySelector(".edit-mode")
    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove("edit-mode")
    itemToEdit.remove()
    isEditMode = false
  }
  else{
    if (checkIfItemExists(newItem)){
      alert("That item already exists!")
      return
    }
  }
  addItemToDOM(newItem)
  addItemToLocalStorage(newItem)

  checkUI()

  itemInput.value = ""

}

function addItemToDOM(newItem){
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(newItem))

  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)
  itemList.appendChild(li)
}

function addItemToLocalStorage(newItem){
  let itemFromStorage = getItemsFromStorage()

  itemFromStorage.push(newItem)

  localStorage.setItem("items", JSON.stringify(itemFromStorage))
}

function displayItems(){
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach(item => addItemToDOM(item))
  checkUI()
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

function onClickItem(event){
  if (event.target.parentElement.classList.contains("remove-item")){
    removeItem(event.target.parentElement.parentElement)
  }
  else{
    setItemToEdit(event.target)
  }
}

function checkIfItemExists(item){
  const itemFromStorage = getItemsFromStorage()
  return itemFromStorage.includes(item)
}

function removeItem(item){
  if (confirm("Are you sure?")){
    item.remove()
    removeItemFromStorage(item.textContent)
    checkUI()
  }
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemsFromStorage()

  itemsFromStorage = itemsFromStorage.filter( i => i !== item)

  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
}


function clearAll(){
  Array.from(itemList.children).forEach(child => {
  itemList.removeChild(child)
  });

  localStorage.removeItem("items")
  // localStorage.clear()
  checkUI()
}

// function clearAll() {
//   while (itemList.firstChild) {
//     itemList.removeChild(itemList.firstChild);
//   }
// }

function setItemToEdit(item){
  isEditMode = true
  itemList.querySelectorAll("li").forEach(i => i.classList.remove('edit-mode'))

  item.classList.add("edit-mode")
  // const icon = createIcon("fa-solid fa-pen")
  // const textNode = document.createTextNode("Updat Item")
  // icon.appendChild(textNode)
  // const oldIcon = formBtn.querySelector("i")
  // oldIcon.remove()
  // formBtn.appendChild(icon)
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item'
  formBtn.style.backgroundColor = "#228B22"
  itemInput.value = item.textContent
}

function filterItems(event) {
  const items = itemList.querySelectorAll("li")
  const filterValue = event.target.value.toLowerCase()

  items.forEach(item => {
    const text = item.firstChild.textContent.toLowerCase()
    
    if (text.indexOf(filterValue) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}

function checkUI(){
  const items = itemList.querySelectorAll("li")

  if (items.length === 0){
    clearBtn.style.display = "none"
    filter.style.display = "none"
  }
  else{
    clearBtn.style.display = "block"
    filter.style.display = "block"
  }

  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item"
  formBtn.style.backgroundColor = "#333"
  isEditMode = false
}

function init()
{
itemForm.addEventListener("submit", addItem)

clearBtn.addEventListener("click", clearAll)

itemList.addEventListener("click", onClickItem)

filterInput.addEventListener("input", filterItems)

document.addEventListener("DOMContentLoaded", displayItems)

checkUI()
}
init()