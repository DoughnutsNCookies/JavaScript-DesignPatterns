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
