import { initMixin } from './init' 
import { initConfig } from './initConfig' 
import { eventsMixin } from './events'
import { stateMixin } from './state'

function YQ (options) {
  console.log('YQ execute')
  this._init(options)  
}
initConfig(YQ)
initMixin(YQ);  
stateMixin(YQ)
eventsMixin(YQ)


window.YQ = YQ
export default YQ








//main.js 
// const greeter = require('./Greeter.js');
// console.log(document.querySelector("#root"))
// document.querySelector("#root").appendChild(greeter());
// const cc = 1 