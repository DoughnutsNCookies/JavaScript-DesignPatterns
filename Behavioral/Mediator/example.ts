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
