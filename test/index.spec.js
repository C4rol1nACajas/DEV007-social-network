import {
  // getAuth,
  // signInWithEmailAndPassword,
  // signInWithPopup,
  // GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  crearUsuarioConCorreoYContraseña,
  iniciaSesionConPopup,
  // createPost,
}
  from '../src/lib/index';

// const { firestore } = require('firebase-admin');

jest.mock('firebase/auth');
jest.mock('../src/lib/index.js', () => ({
  auth: {
    currentUser: {
      email: 'test@example.com',
    },
    createUserWithEmailAndPassword: jest.fn(),
  },
}));

describe('crearUsuarioConCorreoYContraseña', () => {
  it('Debería ser una función', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });
  // it('Debería llamar a la función crearUsuarioConCorreoYContraseña', () => {
  //   crearUsuarioConCorreoYContraseña('test@example.com', 'password');
  //   expect(crearUsuarioConCorreoYContraseña).toHaveBeenCalled();
  // });
});

describe('iniciaSesionConPopup', () => {
  it('Debería ser una función', () => {
    expect(typeof iniciaSesionConPopup).toBe('function');
  });
});
