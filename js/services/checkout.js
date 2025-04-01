import { cartService } from './cart.js';

export class CheckoutService {
constructor() {
    this.shippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
    this.paymentInfo = JSON.parse(localStorage.getItem('paymentInfo')) || {};
    this.shippingMethod = localStorage.getItem('shippingMethod') || 'standard';
    this.orderNumber = null;
    this.orderItems = [];
    this.orderSubtotal = 0; 
}

saveShippingInfo(info) {
    this.shippingInfo = info;
    localStorage.setItem('shippingInfo', JSON.stringify(info));
}

savePaymentInfo(info) {
    this.paymentInfo = info;
    localStorage.setItem('paymentInfo', JSON.stringify(info));
}

setShippingMethod(method) {
    this.shippingMethod = method;
    localStorage.setItem('shippingMethod', method);
}

getShippingCost() {
    return this.shippingMethod === 'express' ? 9.99 : 4.99;
}

getTaxAmount() {
    return this.orderSubtotal * 0.21;
}

getOrderTotal() {
    return this.orderSubtotal + this.getShippingCost() + this.getTaxAmount();
}

placeOrder() {
    this.orderItems = [...cartService.getItems()];
    this.orderSubtotal = cartService.getTotal();
    
    localStorage.setItem('orderItems', JSON.stringify(this.orderItems));
    localStorage.setItem('orderSubtotal', this.orderSubtotal.toString());
    
    return new Promise((resolve) => {
        setTimeout(() => {
            this.orderNumber = Math.floor(Math.random() * 100000);
            localStorage.setItem('orderNumber', this.orderNumber.toString());
            
            cartService.clearCart();
            
            resolve({
                orderNumber: this.orderNumber,
                orderDate: new Date(),
                total: this.getOrderTotal(),
                shippingInfo: this.shippingInfo,
                items: this.orderItems,
                subtotal: this.orderSubtotal
            });
        }, 1500);
    });
}

getOrderDetails() {
    if (this.orderItems.length === 0) {
        const storedItems = localStorage.getItem('orderItems');
        if (storedItems) {
            this.orderItems = JSON.parse(storedItems);
        }
    }
    
    if (this.orderSubtotal === 0) {
        const storedSubtotal = localStorage.getItem('orderSubtotal');
        if (storedSubtotal) {
            this.orderSubtotal = parseFloat(storedSubtotal);
        }
    }
    
    if (!this.orderNumber) {
        const storedOrderNumber = localStorage.getItem('orderNumber');
        if (storedOrderNumber) {
            this.orderNumber = parseInt(storedOrderNumber);
        }
    }
    
    return {
        orderNumber: this.orderNumber,
        shippingInfo: this.shippingInfo,
        paymentInfo: this.paymentInfo,
        shippingMethod: this.shippingMethod,
        items: this.orderItems,
        subtotal: this.orderSubtotal,
        shipping: this.getShippingCost(),
        tax: this.getTaxAmount(),
        total: this.getOrderTotal()
    };
}

clearCheckoutData() {
    localStorage.removeItem('shippingInfo');
    localStorage.removeItem('paymentInfo');
    localStorage.removeItem('shippingMethod');
    localStorage.removeItem('orderItems');
    localStorage.removeItem('orderSubtotal');
    localStorage.removeItem('orderNumber');
    
    this.orderItems = [];
    this.orderSubtotal = 0;
    this.orderNumber = null;
}
}

export const checkoutService = new CheckoutService();