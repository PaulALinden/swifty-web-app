import config from './config.js';
import { validateInput, sanitizeInput, insertErrorMessage, removeErrorMessage} from './assets.js';

//Create account
const signUpButton = document.getElementById("signup")
const newUsernameInput = document.getElementById("newusername")
const newEmailInput = document.getElementById("newemail")
const newPasswordInput = document.getElementById("newpassword")
const newFirstNameInput = document.getElementById("newfirstname")
const newLastNameInput = document.getElementById("newlastname")
const newBirthdateInput = document.getElementById("newbirthdate")

//add disable while waiting
signUpButton.addEventListener("click", ev => {
  ev.preventDefault();

  const usernameValue = sanitizeInput(newUsernameInput.value);
  const emailValue = sanitizeInput(newEmailInput.value);
  const passwordValue = sanitizeInput(newPasswordInput.value);
  const firstNameValue = sanitizeInput(newFirstNameInput.value);
  const lastNameValue = sanitizeInput(newLastNameInput.value);
  const birthdateValue = sanitizeInput(newBirthdateInput.value);

  // further dev....
  createAccount(
    usernameValue,
    emailValue,
    passwordValue,
    firstNameValue,
    lastNameValue,
    birthdateValue
  );

  console.log("Click")
});

async function createAccount(username, email, password, firstName, lastName, birthdate) {

  const apiUrl = `https://${config.BASE_URL}:3000/api/users/register/individual`;

  //Check inputs... Needs css for a more user friendly approach.
  if (!username) {
    newUsernameInput.classList.add("error");
    insertErrorMessage('Please enter a username','username');
    return;
  } else if (!validateInput(username, "lettersAndNumbers")) {
    newUsernameInput.classList.add("error");
    insertErrorMessage('Username can only contain letters and numbers','username');
    return;
  } else{
    newUsernameInput.classList.remove("error");
    removeErrorMessage('username');
  }

  if (!email) {
    newEmailInput.classList.add("error");
    insertErrorMessage('Please enter a email.','email');
    return;
  } else if (!validateInput(email, "email")) {
    newEmailInput.classList.add("error");
    insertErrorMessage('Please type a valid email format.','email');
    return;
  } else{
    newEmailInput.classList.remove("error");
    removeErrorMessage('email');
  }

  if (!password) {
    newPasswordInput.classList.add("error");
    insertErrorMessage('Please enter a password.','password');
    return;
  } else if (password.length < 8) {
    newPasswordInput.classList.add("error");
    insertErrorMessage('Password must be at least 8 characters long.','password');
    return;
  } else{
    newPasswordInput.classList.remove("error");
    removeErrorMessage('password');
  }

  if (!firstName) {
    newFirstNameInput.classList.add("error");
    insertErrorMessage('Please enter a first name.','firstname');
    return;
  } else if (!validateInput(firstName, "letters")) {
    newFirstNameInput.classList.add("error");
    insertErrorMessage('First name can only contain letters.','firstname');
    return;
  } else{
    newFirstNameInput.classList.remove("error");
    removeErrorMessage('firstname');
  }

  if (!lastName) {
    newLastNameInput.classList.add("error");
    insertErrorMessage('Please enter a last name.','lastname');
    return;
  } else if (!validateInput(lastName, "letters")) {
    newLastNameInput.classList.add("error");
    insertErrorMessage('Last name can only contain letters.','lastname');
    return;
  } else{
    newLastNameInput.classList.remove("error");
    removeErrorMessage('lastname');
  }

  if (!validateInput(birthdate, "birthdate")) {
    newBirthdateInput.classList.add("error");
    insertErrorMessage('Please enter a valid birthdate (YYYY-MM-DD).','birthdate');
    return;
  } else{
    newBirthdateInput.classList.remove("error");
    removeErrorMessage('birthdate');
  }
  

  const postData = {
    username: username.toString().toLowerCase(),
    email: email.toString().toLowerCase(),
    password: password.toString().toLowerCase(),
    firstName: firstName.toString().toLowerCase(),
    lastName: lastName.toString().toLowerCase(),
    birthdate: birthdate.toString().toLowerCase(),
  };

  console.log("Sending to server");
  console.log(postData);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      console.log('Network response was not ok ' + response.statusText);
      console.log(response)
    }

    const data = await response.json();
    console.log('Success:', data);

  } catch (error) {

    alert(`Error: ${error.message || 'Registration failed. Please try again.'}`);
    return;
  } finally {

    console.log('Redirecting')
    window.location.href = '../../index.html';
  }
};