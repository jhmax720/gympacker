import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let paypal: any;

@Component({
  selector: 'app-paypal-sub',
  templateUrl: './paypal-sub.component.html',
  styleUrls: ['./paypal-sub.component.css']
})
export class PaypalSubComponent implements OnInit, AfterViewChecked {

  constructor(private http: HttpClient) { }

  
  ngOnInit() {
    this.http.get('');
  }

  //PAYPAL

  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;

  paypalOneOffConfig = {
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


  
  paypalConfig = {
    env: 'sandbox',
   
    client: {
      sandbox: 'AdSYDDoLrqZPQmmpfMZ3nXIrLmx3TF_KRBnZRx7vQc8_HQ71KGiPxpytW1bWDb4Ay_H9F2tbM-4dsVDP',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: function() {
      return new paypal.Promise(function(resolve, reject) {

          // Make an ajax call to get the Payment ID. This should call your back-end,
          // which should invoke the PayPal Payment Create api to retrieve the Payment ID.

          // When you have a Payment ID, you need to call the `resolve` method, e.g `resolve(data.paymentID)`
          // Or, if you have an error from your server side, you need to call `reject`, e.g. `reject(err)`

          // this.http.post('/my-api/create-payment').subscribe(
          //   (data) => console.log(data.paymentID), // success path
          //   error => this.error = error // error path
          // );
          paypal.request.post('/my-api/create-payment', '')
          .then(function (res) {
              window.alert('Payment Complete!');
          }, function(err){
              window.alert('Payment failed')            ;
          });


         
      });
  } ,
  onAuthorize: function(data) {

    console.log('The payment was authorized!');
    console.log('Payment ID = ',   data.paymentID);
    console.log('PayerID = ', data.payerID);

    // At this point, the payment has been authorized, and you will need to call your back-end to complete the
    // payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.

    this.http.post('/my-api/execute-payment', { paymentID: data.paymentID, payerID: data.payerID }).subscribe(
      (data) => console.log(''), // success path
      error => this.error = error // error path
    );
        // .done(function(data) { /* Go to a success page */ })
        // .fail(function(err)  { /* Go to an error page  */  });
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
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  };

}
