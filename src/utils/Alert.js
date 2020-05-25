window.alert = function (str) {
  const alertBox = document.createElement("div");
  const certainFunc = () => {
    console.log(alertBox.current);
    // alertBox.parentNode.removeChild(alertBox);
  };
  alertBox.id = "alertBox";

  let strHtml = "";
  strHtml += `<div id="title">提示：<div id="close" οnclick="${certainFunc()}">X</div></div>`;
  strHtml += '<div id="content">' + str + '</div>';
  strHtml += '<div id="certain"><input id="btn" type="button" value="确 定" οnclick="certainFunc()" onhover="hoverFunc()"/></div>';
  alertBox.innerHTML = strHtml;
  document.body.appendChild(alertBox);
  var title = document.getElementById("title");
  title.style.textAlign = "left";
  title.style.marginTop = "20px";
  title.style.paddingLeft = "20px";
  title.style.height = "30px";
  title.style.fontSize = "15px";
  var close = document.getElementById("close");
  close.style.width = "16px";
  close.style.height = "16px";
  close.style.marginRight = "20px";
  close.style.background = "url('images/close.png')";
  close.style.float = "right";
  var content = document.getElementById("content");
  content.style.margin = "20px";
  content.style.fontSize = "12px";
  var certain = document.getElementById("certain");
  certain.style.position = "relative";
  certain.style.height = "50px";
  
  var btn = document.getElementById("btn");
  btn.style.width = "60px";
  btn.style.height = "30px";
  btn.style.background = "#cccccc";
  btn.style.border = "1px solid grey";
  btn.style.position = "absolute";
  btn.style.borderRadius = "5px";
  btn.style.right = "20px";
  btn.style.bottom = "20px";
  btn.style.marginTop = "10px";
  btn.style.cursor = "pointer";
  btn.style.color = "#333";
}