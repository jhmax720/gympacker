import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, Input, OnDestroy, OnInit, AfterViewChecked } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
declare let paypal: any;

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy, AfterViewChecked {


  @Input('cart') carts: ShoppingCart;
  disableBtn: boolean;
  userId: string;
  userName: string;
  userSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: ShoppingCartService,
    private orderService: OrderService) { }

  async ngOnInit() {
    this.userSubscription = this.auth.user$
      .subscribe(user => {
        this.userId = user.uid;
        this.userName = user.displayName || user.email;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  save(shipping) {

    let order = new Order(this.userId, this.userName, shipping, this.carts);

    this.orderService.placeOrder(order)
      .then(ref => {
        this.router.navigate(['order-success', ref.key]);
      })
      .catch(err => {
        this.disableBtn = false;
        console.log(err);
      });


    this.disableBtn = true;

  }


  //PAYPAL

  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;



  paypalConfig = {
    env: 'sandbox',
    style: {
      label: 'paypal',
      size: 'medium',    // small | medium | large | responsive
      shape: 'rect',     // pill | rect
      color: 'blue',     // gold | blue | silver | black
      tagline: false
    },
    client: {
      sandbox: 'AdSYDDoLrqZPQmmpfMZ3nXIrLmx3TF_KRBnZRx7vQc8_HQ71KGiPxpytW1bWDb4Ay_H9F2tbM-4dsVDP',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      // return actions.payment.create({
      //   payment: {
      //     transactions: [
      //       {
      //         amount: {
      //           total: 100, 
      //           currency: 'AUD',
      //           details: {
      //             subtotal: '30.00',
      //             tax: '20.00',
      //             shipping: '20.00',
      //             handling_fee: '20.00',
      //             shipping_discount: '-10.00',
      //             insurance: '20.00'
      //           }
      //         },
      

      //       }
      //     ]
      //   }
      // });
      return actions.payment.create({
        transactions: [{
          amount: {
            total: '30.11',
            currency: 'USD',
            details: {
              subtotal: '30.00',
              tax: '0.07',
              shipping: '0.03',
              handling_fee: '1.00',
              shipping_discount: '-1.00',
              insurance: '0.01'
            }
          },
          description: 'The payment transaction description.',
          custom: '90048630024435',
          //invoice_number: '12345', Insert a unique invoice number
          payment_options: {
            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
          },
          soft_descriptor: 'ECHI5786786',
          item_list: {
            items: [
            {
              name: 'hat',
              description: 'Brown hat.',
              quantity: '5',
              price: '3',
              tax: '0.01',
              sku: '1',
              currency: 'USD'
            },
            {
              name: 'handbag',
              description: 'Black handbag.',
              quantity: '1',
              price: '15',
              tax: '0.02',
              sku: 'product34',
              currency: 'USD'
            }],
            shipping_address: {
              recipient_name: 'Brian Robinson',
              line1: '4th Floor',
              line2: 'Unit #34',
              city: 'San Jose',
              country_code: 'US',
              postal_code: '95131',
              phone: '011862212345678',
              state: 'CA'
            }
          }
        }],
        note_to_payer: 'Contact us for any questions on your order.'
      });


    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      })
    }
  };
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

}
