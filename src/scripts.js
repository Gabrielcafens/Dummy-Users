let allUsers = [];
let currentPage = 1;
const usersPerPage = 12;

function displayUsers(users) {
  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const usersToShow = users.slice(startIndex, endIndex);

  const previousPageButton = document.getElementById("previous-page");
  if (currentPage === 1) {
    previousPageButton.disabled = true;
  } else {
    previousPageButton.disabled = false;
  }

  usersToShow.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const userImage = document.createElement("img");
    userImage.src = user.image;
    userImage.alt = `${user.firstName} ${user.lastName}`;

    const userInfo = document.createElement("div");
    userInfo.innerHTML = `
      <h2>${user.firstName} ${user.lastName}</h2>
      <p><strong>Idade:</strong> ${user.age}</p>
      <p><strong>E-mail:</strong> ${user.email}</p>
      <p><strong>Telefone:</strong> ${user.phone}</p>
      <p><strong>Apelido:</strong> ${user.username}</p>
    `;

    userCard.appendChild(userImage);
    userCard.appendChild(userInfo);

    userCard.addEventListener('click', () => {
      showUserInfo(user);
    });

    usersContainer.appendChild(userCard);
  });
}

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

async function loadAndDisplayUsers() {
  allUsers = await fetchUsersFromAPI();
  displayUsers(allUsers);
}

function nextPage() {
  if (currentPage + 1 <= Math.ceil(allUsers.length / usersPerPage)) {
    currentPage++;
    displayUsers(allUsers);
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayUsers(allUsers);
  }
}

function filterUsersByName() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const filteredUsers = allUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName} ${user.username}`.toLowerCase();
    const age = user.age.toString(); 
    return fullName.includes(searchTerm) || age.includes(searchTerm);
  });

  displayUsers(filteredUsers);
}

function showUserInfo(user) {
  const overlay = document.getElementById('overlay');
  const card = document.getElementById('user-card');
  const userName = document.getElementById('user-name');
  const userAge = document.getElementById('user-age');
  const userEmail = document.getElementById('user-email');
  const userGender = document.getElementById('user-gender');
  const userUsername = document.getElementById('user-username');
  const userBirthDate = document.getElementById('user-birthDate');
  const userImage = document.getElementById('user-image');
  const userBloodGroup = document.getElementById('user-bloodGroup');
  const userHeight = document.getElementById('user-height');
  const userWeight = document.getElementById('user-weight');
  const userIP = document.getElementById('user-ip');
  const userAddress = document.getElementById('user-address');
  const userCity = document.getElementById('user-city');
  const userUniversity = document.getElementById('user-university');

  userName.textContent = `${user.firstName} ${user.lastName}`;
  userAge.textContent = user.age;
  userEmail.textContent = user.email;
  userGender.textContent = user.gender;
  userUsername.textContent = user.username;
  userBirthDate.textContent = user.birthDate;
  userImage.src = user.image;
  userBloodGroup.textContent = user.bloodGroup;
  userHeight.textContent = user.height;
  userWeight.textContent = user.weight;
  userIP.textContent = user.ip;
  userAddress.textContent = user.address.address;
  userCity.textContent = user.address.city;
  userUniversity.textContent = user.university;

  overlay.style.display = 'flex';
}

window.onload = loadAndDisplayUsers;

function closeCard() {
  const overlay = document.getElementById('overlay');
  const card = document.getElementById('user-card');
  

  overlay.style.display = 'none';

}
