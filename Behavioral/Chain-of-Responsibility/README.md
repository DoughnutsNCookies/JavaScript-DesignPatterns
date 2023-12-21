# ⛓️ Chain of Responsibility

The **Chain of Responsibility** design pattern passes a request along a chain of handlers. Upon receiving a request, each handler decides either to **process the request or to pass it along** to the next handler in the chain. This pattern **avoids coupling the sender of a request** to its receiver, allowing multiple objects to handle the request **independently**.

## ❓ Problem

Imagine you are developing a helpdesk system where customer support requests come in with various levels of complexity. The challenge is to create a system that dynamically assigns support tickets to the appropriate support team based on the complexity level, ensuring efficient and effective handling of requests.

The conventional approach might involve a centralized mechanism that decides which support team should handle a request, leading to **tight coupling and reduced flexibility**.

## ✅ Solution

The **Chain of Responsibility** design pattern provides a solution to this problem by organizing the handlers into a chain. Each handler in the chain has the ability to process the request or pass it along to the next handler. This allows for a more **flexible and decentralized approach**, as each handler can independently decide whether to handle the request or delegate it further down the chain.

In our helpdesk system scenario, the **Chain of Responsibility** pattern allows us to create handler classes for different support teams and dynamically assemble them into a chain based on the complexity level of the support request.

## ✍🏻 Application

Let's create a `SupportRequest` class representing a customer support request with a complexity level. We'll also create a `Handler` interface that defines the method for handling requests. Concrete handler classes (`Tier1Support`, `Tier2Support`, and `Tier3Support`) implement this interface and form a chain. Each handler decides whether to handle the request or pass it to the next handler in the chain.

```typescript
/**
 * Request class representing a customer support request.
 */
class SupportRequest {
  private complexity: number;

  constructor(complexity: number) {
    this.complexity = complexity;
  }

  getComplexity(): number {
    return this.complexity;
  }
}

/**
 * Handler interface defining the method for handling requests.
 */
interface Handler {
  setNextHandler(handler: Handler): void;
  handleRequest(request: SupportRequest): void;
}

/**
 * Concrete handler class for Tier 1 support.
 */
class Tier1Support implements Handler {
  private nextHandler: Handler | null = null;
  private complexityThreshold: number = 5;

  setNextHandler(handler: Handler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: SupportRequest): void {
    if (request.getComplexity() <= this.complexityThreshold) {
      console.log("Tier 1 support handles the request.");
    } else if (this.nextHandler) {
      console.log("Passing request to Tier 2 support.");
      this.nextHandler.handleRequest(request);
    } else {
      console.log("No suitable handler. Request remains unhandled.");
    }
  }
}

/**
 * Concrete handler class for Tier 2 support.
 */
class Tier2Support implements Handler {
  private nextHandler: Handler | null = null;
  private complexityThreshold: number = 10;

  setNextHandler(handler: Handler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: SupportRequest): void {
    if (request.getComplexity() <= this.complexityThreshold) {
      console.log("Tier 2 support handles the request.");
    } else if (this.nextHandler) {
      console.log("Passing request to Tier 3 support.");
      this.nextHandler.handleRequest(request);
    } else {
      console.log("No suitable handler. Request remains unhandled.");
    }
  }
}

/**
 * Concrete handler class for Tier 3 support.
 */
class Tier3Support implements Handler {
  private nextHandler: Handler | null = null;

  setNextHandler(handler: Handler): void {
    this.nextHandler = handler;
  }

  handleRequest(request: SupportRequest): void {
    console.log("Tier 3 support handles the request.");
  }
}
```

Now, the client code can create a chain of handlers and use it to handle customer support requests with varying complexity levels.

```typescript
/**
 * Client code using the Chain of Responsibility pattern.
 *
 * @param request The support request to handle.
 * @param handlers The chain of handlers.
 */
function handleSupportRequest(request: SupportRequest, handlers: Handler[]): void {
  for (const handler of handlers) {
    handler.handleRequest(request);
  }
}

/**
 * Usage example.
 */
const tier1Support = new Tier1Support();
const tier2Support = new Tier2Support();
const tier3Support = new Tier3Support();

tier1Support.setNextHandler(tier2Support);
tier2Support.setNextHandler(tier3Support);

const supportRequest1 = new SupportRequest(3);
const supportRequest2 = new SupportRequest(8);
const supportRequest3 = new SupportRequest(12);

handleSupportRequest(supportRequest1, [tier1Support]); // Output: Tier 1 support handles the request.
handleSupportRequest(supportRequest2, [tier1Support]); // Output: Passing request to Tier 2 support. Tier 2 support handles the request.
handleSupportRequest(supportRequest3, [tier1Support]); // Output: Passing request to Tier 2 support. Passing request to Tier 3 support. Tier 3 support handles the request.
```

## ☯️ Pros and Cons

### Pros

- **Decentralized Handling**: Handlers are organized into a chain, allowing for decentralized handling of requests.

- **Flexible Configuration**: The client can dynamically configure the chain of handlers based on the specific requirements.

- **Reduced Coupling**: The sender of a request is decoupled from its receivers, providing greater flexibility.

### Cons

- **Unprocessed Requests**: There is no guarantee that a request will be processed; it might remain unhandled if it doesn't meet the criteria of any handler in the chain.

- **Runtime Overhead**: There can be a runtime overhead, especially when the chain is long or when there are multiple dynamic configurations.
