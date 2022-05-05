export const getItem = (property) => {
  return window.localStorage.getItem(property);
}

export const setItem = (property, value) => {
  window.localStorage.setItem(property, value);
}

export const removeItem = (property) => {
  window.localStorage.removeItem(property);
}
