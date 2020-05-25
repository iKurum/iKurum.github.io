import React, { useState, useContext, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ByteConvert, FolderIcon } from '../utils/Func';
import GetInfo from '../utils/GetInfo';
import Iframe from '../hooks/Iframe';
import tokenContext from '../utils/Context';
import css from '../assets/css/Folder.module.css';

function Folder(props) {
  const [ifrSrc, setIfrSrc] = useState('');
  const { pathname } = useLocation();
  const { change, token } = useContext(tokenContext);
  const childRef = useRef();

  const getPreview = id => {
    props.loading.current.isNotOk();
    GetInfo(id, 'json', token, 'preview')
      .then(data => {
        change(setIfrSrc, data.getUrl);
      })
      .then(() => {
        props.loading.current.isOk();
        childRef.current.isNotOk();
      })
      .catch(err => {
        console.log(err);
        props.loading.current.isOk();
      })
  };

  const getContent = downURL => {
    window.location.href = downURL;
  };

  return (
    <>
      <table>
        <thead>
          <tr className={css.trTh}>
            <th>名称</th>
            <th>大小</th>
            <th>最后修改时间</th>
          </tr>
        </thead>
        <tbody>
          {
            props.value.map((v, i) => {
              return (
                <tr key={i}>
                  <td>
                    {
                      v.folder
                        ?
                        <NavLink
                          to={`${pathname}/${v.name}`}
                          onClick={() => {
                            props.loading.current.isNotOk();
                          }}
                        >
                          <p className={css.tableA}>
                            <i
                              className={FolderIcon(v)}
                              style={{ marginRight: '10px' }}
                            >
                            </i>
                            {v.name}
                          </p>
                        </NavLink>
                        :
                        <p className={css.tableA} onClick={() => {
                          getPreview(v.id);
                        }}>
                          <i
                            className={FolderIcon(v)}
                            style={{ marginRight: '10px' }}
                          >
                          </i>
                          {v.name}
                        </p>
                    }
                  </td>
                  <td>{ByteConvert(v.size)}</td>
                  <td>{v.lastModifiedDateTime.slice(0, 10)}</td>
                  {
                    v.folder ? null :
                      <td>
                        <i className='iconfont icon-xiazai' onClick={() => {
                          getContent(v['@microsoft.graph.downloadUrl']);
                        }}></i>
                      </td>
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <Iframe src={ifrSrc} ref={childRef} cRef={childRef} />
    </>
  );
}

export default Folder;