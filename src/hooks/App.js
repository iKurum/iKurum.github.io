import React, { useEffect, useState, useCallback } from 'react';
import GetInfo from '../utils/MicroAPI';
import Head from './Head';
import microContext from '../utils/Context';
import { Login } from '../utils/Login';
import css from '../assets/css/App.module.css';

function GetToken() {
  const [token, SetToken] = useState('');
  const [micro, SetMicro] = useState('');

  const change = useCallback((set, data) => {
    set(data);
  }, [])

  const getToken = useCallback(() => {
    Login().then(t => {
      change(SetToken, t);
    }).catch(err => {
      console.log(err);
    });
  }, [change])

  useEffect(() => {
    if (sessionStorage.getItem('msal.idtoken')) {
      getToken();
    } else {
      Login()
        .then(() => {
          getToken();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [getToken])

  useEffect(() => {
    const g = new GetInfo();
    if (token) {
      g.init(token);
    }
    change(SetMicro, g);
  }, [change, token])

  return (
    <microContext.Provider value={{
      micro,
      change
    }}>
      <div className={css.app}>
        <Head />
      </div>
    </microContext.Provider>
  );
}

export default GetToken;