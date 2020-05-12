import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import microContext from '../utils/Context';
import { ByteConvert } from '../utils/Func';
import Folder from '../hooks/Folder';
import css from '../assets/css/OneDrive.module.css';

function OneDrive() {
  const { micro, change } = useContext(microContext);
  const [data, SetData] = useState({});
  const [folderData, SetFolderData] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();

  function goto(i) {
    return () => {
      const a = '/' + pathname.split('/').slice(1, pathname.split('/').length).slice(0, i).join('/');
      history.push(a);
    };
  }

  useEffect(() => {
    if (micro.url) {
      micro.url(`/me/drive/root${!!pathname.substring(9) ? `:${pathname.substring(9)}` : ''}`, 'json')
        .then(d => {
          change(SetData, d);
        })
        .catch(err => {
          alert(err);
        });

      micro.url(`/me/drive/root${!!pathname.substring(9) ? `:${pathname.substring(9)}:` : ''}/children`, 'json')
        .then(d => {
          change(SetFolderData, d.value);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, [micro, change, pathname])

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
      {
        data.fileSystemInfo
          ?
          <div className={css.infobox}>
            <p className={css.datainfo}>
              <span>
                创建时间：
                {data.fileSystemInfo.createdDateTime.slice(0, 10)}
              </span>
              <span>
                上次修改时间：
                {data.fileSystemInfo.lastModifiedDateTime.slice(0, 10)}
              </span>
              <span>
                已使用空间：
                {ByteConvert(data.size)}
              </span>
            </p>
            <hr />
          </div>
          :
          <>加载中 ...</>
      }
      {
        folderData.length > 0
          ?
          <Folder value={folderData} />
          :
          <>加载中 ...</>
      }
    </>
  );
}

export default OneDrive;