/* eslint-disable no-extend-native */
String.prototype.pad = function (length) {
  let ret = String(this)
  while (ret.length < (length || 0)) {
    ret = `0${ret}`
  }
  return ret
}
