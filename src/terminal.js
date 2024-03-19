const fetch = require('node-fetch');

async function fetchUsersFromAPI() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
}

async function displayUsersInTerminal(age = "") {
  try {
    const allUsers = await fetchUsersFromAPI();
    const filteredUsers = filterUsersByAge(allUsers, age);
    
    filteredUsers.forEach((user, index) => {
      console.log(`Usuário ${index + 1}:`);
      console.log(`Nome: ${user.firstName} ${user.lastName}`);
      console.log(`Idade: ${user.age}`);
      console.log(`E-mail: ${user.email}`);
      console.log(`Telefone: ${user.phone}`);
      console.log(`Apelido: ${user.username}`);
      console.log("-----------------------------");
    });
  } catch (error) {
    console.error("Erro ao exibir usuários:", error);
  }
}

function filterUsersByAge(users, age) {
  if (!age) {
    return users;
  }

  return users.filter((user) => {
    return user.age === parseInt(age);
  });
}
const ageArg = process.argv[2];

displayUsersInTerminal(ageArg);
