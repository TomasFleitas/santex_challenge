
/* Mocks de datos para realizar testing con Apollo client */


export const RESPONSE_DATA = {
  "data": {
    "products": {
      "items": [
        {
          "id": "1",
          "name": "Laptop",
          "slug": "laptop",
          "description": "Now equipped with seventh-generation Intel Core processors, Laptop is snappier than ever. From daily tasks like launching apps and opening files to more advanced computing, you can power through your day thanks to faster SSDs and Turbo Boost processing up to 3.6GHz.",
          "variants": [
            {
              "price": 129900,
              "currencyCode": "USD",
              "__typename": "ProductVariant"
            },
            {
              "price": 139900,
              "currencyCode": "USD",
              "__typename": "ProductVariant"
            },
            {
              "price": 219900,
              "currencyCode": "USD",
              "__typename": "ProductVariant"
            },
            {
              "price": 229900,
              "currencyCode": "USD",
              "__typename": "ProductVariant"
            }
          ],
          "assets": [
            {
              "source": "https://demo.vendure.io/assets/source/b6/derick-david-409858-unsplash.jpg",
              "__typename": "Asset"
            }
          ],
          "__typename": "Product"
        },
      ],
      "__typename": "ProductList"
    }
  }
}

export const ADDED_PRODUCT = { "data": { "addItemToOrder": { "id": "13", "code": "DCLG9GUGF62KY3E7", "state": "AddingItems", "total": 129900, "currencyCode": "USD", "lines": [{ "id": "12", "productVariant": { "id": "1", "name": "Laptop 13 inch 8GB", "currencyCode": "USD", "__typename": "ProductVariant" }, "unitPriceWithTax": 155880, "unitPrice": 129900, "quantity": 1, "featuredAsset": { "id": "1", "preview": "https://demo.vendure.io/assets/preview/71/derick-david-409858-unsplash__preview.jpg", "__typename": "Asset" }, "__typename": "OrderLine" }], "__typename": "Order" } } }

export const REMOVED_PRODUCT = { "data": { "removeOrderLine": { "id": "13", "code": "DCLG9GUGF62KY3E7", "state": "AddingItems", "total": 0, "currencyCode": "USD", "lines": [], "__typename": "Order" } } }

export const CLEAR_CART = { "data": { "removeAllOrderLines": { "id": "13", "code": "DCLG9GUGF62KY3E7", "state": "AddingItems", "total": 0, "currencyCode": "USD", "lines": [], "__typename": "Order" } } }
