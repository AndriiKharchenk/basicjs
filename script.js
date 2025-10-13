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




const URL = 'https://jsonplaceholder.typicode.com/';

const getData = async (type) => {
  try {
    const response = await fetch(`${URL}${type}`);
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);

    const data = await response.json();

       if (type === 'users') {
      console.log('Количество пользователей:', data.length);
      console.log('Имена пользователей:');
      data.forEach((user) => console.log(user.name));

      console.log('Первые 5 пользователей:');
      console.table(data.slice(0, 5));

      const searchByName = (keyword) => {
        const found = data.find((u) => u.name.toLowerCase().includes(keyword.toLowerCase()));
        if (found) {
          console.log(`Найден пользователь по "${keyword}":`);
          console.table([found]);
        } else {
          console.log(`Пользователь "${keyword}" не найден.`);
        }
      };
      searchByName('Leanne');
    } else if (type === 'posts') {
      console.log('Количество постов:', data.length);

      console.log('Первые 5 постов:');
      console.table(data.slice(0, 5).map((p) => p.title));

      const showPostsByUser = (userId) => {
        const userPosts = data.filter((p) => p.userId === userId);
        console.log(`Посты пользователя ${userId}:`);
        console.table(userPosts.map((p) => p.title));
      };
      showPostsByUser(1);
    } else if (type === 'todos') {
      const completed = data.filter((t) => t.completed);
      console.log('Первые 10 выполненных задач:');
      console.table(completed.slice(0, 10));

      const firstUserTodo = data.find((t) => t.userId === 1);
      if (firstUserTodo) {
        console.log('Первая задача пользователя 1:', firstUserTodo);
      }
    } else {
      console.log('Неизвестный тип данных');
    }

    return data;
  } catch (error) {
    console.error(`Ошибка при загрузке ${type}:`, error.message);
  }
};

getData('users');
getData('posts');
getData('todos');

const miniAnalytics = async () => {
  try {
    const [users, posts] = await Promise.all([getData('users'), getData('posts')]);
    const postCount = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});
    console.log('Количество постов у каждого пользователя:', postCount);

    const user1 = users.find((u) => u.id === 1);
    if (user1) {
      console.log(`\nПользователь: ${user1.name}`);
      console.log(`Количество постов: ${postCount[1]}`);
    }
  } catch (error) {
    console.error('Ошибка аналитики:', error.message);
  }
};

miniAnalytics();
