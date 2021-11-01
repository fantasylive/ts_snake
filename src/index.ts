import './style/index.scss'
import GameControl from './moduls/GameControl'
import GameControlM from './moduls/GameControlM';

// PC端移动端判断
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
      }
  }
  return flag;
}

if(IsPC()) {
  new GameControl()
}else {
  new GameControlM()
}

