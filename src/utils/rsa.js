import Vue from 'vue'
import JsEncrypt from 'jsencrypt'
Vue.prototype.$encruption = function (obj) {
  let encrypt = new JsEncrypt()
  encrypt.setPublicKey(
    `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo12OUh9GLxnFPtwCB4JirtSToKb3h1CH
                 kMQWGbSDRshdQg0AIqf3Nd5a6+V2mMJN/tBwnXX+t0US2FXGvHfrTo0XncXqDaR4B8ZDAuEhuLBJ
                 gqFE7vhf2voA+vvVb6ov4zhFWGWBJAZ/xV6XAhh7xW5BwTZgje3oTi1EvxpX3wD5Zwl+OW3r2CAf
                 U4rbxTk3HuXq+CjTMwfEPl3HHrb88JLSFq8sxXJj9o6VQ+poB5mDKgyraxMSESBsdQk48GQ19PtT
                 CvKWbP9jddLjfxZMbCx0PnJs/UUTWnYOShQbHL4HDIQ4FtrhaL5luO7zge+vPMUlKgNzZUUDuGjM
                 afBCJwIDAQAB
                 -----END PUBLIC KEY-----`
  )
  return encrypt.encrypt(obj)
}

Vue.prototype.$decryption = function (obj) {
  let decrypt = new JsEncrypt()
  decrypt.setPrivateKey(
    `-----BEGIN PRIVATE KEY-----
    MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjXY5SH0YvGcU+3AIHgmKu1JOg
    pveHUIeQxBYZtINGyF1CDQAip/c13lrr5XaYwk3+0HCddf63RRLYVca8d+tOjRedxeoNpHgHxkMC
    4SG4sEmCoUTu+F/a+gD6+9Vvqi/jOEVYZYEkBn/FXpcCGHvFbkHBNmCN7ehOLUS/GlffAPlnCX45
    bevYIB9TitvFOTce5er4KNMzB8Q+XccetvzwktIWryzFcmP2jpVD6mgHmYMqDKtrExIRIGx1CTjw
    ZDX0+1MK8pZs/2N10uN/FkxsLHQ+cmz9RRNadg5KFBscvgcMhDgW2uFovmW47vOB7688xSUqA3Nl
    RQO4aMxp8EInAgMBAAECggEAPKkNosLIHc805a1t93nbyM1Yb+vvt8gYPpIBHtRfdpYJwu/u3+98
    pP0Gx9cxnXFw4rBlUKKyzTyRzdCz9eGVd1p+rXADA8PRahmdYmFUUy7qbN4TKaUCet4gJRID4+3O
    0FFhtnwiYs0i/per/PQ4aUwSkHrviWQQwY6fm1Jd1IkBMedPgvMkq8wSovhT0RTR8TBKI/x5nfs8
    EXbHj3lMNh4mm2T7IeYgZqot3Sh3B8aNe0v2lcwbMKyrTXppFifpleVcUrrWzssK+kePEyFwg/LC
    X2RD7LFx5gnJyeBMpf3uIdLdHhJQ07LAakGU3x0EcU5sUoZzRdKa2+dIQlprcQKBgQDOOh5pgJ2c
    1H8PvqKIkTDQ0QMtJ1cH3vh+5bBPrk9C23B+x8+fQdVC7sUsmu4HjERDBcAtwd6aABqtJodq062u
    0LSFJ/dTXA5y5A5WRBz+jzcAhuihlLJ3PQwvbxFgLErF0dwzIjfIl3t++g5XDTDUW5L+X1u3n7hu
    P55FO/C63wKBgQDKyzRua/hRzXRo/+/GeagnSlaNADRxXlbOINxqkhdWceTkfItN8a4VdfcfWAhF
    19Ez9h9iEel72x7ORltxow0b2hzDw/+3e4IzLXSg+ractzX0yywMjucu2dOzqiUn9rQToNXgO0ig
    o4aK6v9hW94HqL934QXTL5nPhoHrIeSpuQKBgFK5a5OknRTZBLMbJHWl0DAjd6O4QSgOIB4/Is+D
    u5W1EtY4bqeSr+pufzeaWls6v/MmrmVsfE/INOs6Jl4K1YPnglJbqtGMfttFch7Wqc7PQh/6/fw6
    +q/sFCQ+6Hhsq/3YZf04/6l+YnKX+gKfbvPwW/Gf7Nmmv0OyT1m0Zqd/AoGBALWN4T3ued06lDqg
    z9if+BRc8EnB4jGQ5SQbtVnPuwcQZnzMp6a7dUAPYZP1K0rkIY5kjcouARt6nATOZnXBJS5HQjNd
    mOV6tKD+1Ah/DNgXCj5DWwdPNNfz+h1CeYtiyes8td3PFYGDhSN/qe1O4uN2hxxbH+znE8wAPvX0
    XRQ5AoGBAL9D+k5n5EpUxrjYJLfBVXlqMdqjyMKid7HCvIjgLVn0OOf9nM5ubDHjuQkSsKnbMFbd
    a95EbwKgjrLQWm4sObnFVRXbbCeMHECLsrN2XEGs6IPtM+WUnp/Dd5tpbS3Ub9hqI8lfotvD/bLE
    rcktv5h4+KY1xgUR2GGcpZEa/pfl
          -----END PRIVATE KEY-----`
  )
  return decrypt.decrypt(obj)
}
