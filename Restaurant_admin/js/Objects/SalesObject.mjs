export class SalesObject{
  apiBaseURL = 'https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/';
  

  async getTotalSales() {
    try {
      const endpoint = `${this.apiBaseURL}Sales/GetSales`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Unable to get total sales: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Total Sales:', data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
 
}

// test the functions
let sales = new SalesObject();
await sales.getTotalSales();
//getNumberOfOrders();

