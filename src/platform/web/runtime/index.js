/* @flow */

import YQ from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'


// console.log(YQ)
// install platform specific utils
// YQ.config.mustUseProp = mustUseProp
// YQ.config.isReservedTag = isReservedTag
// YQ.config.isReservedAttr = isReservedAttr
// YQ.config.getTagNamespace = getTagNamespace
// YQ.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
extend(YQ.options.directives, platformDirectives)
extend(YQ.options.components, platformComponents)

// install platform patch function
YQ.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
YQ.prototype.$mount = function (
  el,
  hydrating
) {
  console.log(el)
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', YQ)
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the YQ Devtools extension for a better development experience:\n' +
          'https://github.com/YQjs/YQ-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running YQ in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://YQjs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default YQ
