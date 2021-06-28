import { EventData, Observable } from "@nativescript/core";
import { Product } from "../product/product";
import { Transaction } from "../transaction/transaction";

export interface PurchaseEventData extends EventData {
    transactions: Transaction[];
}

export class InAppPurchase extends Observable {
    public nativeObject: any;

    /**
     * Consumes a given in-app product. Consuming can only be done on an item that's owned,
     * and as a result of consumption, the user will no longer own it.
     * @param transaction The transaction to consume.
     */
    public consumePurchase(transaction: Transaction): Promise<void>;

    /**
     * Notifies the store that the app finished processing the transaction.
     * @param transaction The transaction to finish.
     * 
     * @summary
     * All purchases require finish, regardless of whether it succeeded or failed.
     * Failure to complete a succeeded purchase will result in that purchase being refunded. 
     */
    public finishTransaction(transaction: Transaction): Promise<void>;

    /**
     * Retrieves localized information from the store about a specified list of products.
     * @param productIds Products identifiers
     */
    public getProducts(productsIds: string[]): Promise<Product[]>;

    /**
     * Initiates the purchase for a product.
     * @param product Purchased product.
     */
    public purchase(product: Product): void;

    /**
     * Initiates the purchase for a product with given AccountIdentifiers.
     * @param product Purchased product.
     * @param obfuscatedAccountId Obfuscated account id.
     * @param obfuscatedProfileId Obfuscated profile id.
     * 
     * @summary
     * Use to ensure that a purchase is correctly attributed to the in-game character/avatar or in-app user profile that initiated the purchase.
     * Replaces the deprecated developer payload.
     */
    public purchaseWithAttribution(product: Product, obfuscatedAccountId: string, obfuscatedProfileId: string): void;

    /**
     * Restores previously completed purchases.
     * Returned Purchases contain "TransactionState.restored".
     * 
     * @summary
     * Use this method to restore completed transactions that is,
     * transactions for which you have already called completePuchase. 
     * Not restoring a non-renewing subscription or a consumable product.
     */
    public restorePurchases(): Promise<void>;
    

    /**
     * Restores previously completed transaction. 
     * Returned transactions contain "TransactionState.purchased".
     * @summary
     * Only active subscriptions and non-consumed purchases are returned.
     * You can use this to make sure consumable purchases still get consumed by your logic.
     * Incase the App crashed or any other purchase flow interruptions.
     * 
     * Returned transactions also expose AccountIdentifiers.
     * Example: transaction.nativeObject.getAccountIdentifiers().getObfuscatedAccountId()
     * 
     */
     public restorePurchasesWithDetails(): Promise<void>;

    /**
     * Shows the price consent sheet if the user has not yet responded to a subscription price increase.
     * @param product Required only on Android: The product that has the pending price change.
     */
    public showPriceConsent(product?: Product): Promise<void>;

    public on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    public on(eventName: "purchaseUpdated", callback: (data: PurchaseEventData) => void, thisArg?: any);
}

declare const inAppPurchase: InAppPurchase;
export default inAppPurchase;