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




const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const getUsers = async () => {
  try {
    const response = await fetch(USERS_URL);
    if (!response.ok) throw new Error(`HTTP помилка: ${response.status}`);

    const users = await response.json();
    console.log('Кількість користувачів:', users.length);

    console.log('Імена користувачів:');
    users.forEach((user) => console.log(user.name));

    const showFirstNUsers = (n) => {
      console.log(`Перші ${n} користувачів:`);
      console.table(users.slice(0, n));
    };
    showFirstNUsers(7);

    const searchByName = (keyword) => {
      const found = users.filter((user) => user.name.toLowerCase().includes(keyword.toLowerCase()));
      console.log(`Результат пошуку за "${keyword}":`);
      console.table(found);
    };
    searchByName('Leanne');

    return users;
  } catch (error) {
    console.error('Помилка при завантаженні користувачів:', error.message);
  }
};


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const getPosts = async () => {
  try {
    const response = await fetch(POSTS_URL);
    if (!response.ok) throw new Error(`HTTP помилка: ${response.status}`);

    const posts = await response.json();

    const showFirstNPosts = (n) => {
      console.log(`Перші ${n} постів:`);
      console.table(posts.slice(0, n).map((p) => p.title));
    };
    showFirstNPosts(5);

    const showPostsByUser = (userId) => {
      const userPosts = posts.filter((post) => post.userId === userId);
      console.log(`Пости користувача ${userId}:`);
      console.table(userPosts.map((p) => p.title));
    };
    showPostsByUser(1);

    return posts;
  } catch (error) {
    console.error('Помилка при завантаженні постів:', error.message);
  }
};

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = async () => {
  try {
    const response = await fetch(TODOS_URL);
    if (!response.ok) throw new Error(`HTTP помилка: ${response.status}`);
    const todos = await response.json();
    const completed = todos.filter((todo) => todo.completed);
    console.log('Виконані задачі:');
    console.table(completed.slice(0, 10));
  } catch (error) {
    console.error('Помилка при завантаженні todos:', error.message);
  }
};

const miniAnalytics = async () => {
  try {
    const [users, posts] = await Promise.all([getUsers(), getPosts()]);
    const postCount = {};
    posts.forEach((post) => {
      postCount[post.userId] = (postCount[post.userId] || 0) + 1;
    });
    console.log('Кількість постів у кожного користувача:', postCount);
    const user1 = users.find((u) => u.id === 1);
    console.log(`Користувач: ${user1.name}`);
    console.log(`Кількість постів: ${postCount[1]}`);
  } catch (error) {
    console.error('Помилка аналітики:', error.message);
  }
};

(async () => {
  await getUsers();
  await getPosts();
  await getTodos();
  await miniAnalytics();
})();