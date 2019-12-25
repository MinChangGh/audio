/**
 * 工具类
 */
import CryptoJS from 'crypto-js'
export function getOwnParam (b, url) {
  var c = url
  if (!b) {
    return c
  }
  var d = new RegExp('[?&]' + b + '=([^&]+)', 'g')
  var g = d.exec(c)
  var a = null
  if (null !== g) {
    try {
      a = decodeURIComponent(decodeURIComponent(g[1]))
    } catch (f) {
      try {
        a = decodeURIComponent(g[1])
      } catch (f) {
        a = g[1]
      }
    }
  }
  return a
}
export function getParam (b) {
  var c = document.location.href
  if (!b) {
    return c
  }
  var d = new RegExp('[?&]' + b + '=([^&]+)', 'g')
  var g = d.exec(c)
  var a = null
  if (null !== g) {
    try {
      a = decodeURIComponent(decodeURIComponent(g[1]))
    } catch (f) {
      try {
        a = decodeURIComponent(g[1])
      } catch (f) {
        a = g[1]
      }
    }
  }
  return a
}

export function encrypt (word, keyStr) {
  keyStr = keyStr || 'djy3018ezysjyxgs'
  var key = CryptoJS.enc.Utf8.parse(keyStr)
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

// 解密
export function decrypt (word, keyStr) {
  keyStr = keyStr || 'djy3018ezysjyxgs'
  //   var key = CryptoJS.enc.Latin1.parse(keyStr)
  //   var decrypt = CryptoJS.AES.decrypt(word, key, {
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.ZeroPadding
  //   })
  //   return CryptoJS.enc.Utf8.stringify(decrypt).toString()

  var key = CryptoJS.enc.Latin1.parse(keyStr)
  var iv = CryptoJS.enc.Latin1.parse(keyStr)
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}
