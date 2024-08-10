function useLocalStorage() {
  const setItem = (key, value) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const getItem = (key) => JSON.parse(localStorage.getItem(key)) || null;

  const removeItem = (key) => localStorage.removeItem(key);

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
