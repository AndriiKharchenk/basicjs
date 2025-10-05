let shoppingList = ['молоко', 'хлеб', 'яйца', 'мясо'];

function addItem(item) {
  shoppingList.push(item);
}

function removeItem(item) {
  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i] === item) {
      shoppingList.splice(i, 1);
      break;
    }
  }
}

function showList() {
  console.log('Список покупок:');
  shoppingList.forEach((item, index) => {
    console.log(index + 1 + '. ' + item);
  });
}


addItem("сыр");
showList();

addItem("банаы");
showList();

removeItem("хлеб");
showList();
