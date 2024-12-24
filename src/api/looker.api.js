import axios from "axios";

export const getDashboardsFromLooker = async (token) => {
  let getDashboardsFromLookerResponse = null;
  // let userData = await getLocalUserData();

  let config = {
    method: "get",
    url: `${import.meta.env.VITE_API_ENDPOINT}/looker/dashboards`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      getDashboardsFromLookerResponse = response;
    })
    .catch((error) => {
      getDashboardsFromLookerResponse = error.response;
      console.log("Error fetching looker dashboards", error);
    });
  return getDashboardsFromLookerResponse;
};

export const getSingleDashboardFromLooker = async (dashboardId, token) => {
  let getSingleDashboardFromLookerResponse = null;
  // let userData = await getLocalUserData();

  let config = {
    method: "get",
    url: `${import.meta.env.VITE_API_ENDPOINT}/looker/dashboard/` + dashboardId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      getSingleDashboardFromLookerResponse = response;
    })
    .catch((error) => {
      getSingleDashboardFromLookerResponse = error.response;
      console.log("Error fetching looker single dashboard", error);
    });
  return getSingleDashboardFromLookerResponse;
};

export const downloadLookWithQueryId = async (queryId, token) => {
  let downloadLookWithQueryIdResponse = null;
  // let userData = await getLocalUserData();

  let config = {
    method: "get",
    url: `${import.meta.env.VITE_API_ENDPOINT}/looker/downloadlook/` + queryId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  await axios
    .request(config)
    .then((response) => {
      downloadLookWithQueryIdResponse = response;
    })
    .catch((error) => {
      downloadLookWithQueryIdResponse = error.response;
      console.log("Error downloadLookWithQueryId", error);
    });
  return downloadLookWithQueryIdResponse;
};
