const USERS_KEY = 'todoUsers';
const CURRENT_USER_KEY = 'todoCurrentUser';
const TODO_KEY_PREFIX = 'todos:';

const normalizeEmail = (email) => email?.trim().toLowerCase();

const hashPassword = (password) => {
  if (typeof window === 'undefined') return password;
  return window.btoa(password);
};

const readStoredUsers = () => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]');
  } catch (error) {
    return [];
  }
};

const persistUsers = (users) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(window.localStorage.getItem(CURRENT_USER_KEY));
  } catch (error) {
    return null;
  }
};

export const setCurrentUser = (user) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const signOutUser = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CURRENT_USER_KEY);
};

export const registerUser = ({ name, email, password }) => {
  if (typeof window === 'undefined') return { success: false, error: 'Unable to access storage.' };

  const normalizedEmail = normalizeEmail(email);
  if (!name?.trim() || !normalizedEmail || !password) {
    return { success: false, error: 'Please provide name, email, and password.' };
  }

  const users = readStoredUsers();
  if (users.find((user) => user.email === normalizedEmail)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser = {
    name: name.trim(),
    email: normalizedEmail,
    password: hashPassword(password),
  };

  users.push(newUser);
  persistUsers(users);
  setCurrentUser({ name: newUser.name, email: newUser.email });

  return { success: true, user: { name: newUser.name, email: newUser.email } };
};

export const signInUser = (email, password) => {
  if (typeof window === 'undefined') return { success: false, error: 'Unable to access storage.' };

  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    return { success: false, error: 'Please provide email and password.' };
  }

  const users = readStoredUsers();
  const matchedUser = users.find((user) => user.email === normalizedEmail);

  if (!matchedUser || matchedUser.password !== hashPassword(password)) {
    return { success: false, error: 'Invalid email or password.' };
  }

  const user = { name: matchedUser.name, email: matchedUser.email };
  setCurrentUser(user);
  return { success: true, user };
};

export const loadTodosForUser = (email) => {
  if (typeof window === 'undefined' || !email) return [];
  try {
    return JSON.parse(window.localStorage.getItem(`${TODO_KEY_PREFIX}${email}`) || '[]');
  } catch (error) {
    return [];
  }
};

export const saveTodosForUser = (email, todos) => {
  if (typeof window === 'undefined' || !email) return;
  window.localStorage.setItem(`${TODO_KEY_PREFIX}${email}`, JSON.stringify(todos));
};
