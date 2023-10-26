export const saveLocally = (accessToken: string): void => {
  localStorage.setItem("AccessToken", accessToken);
};

export const getLocalData = () => localStorage.getItem("AccessToken");

export const deleteLocalData = () => localStorage.removeItem("AccessToken");
