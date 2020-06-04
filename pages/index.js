// import SnowflakeApp from '../components/SnowflakeApp'
import Dashboard from '../components/Dashboard'
import React from 'react';
import ReactDOM from 'react-dom';

export default () => <div id="root"><div id="root1"></div><div id="root2"></div></div>
  
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
//   console.log(document);
//   var temp = document.createElement("div");

// ReactDOM.render(
//       <Dashboard />,temp,
// );
var container = document.getElementById("root");
var root1 = document.getElementById("root1");
var root2 = document.getElementById("root2");
console.log(container);
ReactDOM.render(<Dashboard />, root1);

container.replaceChild(document.querySelector("#content"), document.getElementById("content"));



}
