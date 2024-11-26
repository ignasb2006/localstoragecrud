const itemsDiv = document.getElementById("itemsHolder");
const actionName = document.getElementById("actionName")
const actionNumber = document.getElementById("actionNumber")
const actionAdd = document.getElementById("actionAdd")

localStorage.clear();

const itemData = JSON.parse(localStorage.getItem("data")) || [];

console.log(itemData);

const addOrUpdateItem = (name,amount) => {
    const itemID = name.toLowerCase().replace(/ /g,"_");

    const index = itemData.findIndex((item) => item.id === itemID);
    
    const itemObj = {
        id: Date.now(),
        name: name,
        amount: amount
    };

    if (index === -1){
        itemData.push(itemObj);
    } else {
        alert("This item already exists!");
        return;
    }

    localStorage.setItem("data", JSON.stringify(itemData));
    updateContainer();
    reset();
};

const updateContainer = () => {
    itemsDiv.innerHTML = "";

    itemData.forEach(
        ({id, name, amount}) => {
            itemsDiv.innerHTML += `
                <div class="item" id="${id}">
                    <input class="item-name" id="${id}-name">
                    <div class="item-amount">
                        x<input type="number" class="item-number" id="${id}-number">
                    </div>
                    <button onclick="editItem(this)" class="item-edit" id="${id}-edit">✎</button>
                    <button onclick="deleteItem(this)" class="item-remove" id="${id}-remove">X</button>
                </div>
            `;
            document.getElementById(`${id}-name`).setAttribute("value",name);
            document.getElementById(`${id}-name`).setAttribute("disabled",true);
            document.getElementById(`${id}-number`).setAttribute("value",amount);
            document.getElementById(`${id}-number`).setAttribute("disabled",true);
            
        }
        
    );
};

const deleteItem = (el) => {
    const index = itemData.findIndex(
        (item) => item.id === el.parentElement.id
    );

    el.parentElement.remove();
    itemData.splice(index,1);
    localStorage.setItem("data", JSON.stringify(itemData));
};

const reset = () => {
    actionName.value = "";
    actionNumber.value = "";
};

actionAdd.addEventListener("click", () => {
    let name = actionName.value;
    let amount = Number(actionNumber.value);

    if (name.replace(/\s/g,"") !== ""){
        if (amount > 0) {
            addOrUpdateItem(name,amount);
            reset();
        } else {
            alert("Enter an amount!")
        }
    } else {
        alert("Enter a name!")
    }
});