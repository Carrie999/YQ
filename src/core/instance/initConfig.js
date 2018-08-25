import { ASSET_TYPES } from 'shared/constants'

export function initConfig(YQ) {
  YQ.options = Object.create(null)
  YQ.options._base = YQ
  ASSET_TYPES.forEach(type => {
    YQ.options[type + 's'] = Object.create(null)
  })
}