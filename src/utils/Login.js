import * as Msal from "msal";
import { config } from '../config';

const msalInstance = new Msal.UserAgentApplication(config.msal);
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

function init() {
  console.log('初始化 ...');
  sessionStorage.clear();
  msalInstance.loginPopup()
    .catch(err => {
      alert(err);
    });
  return accessToken();
}

function accessToken() {
  console.log('Token:');
  if (msalInstance.getAccount()) {
    console.log('尝试获取 Token 1 ...');
    return msalInstance.acquireTokenSilent(tokenRequest)
      .then(res => {
        console.log('尝试获取 Token 1 ...ok');
        return res.accessToken;
      })
      .catch(err => {
        console.log('尝试获取 Token 2 ...');
        if (err.name === "InteractionRequiredAuthError") {
          return msalInstance.acquireTokenPopup(tokenRequest)
            .then(res => {
              console.log('尝试获取 Token 2 ...ok');
              return res.accessToken;
            })
            .catch(err => {
              console.log('获取失败 Token ...');
              console.log(err);
            });
        }
      })
  } else {
    console.log('尝试刷新 ...')
    console.log('reload ... 1s');
    let timer = null;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log('reload ...');
      window.location.reload()
    }, 1000);
    return new Promise(() => '', () => '');
  }
}