import { Connection } from 'tedious'



export function ConnectDB(){
    var config = {  
        server: 'bills-restaurant.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'BillysRestaurant', //update me
                password: 'Restaurant2022'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'BillysRestaurant'  //update me
        }
    }; 
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Connected to Databse");  
    });  
    
    connection.connect();
}