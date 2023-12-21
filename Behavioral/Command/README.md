# 🕹️ Command

The **Command** design pattern encapsulates a request as an object, allowing for **parameterization of clients** with different requests, queuing of requests, and logging of the requests. It also provides the **ability to undo operations**. This pattern decouples the sender of a request from its receiver, enabling **flexibility and extensibility**.

## ❓ Problem

Imagine you are developing a remote control system for a smart home, and you want to implement a mechanism where different devices can be controlled using remote buttons. The challenge is to create a system that allows you to parameterize the remote control with various commands, enabling users to control different devices with the same set of buttons.

The conventional approach might involve hardcoding the operations directly into the buttons, making it **challenging to add or modify functionality** without altering the remote control code.

## ✅ Solution

The **Command** design pattern provides a solution to this problem by **encapsulating each operation (command) as an object**. The remote control holds a reference to these command objects and can execute them **without knowing the specifics of each operation**. This pattern allows for dynamic configuration of the remote control, enabling users to associate different commands with the same set of buttons.

In our smart home scenario, the Command pattern allows us to create command classes for various operations (e.g., turning on lights, adjusting the thermostat) and associate them with remote control buttons.

## ✍🏻 Application

Let's create a `Command` interface that declares the method for executing a command. Concrete command classes (`LightOnCommand`, `LightOffCommand`, `ThermostatUpCommand`, `ThermostatDownCommand`) implement this interface. We also create a `RemoteControl` class that holds references to command objects and can execute them upon receiving button presses.

```typescript
/**
 * Command interface declaring the method for executing a command.
 */
interface Command {
  execute(): void;
}

/**
 * Concrete command class for turning on the lights.
 */
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOn();
  }
}

/**
 * Concrete command class for turning off the lights.
 */
class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute(): void {
    this.light.turnOff();
  }
}

/**
 * Concrete command class for adjusting the thermostat up.
 */
class ThermostatUpCommand implements Command {
  private thermostat: Thermostat;

  constructor(thermostat: Thermostat) {
    this.thermostat = thermostat;
  }

  execute(): void {
    this.thermostat.increaseTemperature();
  }
}

/**
 * Concrete command class for adjusting the thermostat down.
 */
class ThermostatDownCommand implements Command {
  private thermostat: Thermostat;

  constructor(thermostat: Thermostat) {
    this.thermostat = thermostat;
  }

  execute(): void {
    this.thermostat.decreaseTemperature();
  }
}

/**
 * Receiver class for controlling lights.
 */
class Light {
  turnOn(): void {
    console.log("Light is ON");
  }

  turnOff(): void {
    console.log("Light is OFF");
  }
}

/**
 * Receiver class for controlling the thermostat.
 */
class Thermostat {
  increaseTemperature(): void {
    console.log("Thermostat temperature increased");
  }

  decreaseTemperature(): void {
    console.log("Thermostat temperature decreased");
  }
}

/**
 * Invoker class representing the remote control.
 */
class RemoteControl {
  private commands: Command[] = [];

  addCommand(command: Command): void {
    this.commands.push(command);
  }

  pressButton(index: number): void {
    if (index >= 0 && index < this.commands.length) {
      this.commands[index].execute();
    } else {
      console.log("Invalid button press");
    }
  }
}
```

Now, the client code can create command objects and associate them with remote control buttons. Pressing a button on the remote control executes the corresponding command.

```typescript
/**
 * Client code using the Command pattern.
 */
function configureRemoteControl(): RemoteControl {
  const remoteControl = new RemoteControl();
  const livingRoomLight = new Light();
  const thermostat = new Thermostat();

  const lightOnCommand = new LightOnCommand(livingRoomLight);
  const lightOffCommand = new LightOffCommand(livingRoomLight);
  const thermostatUpCommand = new ThermostatUpCommand(thermostat);
  const thermostatDownCommand = new ThermostatDownCommand(thermostat);

  remoteControl.addCommand(lightOnCommand);
  remoteControl.addCommand(lightOffCommand);
  remoteControl.addCommand(thermostatUpCommand);
  remoteControl.addCommand(thermostatDownCommand);

  return remoteControl;
}

/**
 * Usage example.
 */
const remoteControl = configureRemoteControl();

remoteControl.pressButton(0); // Output: Light is ON
remoteControl.pressButton(1); // Output: Light is OFF
remoteControl.pressButton(2); // Output: Thermostat temperature increased
remoteControl.pressButton(3); // Output: Thermostat temperature decreased
remoteControl.pressButton(4); // Output: Invalid button press
```

## ☯️ Pros and Cons

### Pros

- **Decouples Sender and Receiver**: The Command pattern decouples the sender of a request from its receiver, enabling flexibility in command handling.

- **Dynamic Configuration**: Allows for dynamic configuration of commands, making it easy to add, remove, or modify functionality.

- **Undo Operations**: Supports the implementation of undo operations by storing the state of the system before executing a command.

### Cons

- **Increased Number of Classes**: Introduces a potentially large number of command classes, especially in systems with many possible operations.

- **Complexity**: The pattern may introduce complexity, especially when dealing with complex command hierarchies or undo mechanisms.
