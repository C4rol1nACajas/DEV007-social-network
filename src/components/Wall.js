// import { doc } from 'firebase/firestore';

import homeSrc from '../media/home-icon.svg';
import profileSrc from '../media/profile-icon.svg';
import communitiesSrc from '../media/communities-icon.svg';
import editIcon from '../media/edit-icon.svg';
import likeIcon from '../media/like-icon.svg';
import saveIcon from '../media/save-icon.svg';
import deleteIcon from '../media/delete-icon.svg';
import logoIcon from '../media/logo-icon.svg';

import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  likePost,
  emailUsuario,
} from '../lib';

export const Wall = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');

  buttonLogin.textContent = 'Inicia sesión';

  buttonLogin.addEventListener('click', () => onNavigate('/login'));

  HomeDiv.appendChild(buttonLogin);

  const wrapper = document.createElement('div');
  wrapper.className = 'wall-wrapper';

  const formPost = document.createElement('form');
  formPost.className = 'form-post';

  const welcomeMessage = document.createElement('h2');
  welcomeMessage.textContent = 'Hola, usuario';

  const questionForm = document.createElement('p');
  questionForm.textContent = '¿Cómo te sientes hoy?';

  const inputForm = document.createElement('textarea');
  inputForm.placeholder = 'Hoy me siento...';
  inputForm.className = 'input-post';
  inputForm.required = true;

  const postButton = document.createElement('button');
  postButton.className = 'post-button';
  postButton.innerHTML += 'Publicar';
  postButton.type = 'submit';
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputForm.value !== '') {
      createPost(inputForm.value).then(() => {
        inputForm.value = '';
        onNavigate('/wall');
      });
    }
  });

  formPost.appendChild(welcomeMessage);
  formPost.appendChild(questionForm);
  formPost.appendChild(inputForm);
  formPost.appendChild(postButton);

  const postWrapper = document.createElement('div');
  postWrapper.className = 'post-wrapper';

  const postContainer = document.createElement('div');
  postContainer.setAttribute('id', 'post-container');

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.className = 'buttons-wrapper';

  getPosts().then((posts) => {
    const postOrderer = [];
    posts.forEach((post) => {
      postOrderer.push(
        {
          id: post.id,
          publication: post.data().publication,
          date: post.data().date,
          likes: post.data().likes,
        },
      );
      postOrderer.sort((a, b) => b.date - a.date);
      // console.log(postOrderer);
      postOrderer.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-div';
        const postText = document.createElement('input');
        postText.value = post.publication;
        postText.disabled = true;

        const buttonLikeImg = document.createElement('img');
        buttonLikeImg.src = likeIcon;

        const buttonLike = document.createElement('button');
        buttonLike.textContent = `${post.likes.length}`;
        buttonLike.addEventListener('click', () => {
          const user = emailUsuario();
          const userLiked = post.likes.includes(user);
          if (!userLiked) {
            post.likes.push(user);
            likePost(post.id, post.likes).then(() => {
              onNavigate('/wall');
            });
          }
        });

        buttonLike.appendChild(buttonLikeImg);

        const editIconImg = document.createElement('img');
        editIconImg.src = editIcon;

        const buttonEdit = document.createElement('button');
        buttonEdit.alt = 'Editar';
        buttonEdit.addEventListener('click', () => {
          postText.disabled = !postText.disabled;
          if (postText.disabled) {
            postText.style.border = 'none';
          } else {
            postText.style.border = '1px solid #000000';
          }
        });

        buttonEdit.appendChild(editIconImg);

        const saveIconImg = document.createElement('img');
        saveIconImg.src = saveIcon;

        const buttonSave = document.createElement('button');
        buttonSave.alt = 'Guardar';
        buttonSave.addEventListener('click', () => {
          updatePost(post.id, postText.value).then(() => {
            onNavigate('/wall');
          });
        });

        buttonSave.appendChild(saveIconImg);

        const buttonDeleteImg = document.createElement('img');
        buttonDeleteImg.src = deleteIcon;

        const buttonDelete = document.createElement('button');
        buttonDelete.alt = 'Borrar';
        buttonDelete.addEventListener('click', () => {
          deletePost(post.id).then(() => {
            onNavigate('/wall');
          });
        });

        buttonDelete.appendChild(buttonDeleteImg);

        buttonsWrapper.appendChild(buttonLike);
        buttonsWrapper.appendChild(buttonEdit);
        buttonsWrapper.appendChild(buttonSave);
        buttonsWrapper.appendChild(buttonDelete);

        postDiv.appendChild(postText);
        postDiv.appendChild(buttonsWrapper);
        postContainer.appendChild(postDiv);

        postWrapper.appendChild(postDiv);
      });
    });
  });

  const wallContainer = document.createElement('div');
  wallContainer.className = 'wall-container';

  wallContainer.appendChild(formPost);
  wallContainer.appendChild(postWrapper);

  // We create the navbar
  const navBar = document.createElement('nav');
  navBar.className = 'nav-bar';

  // We proceed then to create the icon containers for the icon images.
  const profileIconContainer = document.createElement('picture');
  profileIconContainer.className = 'icon-container';

  const profileIcon = document.createElement('img');
  profileIcon.className = 'icon';
  profileIcon.src = profileSrc;

  profileIconContainer.appendChild(profileIcon);

  const homeIconContainer = document.createElement('picture');
  homeIconContainer.className = 'icon-container';

  const homeIcon = document.createElement('img');
  homeIcon.className = 'icon';
  homeIcon.src = homeSrc;

  homeIconContainer.appendChild(homeIcon);

  const communitiesIconContainer = document.createElement('picture');
  communitiesIconContainer.className = 'icon-container';

  const communitiesIcon = document.createElement('img');
  communitiesIcon.className = 'icon';
  communitiesIcon.src = communitiesSrc;

  communitiesIconContainer.appendChild(communitiesIcon);

  const logoIconImg = document.createElement('img');
  logoIconImg.className = 'logo-icon';
  logoIconImg.src = logoIcon;

  const navBarWrapper = document.createElement('div');
  navBarWrapper.className = 'nav-wrapper';

  navBarWrapper.appendChild(profileIconContainer);
  navBarWrapper.appendChild(homeIconContainer);
  navBarWrapper.appendChild(communitiesIconContainer);

  navBar.appendChild(navBarWrapper);
  navBar.appendChild(logoIconImg);

  wrapper.appendChild(wallContainer);
  wrapper.appendChild(navBar);

  return wrapper;
};
