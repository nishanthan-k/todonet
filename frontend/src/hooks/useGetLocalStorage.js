function useGetLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || null;
}

export default useGetLocalStorage;
