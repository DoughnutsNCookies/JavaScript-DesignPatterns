# 🔍 Observer Design Pattern

The **Observer** design pattern defines a **one-to-many dependency between objects** so that when one object changes state, all its dependents are notified and updated automatically. This pattern is useful for implementing distributed event handling systems, where a change in one object **triggers actions in other objects**.

## ❓ Problem

Imagine you are working on a weather monitoring system. You have various displays, such as a current conditions display, a statistics display, and a forecast display, that need to be updated whenever the weather data changes. The challenge is to implement a system that allows the displays to receive updates when the weather data is modified without tightly coupling the displays to the weather data.

The conventional approach might involve direct dependencies between the weather data and the displays, leading to a **rigid and inflexible system**.

## ✅ Solution

The **Observer** design pattern provides a solution to this problem by introducing an **Observer** interface that defines a method for updating observers, and a **Subject** class that **maintains a list of observers and notifies them of any state changes**. Concrete observers implement the Observer interface, and they can be registered or removed from the subject dynamically.

In our weather monitoring scenario, the Observer pattern allows us to create a `WeatherData` class as the subject and various display classes as observers. When the weather data changes, the displays are automatically updated.

## ✍🏻 Application

Let's create a `WeatherData` class representing the subject that tracks temperature, humidity, and pressure. We'll also create an `Observer` interface with an `update` method, and concrete observer classes (`CurrentConditionsDisplay`, `StatisticsDisplay`, `ForecastDisplay`) that implement this interface.

```typescript
/**
 * Observer interface defining the method for updating observers.
 */
interface Observer {
  update(temperature: number, humidity: number, pressure: number): void;
}

/**
 * Subject interface defining methods for registering, removing, and notifying observers.
 */
interface Subject {
  registerObserver(observer: Observer): void;
  removeObserver(observer: Observer): void;
  notifyObservers(): void;
}

/**
 * Concrete subject class representing weather data.
 */
class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}

/**
 * Concrete observer class representing a current conditions display.
 */
class CurrentConditionsDisplay implements Observer {
  private temperature: number = 0;
  private humidity: number = 0;

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(`Current Conditions: ${this.temperature}°C and ${this.humidity}% humidity`);
  }
}

/**
 * Concrete observer class representing a statistics display.
 */
class StatisticsDisplay implements Observer {
  private maxTemperature: number = Number.MIN_SAFE_INTEGER;
  private minTemperature: number = Number.MAX_SAFE_INTEGER;
  private temperatureSum: number = 0;
  private numReadings: number = 0;

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperatureSum += temperature;
    this.numReadings++;
    this.maxTemperature = Math.max(this.maxTemperature, temperature);
    this.minTemperature = Math.min(this.minTemperature, temperature);
    this.display();
  }

  display(): void {
    const averageTemperature = this.temperatureSum / this.numReadings;
    console.log(`Statistics: Avg/Max/Min Temperature = ${averageTemperature.toFixed(2)}°C/${this.maxTemperature.toFixed(2)}°C/${this.minTemperature.toFixed(2)}°C`);
  }
}

/**
 * Concrete observer class representing a forecast display.
 */
class ForecastDisplay implements Observer {
  private lastPressure: number = 0;
  private currentPressure: number = 0;

  update(temperature: number, humidity: number, pressure: number): void {
    this.lastPressure = this.currentPressure;
    this.currentPressure = pressure;
    this.display();
  }

  display(): void {
    if (this.currentPressure > this.lastPressure) {
      console.log("Forecast: Improving weather on the way!");
    } else if (this.currentPressure === this.lastPressure) {
      console.log("Forecast: More of the same");
    } else {
      console.log("Forecast: Watch out for cooler, rainy weather");
    }
  }
}
```

Now, the client code can create instances of the `WeatherData` subject and various observer displays. When the weather data changes, the displays are automatically updated.

```typescript
/**
 * Client code using the Observer pattern.
 */
function testWeatherStation(): void {
  const weatherData = new WeatherData();

  const currentConditionsDisplay = new CurrentConditionsDisplay();
  const statisticsDisplay = new StatisticsDisplay();
  const forecastDisplay = new ForecastDisplay();

  weatherData.registerObserver(currentConditionsDisplay);
  weatherData.registerObserver(statisticsDisplay);
  weatherData.registerObserver(forecastDisplay);

  // Simulate weather changes
  weatherData.setMeasurements(25, 65, 1013);
  weatherData.setMeasurements(30, 70, 1012);
  weatherData.setMeasurements(20, 60, 1015);

  // Unregister an observer
  weatherData.removeObserver(statisticsDisplay);

  // Simulate more weather changes
  weatherData.setMeasurements(28, 68, 1014);
}

/**
 * Usage example.
 */
testWeatherStation();
```

## ☯️ Pros and Cons

### Pros

- **Loose Coupling**: The Observer pattern promotes loose coupling between subjects and observers, allowing for easier maintenance and extension.

- **Flexibility**: Observers can be added or removed dynamically, providing flexibility in the system's architecture.

- **Broadcast Communication**: Enables broadcast communication where a single change can update multiple observers.

### Cons

- **Unwanted Updates**: Observers might receive unnecessary updates, especially in systems with frequent state changes.

- **Ordering Issues**: The order in which observers are notified might be important in some scenarios, and this pattern does not define a specific order.

- **Potential Memory Leaks**: In some cases, failing to remove references to observers can lead to memory leaks.
