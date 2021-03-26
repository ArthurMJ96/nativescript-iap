A NativeScript plugin for making in-app purchases.

## Installation
Run the following command from the root of your project:

`ns plugin add nativescript-in-app-purchase`

## Configuration
In order for your in-app purchases to be recognized by the plugin, you must configure those on the Google/AppStore side.

## Usage

### Setup hook
Before starting purchase you need hook up to the `purchaseUpdated` event. This way you will receive information about the transaction state while it is executing and take necessary action when the transaction completes. You can set the hook once as global handler to process the all incoming purchases.
```typescript
import inAppPurchase, { PurchaseEventData } from "nativescript-in-app-purchase";

inAppPurchase.on("purchaseUpdated", async (data: PurchaseEventData) => {
    for (const transaction of data.transactions) {
        if (transaction.state === TransactionState.purchased
            || transaction.state === TransactionState.restored) {
            // Deliver the content or unlock the purchased functionality
        } else if (transaction.state === TransactionState.failed) {
            // Notify user about it
            console.error(transaction.error);
        }

        // You must finish transaction otherwise the purchase being refunded
        await inAppPurchase.finishTransaction(transaction);
    }
});
```

### Getting the products
To get the actual products call `getProducts` with array of the products identifiers (in Google Play products ID calls SKU):
```typescript
import inAppPurchase from "nativescript-in-app-purchase";

const products = await inAppPurchase.getProducts(["your.product.id", "your.product.id"]);
```

### Purchasing the product

```typescript
import inAppPurchase from "nativescript-in-app-purchase";

try {
    await inAppPurchase.purchase(product);
} catch (error) {
    // Handle the error
}
```

### Restoring the purchased products
```typescript
import inAppPurchase from "nativescript-in-app-purchase";
// All restored purchases will be handled by the "purchaseUpdated" hook.
await inAppPurchase.restorePurchases();
```

### Showing the price consent dialog
```typescript
import inAppPurchase from "nativescript-in-app-purchase";

// Pass product required only on Android
let product = undefined;
if (global.isAndroid) {
    product = //getting product with updated price
}

await inAppPurchase.showPriceConsent(product);
```
## Api
[API](docs/Api.md)