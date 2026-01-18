import type { Context } from "hono";
import DoorDashService from "../external_services/doordash/service.js";

export default class DoordashController {
    constructor(
        private doordashService: DoorDashService = new DoorDashService()
    ){}
    placePizzaOrder(context: Context){
        this.doordashService.orderPizza()
        context.status(202)
        return context.text('Pizza order placed!')
    }
}