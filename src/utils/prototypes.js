/**
 * Modify localStorage with setObject to stringify objects
 * @see http://stackoverflow.com/a/3146971/836205
 * @param key
 * @param value
 */
Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value))
}

/**
 * Modify localStorage with getObject to parse json strings
 * @see http://stackoverflow.com/a/3146971/836205
 * @param key
 * @returns {string | any}
 */
Storage.prototype.getObject = function (key) {
  let value = this.getItem(key)
  return value && JSON.parse(value)
}
