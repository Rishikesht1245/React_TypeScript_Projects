export const saveLocally = (accessToken: string): void => {
  localStorage.setItem("AccessToken", accessToken);
};

export const getLocalData = (): string =>
  localStorage.getItem("AccessToken") as string;

export const deleteLocalData = () => localStorage.removeItem("AccessToken");
