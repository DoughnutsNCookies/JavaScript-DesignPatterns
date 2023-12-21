# 🤝 Mediator Design Pattern

The **Mediator** design pattern defines an object that **centralizes communication between a set of objects**, **promoting loose coupling and avoiding direct interactions** between them. Instead of components communicating directly, they **communicate through the mediator**, which handles the interaction logic.

## ❓ Problem

Imagine you are developing a user interface for a smart home control system. The system includes various components such as lights, thermostats, and security cameras. These components need to communicate with each other based on user interactions. The challenge is to implement a communication mechanism that **avoids tight coupling between individual components and allows for easy extensibility**.

The conventional approach might involve components directly referencing and communicating with each other, leading to a complex and tightly coupled system that is difficult to maintain.

## ✅ Solution

The **Mediator** design pattern provides a solution to this problem by introducing a mediator object that centralizes communication between components. Components no longer communicate directly with each other; instead, they send messages to the mediator, which **handles the coordination and communication logic**. This promotes loose coupling and allows for a more modular and maintainable system.

In our smart home scenario, the Mediator pattern allows us to create a `HomeAutomationMediator` that facilitates communication between different components, such as lights, thermostats, and security cameras.

## ✍🏻 Application

Let's create a set of classes representing components in a smart home: `Light`, `Thermostat`, `SecurityCamera`, and `HomeAutomationMediator`. Each component can send messages to the mediator, which then relays the messages to other components as needed.

```typescript
/**
 * Mediator interface defining the communication methods.
 */
interface HomeAutomationMediator {
  sendMessage(sender: Component, message: string): void;
}

/**
 * Base component class representing a component in the smart home.
 */
abstract class Component {
  protected mediator: HomeAutomationMediator;

  constructor(mediator: HomeAutomationMediator) {
    this.mediator = mediator;
  }

  abstract receiveMessage(message: string): void;

  sendMessage(message: string): void {
    this.mediator.sendMessage(this, message);
  }
}

/**
 * Concrete component class representing a light.
 */
class Light extends Component {
  constructor(mediator: HomeAutomationMediator) {
    super(mediator);
  }

  receiveMessage(message: string): void {
    console.log(`Light received message: ${message}`);
  }

  turnOn(): void {
    console.log("Light is ON");
    this.sendMessage("Light turned on");
  }

  turnOff(): void {
    console.log("Light is OFF");
    this.sendMessage("Light turned off");
  }
}

/**
 * Concrete component class representing a thermostat.
 */
class Thermostat extends Component {
  constructor(mediator: HomeAutomationMediator) {
    super(mediator);
  }

  receiveMessage(message: string): void {
    console.log(`Thermostat received message: ${message}`);
  }

  increaseTemperature(): void {
    console.log("Thermostat temperature increased");
    this.sendMessage("Temperature increased");
  }

  decreaseTemperature(): void {
    console.log("Thermostat temperature decreased");
    this.sendMessage("Temperature decreased");
  }
}

/**
 * Concrete component class representing a security camera.
 */
class SecurityCamera extends Component {
  constructor(mediator: HomeAutomationMediator) {
    super(mediator);
  }

  receiveMessage(message: string): void {
    console.log(`Security Camera received message: ${message}`);
  }

  startRecording(): void {
    console.log("Security Camera started recording");
    this.sendMessage("Recording started");
  }

  stopRecording(): void {
    console.log("Security Camera stopped recording");
    this.sendMessage("Recording stopped");
  }
}

/**
 * Concrete mediator class implementing the HomeAutomationMediator interface.
 */
class ConcreteHomeAutomationMediator implements HomeAutomationMediator {
  private components: Component[] = [];

  addComponent(component: Component): void {
    this.components.push(component);
  }

  sendMessage(sender: Component, message: string): void {
    for (const component of this.components) {
      if (component !== sender) {
        component.receiveMessage(`${sender.constructor.name}: ${message}`);
      }
    }
  }
}
```

Now, the client code can create components, add them to the mediator, and interact with them. The components communicate through the mediator, promoting loose coupling.

```typescript
/**
 * Client code using the Mediator pattern.
 */
function testHomeAutomationSystem(): void {
  const mediator = new ConcreteHomeAutomationMediator();

  const light = new Light(mediator);
  const thermostat = new Thermostat(mediator);
  const securityCamera = new SecurityCamera(mediator);

  mediator.addComponent(light);
  mediator.addComponent(thermostat);
  mediator.addComponent(securityCamera);

  // Interacting with components
  light.turnOn();
  thermostat.increaseTemperature();
  securityCamera.startRecording();
}

/**
 * Usage example.
 */
testHomeAutomationSystem();
```

## ☯️ Pros and Cons

### Pros

- **Decouples Components**: The Mediator pattern decouples components from each other, promoting a more modular and maintainable system.

- **Centralized Communication Logic**: Centralizing communication logic in the mediator allows for easier coordination and avoids the need for components to know about each other.

- **Flexibility and Extensibility**: Components can be added or removed without affecting the communication structure, making the system more flexible and extensible.

### Cons

- **Potential Single Point of Failure**: The mediator can become a single point of failure if it becomes overly complex or if critical functionality relies heavily on it.

- **Increased Complexity**: Introducing a mediator adds an additional layer of complexity to the system, especially in scenarios where direct communication between components is straightforward.
