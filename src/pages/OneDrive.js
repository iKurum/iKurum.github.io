import React, { useEffect, useState, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Loading from '../hooks/Loading';
import Folder from '../hooks/Folder';
import GetInfo from '../utils/GetInfo';
import tokenContext from '../utils/Context';
import css from '../assets/css/OneDrive.module.css';

function OneDrive() {
  const [folderData, setFolderData] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();
  const childRef = useRef();
  const { change, token } = useContext(tokenContext);

  // 导航跳转
  function goto(i) {
    return () => {
      const a = '/' + pathname.split('/').slice(1, pathname.split('/').length).slice(0, i).join('/');
      history.push(a);
    };
  }

  useEffect(() => {
    if (token) {
      childRef.current.isNotOk();
      GetInfo(`${!!pathname.substring(9) ? `${pathname.substring(9)}:` : ':'}/children`, 'json', token, 'onedrive')
        .then(d => {
          change(setFolderData, d.value);
        })
        .then(() => {
          childRef.current.isOk();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [change, pathname, token])

  return (
    <>
      <p className={css.nav}>
        {
          pathname.split('/').map((v, i) => {
            if (i) {
              return <span key={i} onClick={goto(i)}>{v === 'onedrive' ? '/' : v}</span>
            }
            return null;
          })
        }
      </p>
      <Folder
        value={folderData}
        loading={childRef}
      />
      <Loading ref={childRef} cRef={childRef} />
    </>
  );
}

export default OneDrive;