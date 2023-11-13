/**
 * Defining the product interface.
 */
interface PaymentGateway {
  processPayment(): void;
}

/**
 * Implement concrete classes for each payment gateway.
 */
class PayPalGateway implements PaymentGateway {
  processPayment(): void {
    console.log("Processing payment using PayPal Gateway.");
  }
}

class StripeGateway implements PaymentGateway {
  processPayment(): void {
    console.log("Processing payment using Stripe Gateway.");
  }
}

/**
 * Define the factory interface.
 */
interface PaymentGatewayFactory {
  createPaymentGateway(): PaymentGateway;
}

/**
 * Implement concrete factories for each payment gateway.
 */
class PayPalGatewayFactory implements PaymentGatewayFactory {
  createPaymentGateway(): PaymentGateway {
    return new PayPalGateway();
  }
}

class StripeGatewayFactory implements PaymentGatewayFactory {
  createPaymentGateway(): PaymentGateway {
    return new StripeGateway();
  }
}

/**
 * Client code using the factory method.
 *
 * @param factory The factory to use to create the payment gateway.
 */
function processPaymentWithFactory(factory: PaymentGatewayFactory): void {
  const paymentGateway = factory.createPaymentGateway();
  paymentGateway.processPayment();
}

/**
 * Usage example.
 */
const paypalFactory = new PayPalGatewayFactory();
const stripeFactory = new StripeGatewayFactory();

processPaymentWithFactory(paypalFactory); // Output: Processing payment using PayPal Gateway.
processPaymentWithFactory(stripeFactory); // Output: Processing payment using Stripe Gateway.
