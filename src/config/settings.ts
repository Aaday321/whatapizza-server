export const Settings = {
    PORT: 3126,

    SERVICE_NAME: 'what-a-pizza',
    SERVICE_ID_CODE: (process.env.ENV || '') + "_01",

    Servers: {
        DoorDash: {
            Routes: {
                ROOT: 'https://openapi.doordash.com/'
            },
            SECRET: process.env.DOORDASH_SECRET || '',
        }
    },

    PersonalInformation: {
        phoneNumber: process.env.PERSONAL_PHONE_NUMBER || '',
        address: process.env.PERSONAL_ADDRESS || ''
    }
}

console.dir(Settings, { depth: null })