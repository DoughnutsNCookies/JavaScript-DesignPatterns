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
