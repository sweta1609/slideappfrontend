import {
  removeLocalToken,
  removeLocalUserData,
} from "../../LocalStorage/userData";

// context store. data can be accessed throughout the app
export const appState = {
  loading: true,
  user: null, 
};

export function appReducer(draft, action) {
  switch (action.type) {
    case "loading":
      draft.loading = action.value;
      return;
    case "setUserData":
      draft.user = action.value;
      draft.loading = false;
      return;
      case "setToken":
      draft.token = action.value;
      draft.loading = false;
      return;
      case "setAccessToken":
        draft.access_token = action.value;
        draft.loading = false;
        return;
    case "logoutUser":
      draft.user = null;
      draft.loading = false;
      return;
    default:
      return;
  }
}
