function useGetLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export default useGetLocalStorage;
