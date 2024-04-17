'use strict';

/**
 * ariticle service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const cryptoJs = require('crypto-js')
const cryptoKey = 'my-secret-key'

module.exports = createCoreService('api::ariticle.ariticle', ({ strapi }) => ({
    async encrypt(data) {
        return cryptoJs.AES.encrypt(data, cryptoKey).toString()
    },
    async decrypt(data) {
        const makeDecrypt = cryptoJs.AES.decrypt(data, cryptoKey)
        return makeDecrypt.toString(cryptoJs.enc.Utf8)
    }
}));