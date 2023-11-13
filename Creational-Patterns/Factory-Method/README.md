# Factory Method Design Pattern

Also known as the **Virtual Constructor** pattern, a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

## Problem

Imagine you are leading a software development team working on a project to build a system for an e-commerce platform. One of the challenges you face is **integrating various payment gateways** into the system.

Each payment gateway has its own set of **intricacies** and requires **specific configurations**. The straightforward approach of instantiating payment gateway objects directly in the code poses a problem.

The system becomes **tightly coupled** to the individual implementations of each payment gateway, making it challenging to introduce new gateways or modify existing ones without affecting the entire codebase.

## Solution

The Factory Method design pattern provides a solution to this problem by **defining an interface for creating objects** but **allowing subclasses to alter the type of objects** that will be created.

In our payment gateway scenario, the **Factory Method** pattern allows us to delegate the responsibility of creating payment gateway objects to subclasses, ensuring a flexible and loosely coupled system.

## Application

In our e-commerce project, we can create a `PaymentGateway` interface that declares the method for processing payments. Then, we implement concrete classes for each payment gateway, such as `PayPalGateway` and `StripeGateway`, each providing its own implementation of the payment processing method.

```typescript
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
```

To implement the Factory Method pattern, we introduce an abstract class, `PaymentGatewayFactory`, with a method for creating payment gateway objects. Subclasses, such as `PayPalGatewayFactory` and `StripeGatewayFactory`, override this method to instantiate the corresponding payment gateway.

```typescript
/**
 * Define the factory interface.
 */
abstract class PaymentGatewayFactory {
  abstract createPaymentGateway(): PaymentGateway;

  processPayment(): void {
    const paymentGateway = this.createPaymentGateway();
    paymentGateway.processPayment();
  }
}

/**
 * Implement concrete factories for each payment gateway.
 */
class PayPalGatewayFactory extends PaymentGatewayFactory {
  createPaymentGateway(): PaymentGateway {
    return new PayPalGateway();
  }
}

class StripeGatewayFactory extends PaymentGatewayFactory {
  createPaymentGateway(): PaymentGateway {
    return new StripeGateway();
  }
}
```

Now, the client code can use the factory method to create payment gateways without being concerned with the specific implementation details.

```typescript
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
```

## Pros and Cons

### Pros

- You **avoid tight coupling** between the creator and the concrete products, a situation where two or more components or classes are highly dependent on each other.

- **Single Responsibility Principle**. You can move the product creation code into one place in the program, making the code easier to support.

- **Open/Closed Principle**. You can introduce new types of products into the program without breaking existing client code.

### Cons

- The code may become **more complicated** since you need to **introduce a lot of new subclasses** to implement the pattern. The best case scenario is when you’re introducing the pattern into an existing hierarchy of creator classes.
