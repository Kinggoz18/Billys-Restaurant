class SalesObject {
    constructor() {
      this.baseUrl = "https://drumrockjerkapi-v1.azure-api.net/drumrockjerk/";
    }
  
    async getTotalSales() {
      try {
        const response = await fetch(`${this.baseUrl}GetTotalSales(Price)/{GetTotalSales}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  
    async getNumberOfOrders() {
      try {
        const response = await fetch(`${this.baseUrl}GetNumberOfOrders/{GetNumberOfOrders}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  }
  