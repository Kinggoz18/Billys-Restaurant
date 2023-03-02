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


export class NotificationObject{

    constructor(){
        this.user_id = 'BAi5mP5KEn9mY2ZIg';
        this.service_id = 'service_t1rkmus';
        this.Templates = ["template_obxckbj", "template_64iy8z9"];
        this.Event = ["Placed", "Completed", "Cancled"];
    }
    //Sends complete order notification
    async EmailCompleteOrder(order, sendName, sendEmail) {
        let data = {
            service_id: this.service_id,
            template_id: this.Templates[1],
            user_id: this.user_id,
            template_params: {
                to_name: sendName,
                from_name: "Drum Rock Jerk",
                message:  `Order Information:\n${order}}`,
                send_to: sendEmail
            }
        };
        let body = JSON.stringify(data);
       await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            data: body,
            headers: { "Content-Type": "application/json" }
            }).then((response)=>{
                if(!response.ok){
                    response.text().then((text) => {
                        console.log(text);
                        return
                    });
                }
                let Message = `
                ${data.to_name}\n
                Order Information:\n${order}}
                `;
                this.NotifyRestuarant(this.Event[1], Message);
            });
    }
    //Sends order acknowledgement notification
    async EmailPlacedOrder(order, sendName, sendEmail){
        let data = {
            service_id: this.service_id,
            template_id: this.Templates[0],
            user_id: 'BAi5mP5KEn9mY2ZIg',
            template_params: {
                to_name: sendName,
                from_name: "Drum Rock Jerk",
                message:  `Order Information:\n${order}}`,
                send_to: sendEmail
            }
        };
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
            }).then(()=>{
                let Message = `
                ${data.to_name}\n
                Order Information:\n${order}}
                `;
                this.NotifyRestuarant(this.Event[0], Message);
            });
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
        let data = {
            service_id: 'service_hnlujmq',
            template_id: 'template_derujjo',
            user_id: 'BAi5mP5KEn9mY2ZIg',
            template_params: {
                to_name: "Drum Rock Jerk",
                from_name: "Drum Rock Jerk",  
                message:  `Order ${Event}\n
                ${message}}`,
                send_to: "billyrestaurant@outlook.com"
            }
        };
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
    }
}

let NotificationObj = new NotificationObject();

await NotificationObj.EmailCompleteOrder("THIS IS A TEST ORDER", "Chigozie Muonagolu", "cmuonagolu18@outlook.com");
//NotificationObj.EmailPlacedOrder("THIS IS A TEST ORDER", "Chigozie Muonagolu", "cmuonagolu18@outlook.com");