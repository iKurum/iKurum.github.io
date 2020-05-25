import React, { useRef, useEffect, useState, useImperativeHandle } from 'react';
import Loading from './Loading';
import css from '../assets/css/Iframe.module.css';

const Iframe = React.forwardRef((props, cRef) => {
  const [isLoad, setIsLoad] = useState(false);
  const ifrRef = useRef();
  const childRef = useRef();

  useImperativeHandle(cRef, () => ({
    isOk: () => {
      setIsLoad(false);
    },
    isNotOk: () => {
      setIsLoad(true);
    }
  }))

  useEffect(() => {
    if (isLoad) {
      if (ifrRef.current.attachEvent) {
        // IE
        ifrRef.current.attachEvent('onload', () => {
          childRef.current.isOk();
        })
      } else {
        // 非IE
        ifrRef.current.onload = () => {
          childRef.current.isOk();
        }
      }
    }
  })

  return (
    <div className={css.wall} style={{ display: isLoad ? 'block' : 'none' }}>
      <Loading ref={childRef} cRef={childRef} />
      <div className={css.ifrBox}>
        <i className='iconfont icon-guanbi' onClick={() => {
          setIsLoad(false);
        }}></i>
        <iframe
          title='preview'
          src={isLoad ? props.src : null}
          className={css.iframe}
          ref={ifrRef}
          seamless
        >
          您当前浏览器不支持 iframe
        </iframe>
      </div>
    </div>
  );
})

export default Iframe;
