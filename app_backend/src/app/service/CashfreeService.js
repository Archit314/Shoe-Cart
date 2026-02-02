import axios from "axios";
import { cashfreeConfig } from "../config/cashfree/cashfree.js";

export default class CashfreeService {

    async createCfOrder(requestPayload){

        try {

            const url = cashfreeConfig.cf_create_order_url

            const response = await axios.post(url, requestPayload, {
                headers: {
                    'x-api-version': cashfreeConfig.cf_api_version,
                    'x-client-id': cashfreeConfig.cf_client_id,
                    'x-client-secret': cashfreeConfig.cf_secret_key,
                    'Content-Type': 'application/json'
                }
            })

            if (!response.data.cf_order_id) {
                throw new Error('Failed to create PG order on Cashfree');
            }

            console.log(response);
            console.log(response.data);
            
            return {status: 200, message: `Order created at cashfree`, data: response.data}
            
        } catch (error) {
            console.log(`[CashfreeService]: Error in createCfOrder`, error);
            return {status: 500, message: `Internal server error`}
        }
    }
}