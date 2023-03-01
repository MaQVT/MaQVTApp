import moment from "moment/moment";
import { verifyJwt } from "./jwt";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token || token == null) {
      console.log("TOKEN : " + token);
      return false;
  }

  try {
    const payload = verifyJwt(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
    if(payload.exp*1000 < Date.now()) throw new console.error("Token Expired");
    console.log("EMAIL : " + payload.email);
    return payload.email !== undefined;
  } catch (err) {
    return false;
  }
};

export const isAuth = (token) => {  
    if (!token || token == null) {
        console.log("TOKEN : " + token);
        return false;
    }
  
    try {
      const payload = verifyJwt(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      if(payload.exp*1000 < Date.now()) throw new console.error("Token Expired");
      console.log("EMAIL : " + payload.email);
      return payload.email !== undefined;
    } catch (err) {
      return false;
    }
  };

export const authenticate = (token) => {
    localStorage.setItem('token', token);
    const {email, role, username} = verifyJwt(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
};

export const unauthenticate = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
};
  