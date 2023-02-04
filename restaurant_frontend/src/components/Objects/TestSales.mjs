const chai = require('chai');
const expect = chai.expect;
const SalesObject = require('./SalesObject');

describe('SalesObject', () => {
    describe('GetTotalSales', () => {
        it('should return the total sales', (done) => {
            SalesObject.GetTotalSales()
                .then((totalSales) => {
                    expect(totalSales).to.be.a('number');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
    
    describe('GetNumberOfOrders', () => {
        it('should return the number of orders', (done) => {
            SalesObject.GetNumberOfOrders()
                .then((numberOfOrders) => {
                    expect(numberOfOrders).to.be.a('number');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    });
});
