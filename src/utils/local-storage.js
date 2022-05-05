export const setItem = (property, value) => {
  window.localStorage.setItem(property, value);
}

export const getItem = (property) => {
  window.localStorage.getItem(property);
}

export const removeItem = (property) => {
  window.localStorage.removeItem(property);
}
