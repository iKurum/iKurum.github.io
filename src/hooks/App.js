import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OutLook from '../pages/OutLook';
import Article from '../pages/Article';

import OneDriveNesting from './OneDriveNesting';
import { baseConfig } from '../config';
import Loading from '../hooks/Loading';
import GetInfo from '../utils/GetInfo';
import { ArrayBufferToBase64, SearchURL } from '../utils/Func';
import css from '../assets/css/App.module.css';
import tokenContext from '../utils/Context';

function Head() {
  const [data, setData] = useState({});
  const [token, setToken] = useState({});
  const [photo, setPhoto] = useState('');
  const [login, setLogin] = useState(true);
  const loginURL = `${baseConfig.loginURL}?client_id=${baseConfig.client_id}&response_type=code&redirect_uri=${baseConfig.redirect_uri}&response_mode=query&scope=${baseConfig.scope}&state=login`;
  const change = useCallback((set, data) => {
    set(data);
  }, [])

  useEffect(() => {
    // 首次登录
    const searchURL = SearchURL(window.location.search);
    if (searchURL.state === 'login') {
      fetch(`/api/login?code=${searchURL.code}&state=${searchURL.state}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    }

    //更新 access_token
    fetch('/api/token', {
      method: 'POST',
      body: JSON.stringify({
        'state': 'getToken'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.code !== 200) {
          console.log(data);
          change(setLogin, false);
        } else {
          change(setToken, data.access_token);
        }
      })
  }, [change])

  useEffect(() => {
    GetInfo('/photo/$value', 'arrayBuffer', token)
      .then(data => {
        change(setPhoto, ArrayBufferToBase64(data));
      })
    GetInfo('/', 'json', token)
      .then(data => {
        change(setData, data);
      })
  }, [token, change])

  return (
    <tokenContext.Provider value={{ change, token }}>
      <div className={css.App}>
        {
          login
            ?
            data.givenName
              ?
              <BrowserRouter>
                <header>
                  <NavLink to='/'>
                    <img
                      src={`data:image/png;base64,${photo}`}
                      className={css.userPhoto}
                      alt='user'
                    />
                  </NavLink>
                  <NavLink to='/profile'>
                    <p className={css.userName}>{data.givenName}</p>
                  </NavLink>
                  <ul>
                    <NavLink to='/onedrive'>
                      <li className={css.nav}>
                        <i className='iconfont icon-jifangguanli'>OneDrive</i>
                      </li>
                    </NavLink>
                    <NavLink to='/outlook'>
                      <li className={css.nav}>
                        <i className='iconfont icon-185078emailmailstreamline'>OutLook</i>
                      </li>
                    </NavLink>
                    <NavLink to='/article'>
                      <li className={css.nav}>
                        <i className='iconfont icon-article'>Article</i>
                      </li>
                    </NavLink>
                  </ul>
                  {/* <p className={css.logout} onClick={Logout}>LOGOUT</p> */}
                </header >
                <div className={css.page}>
                  <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/profile' component={Profile}></Route>
                    <Route path='/onedrive' component={OneDriveNesting}></Route>
                    <Route path='/outlook' component={OutLook}></Route>
                    <Route path='/article' component={Article}></Route>
                  </Switch>
                </div>
              </BrowserRouter>
              :
              <Loading />
            :
            <>
              <p>请点击下方链接登录 ...</p>
              <a href={loginURL}>{loginURL}</a>
            </>
        }
      </div>
    </tokenContext.Provider>
  );
}

export default Head;