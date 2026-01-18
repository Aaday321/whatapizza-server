import { Settings } from "../../config/settings.js";
import BaseHttpClient from '../base_http_client.js';



export default class DoorDashClient extends BaseHttpClient {
    constructor() {
        super({
            baseURL: Settings.Servers.DoorDash.Routes.ROOT,
            secret: Settings.Servers.DoorDash.SECRET,
        })
    }
}