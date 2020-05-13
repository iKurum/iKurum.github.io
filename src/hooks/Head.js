import React, { useState, useContext, useEffect, useRef } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import OutLook from '../pages/OutLook';
import OneDriveNesting from './OneDriveNesting';
import microContext from '../utils/Context';
import { Logout } from '../utils/Login';
import { ArrayBufferToBase64 } from '../utils/Func';
import css from '../assets/css/Head.module.css';

function Head() {
  const [data, SetData] = useState({});
  const [photo, SetPhoto] = useState('');
  const { micro, change } = useContext(microContext);
  const UserPhoto = useRef(null)

  useEffect(() => {
    if (micro.url) {
      micro.url('/me?$select=givenName', 'json')
        .then(d => {
          change(SetData, d);
        })
        .catch(err => {
          alert(err);
        });
      micro.url('/me/photo/$value', 'arrayBuffer')
        .then(d => {
          change(SetPhoto, ArrayBufferToBase64(d));
        })
        .catch(err => {
          alert(err);
        });
    }
  }, [micro, change])

  return (
    <>
      {
        data.givenName
          ?
          <BrowserRouter>
            <header>
              <NavLink to='/'>
                <img
                  src={`data:image/png;base64,${photo}`}
                  ref={UserPhoto}
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
              </ul>
              <p className={css.logout} onClick={Logout}>LOGOUT</p>
            </header >
            <div className={css.page}>
              <Switch>
                <Route exact path='/' component={Home}></Route>
                <Route path='/profile' component={Profile}></Route>
                <Route path='/onedrive' component={OneDriveNesting}></Route>
                <Route path='/outlook' component={OutLook}></Route>
              </Switch>
            </div>
          </BrowserRouter>
          :
          <>加载中 ...</>
      }
    </>
  );
}

export default Head;