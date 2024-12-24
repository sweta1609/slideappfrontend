import "./login.css";
import axios from 'axios';
import DispatchContext from "../../Context/App/DispatchContext";
import { useContext,useEffect } from "react";
import { updateLocalToken, updateLocalUserData,updateAccessToken } from "../../LocalStorage/userData";

const Login = () => {
  const appDispatch = useContext(DispatchContext);
  
  const handleGoogleLogin = () => {
    const scopes = [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/presentations.readonly',
      'https://www.googleapis.com/auth/presentations',
    ];
  
    const scope = scopes.join(' ');
  
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}&response_type=code&scope=${encodeURIComponent(scope)} profile email&access_type=offline&prompt=consent&auth_type=rerequest`;
    window.location.href = authorizationUrl;
    console.log(authorizationUrl)
  };

  useEffect(() => {
    const extractCodeFromURL = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
  
        if (code) {
          console.log('Authorization Code:', code);
          window.history.replaceState(
            {},
            document.title,
            url.origin + url.pathname
          );
          await handleAuthorizationCode(code);
        }
      } catch (error) {
        console.error('Error extracting authorization code:', error);
      }
    };
  
    extractCodeFromURL();
  }, []);
  

  const handleAuthorizationCode = async (code) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/auth/google/callback`,
        { code },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const token = response.data.token;
      const access_token = response.data.access_token
      updateLocalToken(token)
      updateAccessToken(access_token)
      window.location.reload();
    } catch (error) {
      console.error('Error sending code to backend:', error);
    
    }
  };
  
  

  const loginUser = () => {
    let userData = { name: "muni" };
    updateLocalUserData(userData);
    appDispatch({ type: "setUserData", value: userData });
  };
  return (
    <div className="container login-content">
      <div className="header"></div>
      <div className="login-btn-container">
        <div onClick={handleGoogleLogin} className="login-btn">
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
