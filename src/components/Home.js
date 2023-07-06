import { GoogleAuthProvider } from 'firebase/auth';
import { iniciaSesionConCorreoYContraseña, iniciaSesionConPopup } from '../lib';
import logoSrc from '../media/logo.png';
import disclaimerSrc from '../media/disclaimer.png';

// Your web app's Firebase configuration

export const Home = (onNavigate) => {
  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Inicia sesión';
  buttonLogin.addEventListener('click', () => onNavigate('/register'));

  // create the main wrapper that includes the logo and the container
  // for the introductory text and the form
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'wrapper';

  // Create the logo container
  const logoContainer = document.createElement('picture');
  logoContainer.className = 'logo-container';

  // Create the logo image
  const logoImage = document.createElement('img');
  logoImage.src = logoSrc;
  logoImage.alt = 'Nanai logo';

  // Append the logo image to the logo container
  logoContainer.appendChild(logoImage);

  // Create the introductory container
  const introContainer = document.createElement('div');
  introContainer.className = 'introductory-container';

  const DisclaimerWrapper = document.createElement('div');
  DisclaimerWrapper.className = 'disclaimer-wrapper';

  // Create the heading
  const heading = document.createElement('h2');
  heading.textContent = 'Bienvenido/a a nuestra comunidad de bienestar emocional';

  // Create the paragraphs
  const paragraph1 = document.createElement('p');
  paragraph1.textContent = 'Aquí encontrarás un espacio seguro y acogedor para conectarte con personas que comparten tus mismas inquietudes.';

  const paragraph2 = document.createElement('p');
  paragraph2.textContent = 'Juntos, exploraremos caminos hacia la salud mental y emocional, brindándonos apoyo mutuo y compartiendo herramientas poderosas.';

  const paragraph3 = document.createElement('p');
  paragraph3.textContent = '¡Empieza a explorar y descubre todo lo que esta red social tiene para ofrecerte!';

  // Create the disclaimer container
  const disclaimerContainer = document.createElement('picture');
  disclaimerContainer.className = 'disclaimer-container-pic';

  // Create the disclaimer image
  const disclaimerImage = document.createElement('img');
  disclaimerImage.src = disclaimerSrc;
  disclaimerImage.alt = 'Importante';

  // Append the disclaimer image to the disclaimer container
  disclaimerContainer.appendChild(disclaimerImage);

  // Create the disclaimer paragraph
  const disclaimerParagraph = document.createElement('p');
  disclaimerParagraph.textContent = 'nanai no remplaza el tratamiento médico ni la terapia profesional, si estás experimentando problemas de salud mental, busca la ayuda de un profesional de la salud calificado.';

  // Append the heading, paragraphs, disclaimer container,
  // and disclaimer paragraph to the introductory container
  DisclaimerWrapper.appendChild(heading);
  DisclaimerWrapper.appendChild(paragraph1);
  DisclaimerWrapper.appendChild(paragraph2);
  DisclaimerWrapper.appendChild(paragraph3);
  DisclaimerWrapper.appendChild(disclaimerContainer);
  DisclaimerWrapper.appendChild(disclaimerParagraph);

  introContainer.appendChild(logoContainer);
  introContainer.appendChild(DisclaimerWrapper);

  // Create the login form
  const loginForm = document.createElement('form');
  loginForm.className = 'login-section';

  // Create the login heading
  const loginHeading = document.createElement('h2');
  loginHeading.className = 'login';
  loginHeading.textContent = 'Inicia sesión';

  // Create the email input
  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.placeholder = 'Correo electrónico';
  emailInput.required = true;

  // Create the password input
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.placeholder = 'Contraseña';

  // Create the "Forgot your password?" link
  const forgotPasswordLink = document.createElement('a');
  forgotPasswordLink.href = '';
  forgotPasswordLink.className = 'forgot-password';
  forgotPasswordLink.textContent = '¿Olvidaste tu contraseña?';

  // Create the "Next" button
  const nextButton = document.createElement('a');
  nextButton.href = '';
  nextButton.className = 'continue';
  // nextButton.onclick = routes;
  nextButton.textContent = 'Siguiente';
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    iniciaSesionConCorreoYContraseña(emailInput.value, passwordInput.value)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        onNavigate('/wall');
        // ...
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage, 'error custom');
        if (errorCode === 'auth/invalid-email') alert('Correo incorrecto');
        if (errorCode === 'auth/missing-password') alert('Escribe tu contraseña');
        if (errorCode === 'auth/wrong-password') alert('Contraseña incorrecta');
        if (errorCode === 'auth/user-not-found') alert('Usuario no registrado');
      });
  });

  // Create google container, that way we can center the button
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
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  });
  // googleContainer.appendChild(googleText);
  googleContainer.appendChild(googleButton);

  // Append the email input, password input, "Forgot your password?" link,
  // "Next" button, and Google button to the login form
  loginForm.appendChild(loginHeading);
  loginForm.appendChild(emailInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(forgotPasswordLink);
  loginForm.appendChild(nextButton);
  loginForm.appendChild(googleContainer);

  // Create the "Don't have an account?" paragraph
  const accountParagraph = document.createElement('p');
  accountParagraph.textContent = '¿No tienes una cuenta?';

  // Create the "Register here" link
  const registerLink = document.createElement('a');
  registerLink.textContent = 'Regístrate aquí';
  registerLink.addEventListener('click', () => onNavigate('/register'));

  // Create the login button container
  const loginButtonContainer = document.createElement('div');
  loginButtonContainer.className = 'login-button';

  // Append the "Don't have an account?" paragraph and
  // "Register here" link to the login button container
  loginButtonContainer.appendChild(accountParagraph);
  loginButtonContainer.appendChild(registerLink);

  // Append the logo container, introductory container,
  const mainSection = document.createElement('main');

  // login form, and login button container to the main section
  mainSection.appendChild(loginForm);
  mainSection.appendChild(loginButtonContainer);

  mainWrapper.appendChild(introContainer);
  mainWrapper.appendChild(mainSection);

  // Append the main section to the document body
  return mainWrapper;
};
