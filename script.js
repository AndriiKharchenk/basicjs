const shoppingList = ['молоко', 'хлеб', 'яйца', 'мясо'];

const addItem = (item) => {
  shoppingList.push(item);
}

const removeItem = (item) => {
  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i] === item) {
      shoppingList.splice(i, 1);
      break;
    }
  }
}

const showList = () => {
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

const loadUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }
    const users = await response.json();
    console.log('Список користувачів:');
    console.table(users);
  } catch (error) {
    console.error('Помилка при завантажені користувачів:', error.message);
  }
};

loadUsers();

