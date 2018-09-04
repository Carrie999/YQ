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
import { initLifecycle, callHook } from './lifecycle'
import { initWatcher } from './initWatcher'
import { initRender } from './render'

let uid = 0

export function initMixin(YQ) {
  
  YQ.prototype._init = function (options) {
    // console.log(options)

    const vm = this
    // console.log(vm)
    // console.log(vm.constructor.options)

    vm._uid = uid++

    vm._isYQ = true
    
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    

    initProxy(vm)

    vm._self = vm

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initWatcher(vm)
    initState(vm)
    callHook(vm, 'created')

    
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }


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


export function initInternalComponent (vm, options) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}


function resolveModifiedOptions (Ctor){
  let modified
  const latest = Ctor.options
  const extended = Ctor.extendOptions
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = dedupe(latest[key], extended[key], sealed[key])
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = []
    sealed = Array.isArray(sealed) ? sealed : [sealed]
    extended = Array.isArray(extended) ? extended : [extended]
    for (let i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i])
      }
    }
    return res
  } else {
    return latest
  }
}

