
function useSetLocalStorage() {
  const setLocalStorage = (key, value) => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  return setLocalStorage;
}

export default useSetLocalStorage;
