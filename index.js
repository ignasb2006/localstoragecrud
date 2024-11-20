let itemsDiv = document.getElementById("itemsHolder");

let actionName = document.getElementById("actionName")
let actionNumber = document.getElementById("actionNumber")
let actionAdd = document.getElementById("actionAdd")

const itemData = JSON.parse(localStorage.getItem("data")) || [];


const addItem = (name,amount) => {
    let itemID = name.toLowerCase().replace(/ /g,"_");
    if (document.getElementById(itemID) === null){
        let appendHTML = 
        `<div class="item" id="${itemID}">
                    <input class="item-name" id="${itemID}-name">
                    <div class="item-amount">
                        x<input type="number" class="item-number" id="${itemID}-number">
                    </div>
                    <button class="item-edit" id="${itemID}-edit">✎</button>
                    <button class="item-remove" id="${itemID}-remove">X</button>
                </div>
        `
        itemsDiv.innerHTML += appendHTML;
    
        let itemName = document.getElementById(`${itemID}-name`);
        itemName.value = name;
        itemName.disabled = true;
        let itemNumber = document.getElementById(`${itemID}-number`);
        itemNumber.value = amount;
        itemNumber.disabled = true;
        
        let addData = {
            id: itemID,
            name: name,
            amount: amount
        }

        localStorage.setItem("data", JSON.stringify(addData));
    } else {
        alert("This item already exists!");
    }
    
}

itemData.forEach(({id,name,amount}) => {
    addItem(name,amount)
});

const addButton = () => {
    let name = actionName.value;
    let amount = Number(actionNumber.value);

    if (name.replace(/\s/g,"") !== ""){
        if (amount > 0) {
            addItem(name,amount);
            actionName.value = "";
            actionNumber.value = "";
        } else {
            alert("Enter an amount!")
        }
    } else {
        alert("Enter a name!")
    }
}

actionAdd.addEventListener('click',addButton)