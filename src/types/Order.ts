export type Order = {
  id: string;
  name: string;
  createdAt: Date;
  customer: {
    displayName: string;
  };
  totalPriceSet: {
    shopMoney: {
      amount: string;
      currencyCode: string;
    };
  };
  displayFinancialStatus: string;
  displayFulfillmentStatus: string;
  lineItems: {
    edges: [
      {
        node: {
          quantity: string;
        };
      }
    ];
  };
};