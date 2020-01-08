import firebase from 'firebase';

/*
* method created a new task in to fire-base
* */
export async function createTaskServer(data, uid) {
  await firebase.database().ref(`users/${uid}/` + data.id).set(data);
}

/*
* method get a tasks list from fire-base
* */
export async function getTasksServer(uid) {
  let tasks = null;
  await firebase.database().ref(`users/${uid}/`).once('value').then(data => {
    tasks = data.val();
  });
  return tasks;
}

/*
* registration user in to fire-base
*
* */
export async function registerUser(data) {
  await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
  return await firebase.auth().currentUser.toJSON();
}

/*
* login user in to fire-base
*
* */
export async function loginUser(data) {
  await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
  return await firebase.auth().currentUser.toJSON();
}

/*
* update user in to fire-base
*
* */
export async function updateUser(data) {
  await firebase.auth().currentUser.updateProfile(data)
}

/*
* delete task in user to fire-base
*
* */
export async function deleteTaskServer(tasks, uid) {
  let newTasks = {};
  tasks.forEach(item => newTasks[item.id] = item);
  await firebase.database().ref(`users/${uid}/`).set(newTasks);
}