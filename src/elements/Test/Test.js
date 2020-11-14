import React, { useState } from 'react';

function getList() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve([1, 2, 3]), 1000);
  });
}
export default function Test() {
  const [state, setState] = useState({
    click: false,
    list: [],
  });
  const handleClick = () => {
    setState({
      click: !state.click,
    });
    getList().then((list) => {
      setState({
        isLoading: false,
        list,
        show: false,
      });
    });
  };
  return (
    <div>
      <button onClick={handleClick} disabled={state.click}>
        {state.click ? 'Loading...' : 'Confirm'}
      </button>
    </div>
  );
}
