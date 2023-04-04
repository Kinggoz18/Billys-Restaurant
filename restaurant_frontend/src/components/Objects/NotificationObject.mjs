 /*======================================================================
| MenuObject
|
| Name: NotificationObject.js
|
| Written by: Chigozie Muonagolu - Febuary 2023
|
| Purpose: Provide Notification services
|
| usage: used in services that requires it. 
|
| Description of properties: None
|
|------------------------------------------------------------------
*/
import emailjs, { send } from '@emailjs/browser'

export class NotificationObject{

    constructor(){
        this.user_id = process.env.REACT_APP_EMAILJS_USER_ID;
        this.service_id = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        this.Templates = ["template_tte63a5", "template_64iy8z9"];
        this.Event = ["Placed", "Completed", "Cancled"];
    }
    //Sends complete order notification
    async EmailCompleteOrder(order, sendName, sendEmail) {
        let template_params = {
            to_name: "Chigozie Muonagolu",
            from_name: sendName,
            message:  `Order Information:\n${order}`,
            to: sendEmail
        }
        emailjs.send(this.service_id, this.Templates[1], template_params, this.user_id);
        let Message = `
        ${template_params.to_name}\nOrder Information:\n${order}}`;
        //this.NotifyRestuarant(this.Event[1], Message);
    }
    //Sends order acknowledgement notification
    async EmailPlacedOrder(order, sendName, sendEmail){
        let finalOrder = this.FormatOrder(order);
        let template_params = {
            to_name: sendName,
            from_name: sendName,
            message:  `Order Information:\n${finalOrder}`,
            to: sendEmail
        }
        emailjs.send(this.service_id, this.Templates[0], template_params, this.user_id);
        let Message = `
        ${template_params.to_name}\nOrder Information:\n${order}}`;
        //this.NotifyRestuarant(this.Event[1], Message);
    }

    //Sends Cancle order notification - Cannot implement at the monent becuase our emailjs subscription is free tier
    /*
        Order Cancelled
        Hello {{to_name}},

        We're sorry to inform you that your order from Drum Rock Jerk has been cancelled. Here are the details:

        {{message}}

        If you have any questions or concerns, please don't hesitate to contact us at 555-1234.

        We hope to serve you in the future!

        Best regards,
        Drum Rock Jerk
    */
    EmailCancleOrder(params) {
        
    }

     //Sends promo notification
     EmailPromo(params) {
        
     }
    //Sends a notification to the resturant 
    //Events: Completed, Cancled, Placed
    async NotifyRestuarant(Event, message){
        let template_params =  {
            to_name: "Drum Rock Jerk",
            from_name: "Drum Rock Jerk",  
            message:  `Order ${Event}\n
            ${message}}`,
            send_to: "billyrestaurant@outlook.com"
        }
        emailjs.send(this.service_id, this.Templates[0], template_params, this.user_id);
    }

    FormatOrder(Order){
        let final = "";
        Order.items.forEach(item=>{
            final+=`${item.Name}	${item.Price}\n`
        })
        final+=`Total Price: ${Order.TotalPrice}`;
        return final;
    }
}
