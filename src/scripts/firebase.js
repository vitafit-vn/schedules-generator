async function authWithGoogle() {
  try {
    toggleLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    toggleLoading(false);
    hideAuthButton();
  } catch (error) {
    toggleLoading(false);
    console.error(error);
  }
}

function initializeFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyCteDJ-lA8MnwQkwvwAixaEaV84fDjsBKc",
    authDomain: "vitafit-tools.firebaseapp.com",
    databaseURL: "https://vitafit-tools.firebaseio.com",
    projectId: "vitafit-tools",
    storageBucket: "",
    messagingSenderId: "394067361112",
    appId: "1:394067361112:web:22b393bb5843d155"
  });

  firebase.auth().languageCode = 'vi';
  $('#google-auth').click(() => authWithGoogle());
}

function showAuthButton() {
  $('#google-auth').removeClass('d-none');
  $('#schedules-form').addClass('d-none');
}

function hideAuthButton() {
  $('#google-auth').addClass('d-none');
  $('#schedules-form').removeClass('d-none');
  renderLayouts();
}

$(document).ready(async () => {
  initializeFirebase();

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().onAuthStateChanged(user => {
      if (user == null) showAuthButton();
      else hideAuthButton();
    });
  } catch (error) {
  }
});
