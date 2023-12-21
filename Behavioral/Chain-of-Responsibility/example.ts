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

/**
 * Client code using the Chain of Responsibility pattern.
 *
 * @param request The support request to handle.
 * @param handler The chain of handlers.
 */
function handleSupportRequest(request: SupportRequest, handler: Handler): void {
  handler.handleRequest(request);
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

handleSupportRequest(supportRequest1, tier1Support); // Output: Tier 1 support handles the request.
handleSupportRequest(supportRequest2, tier1Support); // Output: Passing request to Tier 2 support. Tier 2 support handles the request.
handleSupportRequest(supportRequest3, tier1Support); // Output: Passing request to Tier 2 support. Passing request to Tier 3 support. Tier 3 support handles the request.
