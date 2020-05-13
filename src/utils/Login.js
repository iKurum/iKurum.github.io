import * as Msal from "msal";
import config from '../config';

const msalInstance = new Msal.UserAgentApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri
  }
});

const tokenRequest = {
  scopes: ["user.read"]
};

export function Login() {
  console.log('login ...');
  if (msalInstance.getAccount()) {
    return accessToken();
  } else {
    return init();
  }
}

export function Logout() {
  msalInstance.logout();
}

async function init() {
  sessionStorage.clear();
  try {
    console.log('初始化 ...');
    await msalInstance.loginPopup()
    console.log(msalInstance.getAccount());
    await accessToken();
  }
  catch (err) {
    let error = {};

    if (typeof (err) === 'string') {
      let errParts = err.split('|');
      error = errParts.length > 1
        ?
        { message: errParts[1], debug: errParts[0] }
        :
        { message: err };
    } else {
      error = {
        message: err.message,
        debug: JSON.stringify(err)
      };
    }

    return Promise.reject({
      fn: 'loginPopup',
      err: error
    })
  }
}

function accessToken() {
  return msalInstance.acquireTokenSilent(tokenRequest)
    .then(res => res.accessToken)
    .catch(err => {
      if (err.name === "InteractionRequiredAuthError") {
        return msalInstance.acquireTokenPopup(tokenRequest)
          .then(res => res.accessToken)
          .catch(err => {
            console.log(err);
          });
      }
    })
}
