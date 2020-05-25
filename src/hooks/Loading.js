import React, { useState, useImperativeHandle } from 'react';
import css from '../assets/css/Loading.module.css';

const Loading = React.forwardRef((_, cRef) => {
  const [isLoad, setIsLoad] = useState(true);

  useImperativeHandle(cRef, () => ({
    isOk: () => {
      setIsLoad(false);
    },
    isNotOk: () => {
      setIsLoad(true);
    }
  }))

  return (
    <div className={css.wall} style={{display: isLoad ? 'block' : 'none'}}>
      <div className={css.loading}>
        LOADING ...
      </div>
    </div>
  );
})

export default Loading;