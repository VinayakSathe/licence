export const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Get the payload part
      const base64 = atob(base64Url); // Decode Base64
      return JSON.parse(base64);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };
  
  export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    const decoded = decodeToken(token);
    return decoded?.roles || []; // Returns roles array
  };
  

  export const getTokenDetails = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    return decodeToken(token); // Returns entire token payload
  };