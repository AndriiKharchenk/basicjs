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




const URL = 'https://jsonplaceholder.typicode.com/users';

const getUsers = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);

    const users = await response.json();
    console.log('Количество пользователей:', users.length);

    console.log('Имена пользователей:');
    users.forEach((user) => console.log(user.name));

    const showFirstNUsers = (n) => {
      console.log(`Первые ${n} пользователей:`);
      console.table(users.slice(0, n));
    };
    showFirstNUsers(7);

    const searchByName = (keyword) => {
      const foundUser = users.find((user) => user.name.toLowerCase().includes(keyword.toLowerCase()));
      if (foundUser) {
        console.log(`Первый найденный пользователь по "${keyword}":`);
        console.table([foundUser]);
      } else {
        console.log(`Пользователь с именем, содержащим "${keyword}", не найден.`);
      }
    };
    searchByName('Leanne');

    const findUserByName = (name) => users.find((user) => user.name === name);
    const Leanne = findUserByName('leanne');
    if (Leanne) console.log('Найден пользователь Leanne:', Leanne);

    return users;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error.message);
  }
};

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const getPosts = async () => {
  try {
    const response = await fetch(POSTS_URL);
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);

    const posts = await response.json();

    const showFirstNPosts = (n) => {
      console.log(`Первые ${n} постов:`);
      console.table(posts.slice(0, n).map((p) => p.title));
    };
    showFirstNPosts(5);

    const showPostsByUser = (userId) => {
      const userPosts = posts.filter((post) => post.userId === userId);
      console.log(`Посты пользователя ${userId}:`);
      console.table(userPosts.map((p) => p.title));
    };
    showPostsByUser(1);

    return posts;
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error.message);
  }
};

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = async () => {
  try {
    const response = await fetch(TODOS_URL);
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
    const todos = await response.json();

    const completed = todos.filter((todo) => todo.completed);
    console.log('Выполненные задачи:');
    console.table(completed.slice(0, 10));

      const firstUserTodo = todos.find((todo) => todo.userId === 1);
    if (firstUserTodo) {
      console.log('Первая задача пользователя 1:', firstUserTodo);
    }

    return todos;
  } catch (error) {
    console.error('Ошибка при загрузке todos:', error.message);
  }
};

const miniAnalytics = async () => {
  try {
    const [users, posts] = await Promise.all([getUsers(), getPosts()]);

    const postCount = posts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1;
      return acc;
    }, {});

    console.log('Количество постов у каждого пользователя:', postCount);

    const user1 = users.find((u) => u.id === 1);
    if (user1) {
      console.log(`Пользователь: ${user1.name}`);
      console.log(`Количество постов: ${postCount[1]}`);
    }
  } catch (error) {
    console.error('Ошибка аналитики:', error.message);
  }
};

getUsers();
getPosts();
getTodos();
miniAnalytics();