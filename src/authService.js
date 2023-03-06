
import auth0 from "auth0-js";
import {user, isAuthenticated, popupOpen} from "./store";
import config from "../auth_config"; 



async function createClient() {
    let auth0Client = new auth0.WebAuth({
        domain: config.domain,
        clientID: config.clientId
      });

      return auth0Client
}


async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
      await client.loginWithPopup;

      user.set(await client.getUser);
      //isAuthenticated.set(true);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    } finally {
        popupOpen.set(false);
    }
    
  }

  function logout(client) {
    return client.logout();
  }

const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth;