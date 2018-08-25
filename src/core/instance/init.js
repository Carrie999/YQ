// import { observe } from './observer/index';
// import Dep from './observer/dep';
// import Watcher from './observer/watcher';
// import { initDom } from './dom/initDom'
// import { noop, warn, isPlainObject } from './utils';

// const sharedPropertyDefinition = {
//     enumerable: true,
//     configurable: true,
//     get: noop,
//     set: noop
// }
import { mergeOptions } from '../util/index'
import { initEvents } from './events'
import { initProxy } from './proxy'
import { initState } from './state'

let uid = 0

export function initMixin(YQ) {
  
  YQ.prototype._init = function (options) {
    // console.log(options)

    const vm = this
    // console.log(vm)
    // console.log(vm.constructor.options)

    vm._uid = uid++

    vm._isYQ = true

    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )


    initProxy(vm)

    vm._self = vm
    initEvents(vm)
    initState(vm)

    // console.log(vm)

    // console.log(vm.$options)
    // this._watchers = [];
    // this.$options = opt;
    // initData(this);
    // initComputed(this);
    // initWatch(this);
    // initDom(this);
  }
}


export function resolveConstructorOptions (Ctor) {
  let options = Ctor.options
  return options
}

// function initWatch(vm) {
//     var watch = vm.$options.watch;
//     if (watch) {
//         for (const key in watch) {
//             const handler = watch[key]
//             if (Array.isArray(handler)) {
//                 for (let i = 0; i < handler.length; i++) {
//                     createWatcher(vm, key, handler[i])
//                 }
//             } else {
//                 createWatcher(vm, key, handler)
//             }
//         }
//     }
// }

// function createWatcher(vm, key, handler) {
//     let options
//     //是个对象时，主要为了写deep属性
//     if (isPlainObject(handler)) {
//         options = handler
//         handler = handler.handler
//     }
//     //直接写方法名时 
//     if (typeof handler === 'string') {
//         handler = vm[handler]
//     }
//     vm.$watch(key, handler, options)
// }



// //初始化计算属性
// const computedWatcherOptions = { lazy: true }
// function initComputed(vm) {
//     var computed = vm.$options.computed;
//     if (!computed) return;
//     const watchers = vm._computedWatchers = Object.create(null)
//     for (const key in computed) {
//         const userDef = computed[key]
//         let getter = typeof userDef === 'function' ? userDef : userDef.get

//         watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions)
//         if (!(key in vm)) {
//             defineComputed(vm, key, userDef)
//         } else {
//             warn(`计算属性 "${key}" 已经被定义了哦`)
//         }
//     }

// }
// //定义当个计算属性
// export function defineComputed(target, key, userDef) {
//     if (typeof userDef === 'function') {
//         sharedPropertyDefinition.get = createComputedGetter(key)
//         sharedPropertyDefinition.set = noop
//     } else {
//         sharedPropertyDefinition.get = userDef.get
//             ? userDef.cache !== false
//                 ? createComputedGetter(key)
//                 : userDef.get
//             : noop
//         sharedPropertyDefinition.set = userDef.set
//             ? userDef.set
//             : noop
//     }
//     //在VM上绑定computed
//     Object.defineProperty(target, key, sharedPropertyDefinition)
// }
// //创建计算属性默认get方法
// function createComputedGetter(key) {
//     return function computedGetter() {
//         const watcher = this._computedWatchers && this._computedWatchers[key]
//         if (watcher) {
//             if (watcher.dirty) {
//                 watcher.evaluate()
//             }
//             if (Dep.target) {
//                 watcher.depend()
//             }
//             return watcher.value
//         }
//     }
// }
// //初始化data属性
// function initData(vm) {
//     var data = vm.$options.data;
//     if (data) {
//         typeof data === 'object' ? data = vm.$data = JSON.parse(JSON.stringify(data)) : warn('data should object')
//     } else {
//         return;
//     }
//     const keys = Object.keys(data)
//     let i = keys.length;
//     //代理data到vm
//     while (i--) {
//         proxy(vm, '$data', keys[i])
//     }
//     //观察data
//     observe(data, true);
// }

// //代理 在vm上直接访问$date上面的data
// export function proxy(target, sourceKey, key) {
//     sharedPropertyDefinition.get = function proxyGetter() {
//         return this[sourceKey][key]
//     }
//     sharedPropertyDefinition.set = function proxySetter(val) {
//         this[sourceKey][key] = val
//     }
//     Object.defineProperty(target, key, sharedPropertyDefinition)
// }

