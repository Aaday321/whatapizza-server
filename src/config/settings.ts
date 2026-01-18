export const Settings = {
    PORT: 3126,

    SERVICE_NAME: 'what-a-pizza',

    Servers: {
        DoorDash: {
                Routes: {
                    ROOT: 'https://openapi.doordash.com/'
                },
                SECRET: process.env.DOORDASH_SECRET || '',
            }
        }
    },
}