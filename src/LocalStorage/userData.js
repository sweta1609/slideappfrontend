export const getLocalUserData = async () => {
  let localUserData = await localStorage.getItem("user");
  let data = JSON.parse(localUserData);
  console.log("user data from async storeage", data);
  return data;
};
export const updateLocalUserData = async (data) => {
  await localStorage.setItem("user", JSON.stringify(data));
};
export const removeLocalUserData = async () => {
  await localStorage.removeItem("user");
};

export const getLocalToken = async () => {
  let token = await localStorage.getItem("token");
  return token;
};
export const updateLocalToken = async (token) => {
  await localStorage.setItem("token", token);
};
export const getAccessToken = async () => {
  let token = await localStorage.getItem("access_token");
  return token;
};
export const updateAccessToken = async (access_token) => {
  await localStorage.setItem("access_token", access_token);
};
export const removeLocalToken = async () => {
  await localStorage.removeItem("token");
};


export const removeAccessToken = async () => {
  await localStorage.removeItem("access_token");
};