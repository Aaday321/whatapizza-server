import DoorDashClient from "./http.js";

export default class DoorDashService {
    constructor(
        protected http = new DoorDashClient()
    ){}

    async orderPizza(){

    }
}