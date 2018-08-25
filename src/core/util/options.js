
import {
  ASSET_TYPES,
  LIFECYCLE_HOOKS
} from 'shared/constants'

import {
  extend,
  hasOwn,
  camelize,
  toRawType,
  capitalize,
  isBuiltInTag,
  isPlainObject
} from 'shared/util'


const strats = {}

strats.el = strats.propsData = function (parent, child, vm, key) {
  return defaultStrat(parent, child)
}


function mergeData (to, from) {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)
  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    toVal = to[key]
    fromVal = from[key]
    mergeData(toVal, fromVal)
  }
  return to
}


export function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  return function mergedInstanceDataFn () {
    // instance merge
    const instanceData = typeof childVal === 'function'
      ? childVal.call(vm, vm)
      : childVal
    const defaultData = typeof parentVal === 'function'
      ? parentVal.call(vm, vm)
      : parentVal
    if (instanceData) {
      return mergeData(instanceData, defaultData)
    } else {
      return defaultData
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
){
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
}


function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  const res = Object.create(parentVal || null)
  return res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets
})


strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)

  if (!parentVal) return childVal
  const ret = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child]
  }
  return ret
}

strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {

  if (!parentVal) return childVal
  const ret = Object.create(null)
  extend(ret, parentVal)
  if (childVal) extend(ret, childVal)
  return ret
}
strats.provide = mergeDataOrFn

const defaultStrat = function (parentVal, childVal){
  return childVal === undefined
    ? parentVal
    : childVal
}



export function mergeOptions (
  parent,
  child,
  vm
){

  // normalizeProps(child, vm)
  // normalizeInject(child, vm)
  // normalizeDirectives(child)

  
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}

