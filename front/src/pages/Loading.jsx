import React, { useEffect, useState } from 'react';
import loading from '../img/loading.gif';
import '../component/main/styles/Loading.css';




function Loading() {

  return (
    <div className="loading">
      <img src={loading} alt="로딩 중" />
    </div>
  );
}

export default Loading;
