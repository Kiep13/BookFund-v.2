export const useStorage = () => {
  const doesStorageHave = (key: string): boolean => {
    return Boolean(localStorage.getItem(key));
  }

  const getFromStorage = (key: string): any => {
    return localStorage.getItem(key);
  }

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, data);
  }

  const deleteFromStorage = (key: string) => {
    localStorage.removeItem(key);
  }

  return {
    doesStorageHave,
    getFromStorage,
    saveToStorage,
    deleteFromStorage
  }
}
