import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ByteConvert, FolderIcon } from '../utils/Func';
import css from '../assets/css/Folder.module.css';

function Folder(props) {
  const { pathname } = useLocation();

  return (
    <table>
      <thead>
        <tr className={css.trTh}>
          <th>名称</th>
          <th>大小</th>
          <th>最后修改时间</th>
        </tr>
      </thead>
      <tbody>
        <>
          {
            props.value.map((v, i) => {
              return (
                <tr key={i}>
                  <td>
                    {
                      v.folder
                        ?
                        <NavLink to={`${pathname}/${v.name}`}>
                          <p className={css.tableA}>
                            <i className={FolderIcon(v)} style={{ marginRight: '10px' }}></i>
                            {v.name}
                          </p>
                        </NavLink>
                        :
                        <p className={css.tableA}>
                          <i className={FolderIcon(v)} style={{ marginRight: '10px' }}></i>
                          {v.name}
                        </p>
                    }
                  </td>
                  <td>{ByteConvert(v.size)}</td>
                  <td>{v.lastModifiedDateTime.slice(0, 10)}</td>
                  {
                    v.folder ? null : <td><i className='iconfont icon-xiazai'></i></td>
                  }
                </tr>
              );
            })
          }
        </>
      </tbody>
    </table>
  );
}

export default Folder;