/* eslint-disable no-console */
import logoSrc from '../media/logo.png';
import googleSrc from '../media/btn_google_signin_light_focus_web 2@2x.png';
import { iniciaSesionConPopup, crearUsuarioConCorreoYContraseña } from '../lib';

const rootDiv = document.getElementById('root');

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
  const buttonHome = document.createElement('a');
  buttonHome.className = 'home-button';
  buttonHome.textContent = 'Volver';
  buttonHome.addEventListener('click', () => onNavigate('/'));

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
  passwordInput.type = 'current-password';
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
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === 'auth/invalid-email') alert('Correo incorrecto');
        if (errorCode === 'auth/missing-password') alert('Escribe tu contraseña');
        if (errorCode === 'auth/weak-password') alert('La contraseña debe tener al menos 6 caracteres');
        // ..
      });
  });
  // Create the Google button
  const googleButton = document.createElement('button');
  googleButton.className = 'google-button ';

  // Create the Google icon image
  const googleIcon = document.createElement('img');
  googleIcon.src = googleSrc;
  googleIcon.alt = 'Google icon';
  googleButton.appendChild(googleIcon);
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    iniciaSesionConPopup()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(result);
        onNavigate('/wall');
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email);
        // ...
      });
  });

  // Append the email input, password input, "Forgot your password?" link,
  // "Next" button, and Google button to the login form
  loginForm.appendChild(loginHeading);
  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(nextButton);
  loginForm.appendChild(googleButton);

  // Create the login button container
  const loginButtonContainer = document.createElement('div');
  loginButtonContainer.className = 'login-button';

  // Append the logo container, introductory container,
  const mainSection = document.createElement('main');
  mainSection.className = 'main-register';

  // login form, and login button container to the main section
  mainSection.appendChild(loginForm);
  mainSection.appendChild(loginButtonContainer);

  // Append loginForm to the main section
  mainSection.appendChild(loginForm);

  // Append the mainSection to the mainWrapper
  mainWrapper.appendChild(mainSection);

  rootDiv.appendChild(mainWrapper);
};
