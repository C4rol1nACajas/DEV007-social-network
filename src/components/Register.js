import logoSrc from '../media/logo.png';
import backButton from '../media/back-one.svg';
import { iniciaSesionConPopup, crearUsuarioConCorreoYContraseña } from '../lib';
import { showMessage } from './Modal';

export const Register = (onNavigate) => {
  // create the main wrapper that includes the logo and the container
  // for the introductory text and the form
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'register-wrapper';

  // Create the logo container
  const logoContainer = document.createElement('picture');
  logoContainer.className = 'logo-container';

  // Create the logo image
  const logoImage = document.createElement('img');
  logoImage.src = logoSrc;
  logoImage.alt = 'Nanai logo';

  // Append the logo image to the logo container and then to the main
  logoContainer.appendChild(logoImage);
  mainWrapper.appendChild(logoContainer);

  // Create the login form
  const loginForm = document.createElement('form');
  loginForm.className = 'login-section';

  // Create "Home" button
  const buttonHome = document.createElement('button');
  buttonHome.className = 'back-button';
  buttonHome.addEventListener('click', () => onNavigate('/'));

  const buttomHomeIcon = document.createElement('img');
  buttomHomeIcon.alt = 'Volver';
  buttomHomeIcon.src = backButton;

  buttonHome.appendChild(buttomHomeIcon);

  loginForm.appendChild(buttonHome);

  // Create the login heading
  const loginHeading = document.createElement('h2');
  loginHeading.className = 'login';
  loginHeading.textContent = 'Regístrate';

  // Create the email input
  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.placeholder = 'Correo electrónico';
  emailInput.required = true;

  // Create the password input
  const passwordInput = document.createElement('input');
  passwordInput.id = 'pass';
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Contraseña';

  // Create the "Next" button
  const nextButton = document.createElement('a');
  nextButton.href = '';
  nextButton.className = 'continue';
  nextButton.textContent = 'Siguiente';
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(emailInput.value, passwordInput.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onNavigate('/');
        // ...
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (emailInput.value === '' || passwordInput.value === '') {
          showMessage('Por favor, llena todos los campos');
        } else {
          if (errorCode === 'auth/invalid-email') showMessage('Ingresa un correo');
          if (errorCode === 'auth/invalid-password') showMessage('Escribe tu contraseña');
          if (errorCode === 'auth/weak-password') showMessage('La contraseña debe tener al menos 6 caracteres');
        }
      });
  });

  // Create the google button container, that way we can center the button
  const googleContainer = document.createElement('div');
  googleContainer.className = 'google-container';

  // Create the Google button
  const googleButton = document.createElement('button');
  googleButton.className = 'google-button';
  googleButton.innerHTML = 'Acceder con Google';

  // Create the Google icon image
  const googleIcon = document.createElement('img');
  googleIcon.src = '/media/google.svg';
  googleIcon.alt = 'Google icon';
  googleIcon.className = 'google-icon';
  googleButton.appendChild(googleIcon);
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    iniciaSesionConPopup()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        onNavigate('/wall');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        console.log(errorCode, errorMessage, email);
        // ...
      });
  });

  googleContainer.appendChild(googleButton);

  // Append the email input, password input, "Forgot your password?" link,
  // "Next" button, and Google button to the login form
  loginForm.appendChild(loginHeading);
  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(nextButton);
  loginForm.appendChild(googleContainer);

  // Append the logo container, introductory container,
  const mainSection = document.createElement('main');
  mainSection.className = 'main-register';

  // login form, and login button container to the main section
  mainSection.appendChild(loginForm);
  // mainSection.appendChild(loginButtonContainer);

  // Append loginForm to the main section
  mainSection.appendChild(loginForm);

  // Append the mainSection to the mainWrapper
  mainWrapper.appendChild(mainSection);

  return mainWrapper;
};
