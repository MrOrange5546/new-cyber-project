const md5 = require('md5')
const cryptoJs = require('crypto-js')
const cryptoKey = 'my-secret-key'

const appId = 'api::ariticle.ariticle'
module.exports = {
    async beforeCreate(event) {
        const Email = event.params.data.Email
        const Text = event.params.data.Text
        const mobile = event.params.data.mobile


        
        event.params.data.Email = await strapi.service(appId).encrypt(Email)
        event.params.data.Text = await strapi.service(appId).encrypt(Text)
        event.params.data.mobile = await strapi.service(appId).encrypt(mobile)


    },
    async afterFindOne(event) {

        const Email = event.result.Email
        const Text = event.result.Text
        const mobile = event.result.mobile



        event.result.Email = await strapi.service(appId).decrypt(Email)
        event.result.Text = await strapi.service(appId).decrypt(Text)
        event.result.mobile = await strapi.service(appId).decrypt(mobile)


    },
    async afterFindMany(event) {
        console.log('afterFindMany ', event.result)
        event?.result?.map(async result => {
            console.log('result ', result)
            result.Email = await strapi.service(appId).decrypt(result.Email)
            result.Text = await strapi.service(appId).decrypt(result.Text)
            result.mobile = await strapi.service(appId).decrypt(result.mobile)


            return result 
        })
    }
}