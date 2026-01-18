import type { AxiosInstance } from "axios";
import DoorDashClient from "./http.js";
import { Settings } from "../../config/settings.js";

export default class DoorDashService {
    constructor(
        protected http: AxiosInstance = new DoorDashClient().http,
        protected personalInformation = Settings.PersonalInformation
    ){}

    async orderPizza(){
        const body = JSON.stringify({
            external_delivery_id: 'D-12345',
            pickup_address: '',
            pickup_business_name: '',
            pickup_phone_number: this.personalInformation.phoneNumber,
            pickup_instructions: '',
            dropoff_address: this.personalInformation.address,
            dropoff_business_name: '',
            dropoff_phone_number: this.personalInformation.phoneNumber,
            dropoff_instructions: '',
            order_value: 1999,
        })
        this.http.post('drive/v2/deliveries', body)
    }
}