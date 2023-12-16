# 1️⃣ Singleton Design Pattern

The **Singleton** design pattern ensures that a class has only one instance and provides a global point of access to it. This pattern is useful when **exactly one object is needed** to coordinate actions across the system, such as managing configuration settings, logging, or a shared resource.

## ❓ Problem

Imagine you are developing a logging system for a large application. Each component in the system needs to log information, and having multiple instances of the logger might lead to duplicated log entries, increased resource usage, and inconsistencies in the logging behavior.

The conventional approach of creating a new logger instance for each component leads to inefficiencies and lacks a unified logging mechanism. Additionally, having multiple logger instances might result in **difficulties in managing and coordinating** the logging process across the entire application.

## ✅ Solution

The **Singleton** design pattern provides a solution to this problem by ensuring that a class has **only one instance** and providing a **global point of access** to it. This guarantees that all components in the system share the same logger instance, allowing for consistent and centralized logging.

In our logging system scenario, the Singleton pattern allows us to create a single logger instance that can be accessed by all components, ensuring a streamlined and coordinated logging process.

## ✍🏻 Application

Let's create a `Logger` class as our singleton. The class maintains a private static instance and provides a method for accessing that instance. If an instance does not exist, it is created; otherwise, the existing instance is returned.

```typescript
/**
 * Singleton Logger class.
 */
class Logger {
  private static instance: Logger | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation.
  }

  /**
   * Method to access the singleton instance.
   */
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Log a message.
   *
   * @param message The message to log.
   */
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}
```

Now, the client code can access the logger instance using the `getInstance` method, ensuring that all components share the same logger.

```typescript
/**
 * Client code using the singleton logger.
 */
function useLogger() {
  const logger = Logger.getInstance();
  logger.log("This message will be logged.");

  // Accessing the logger from another component.
  const anotherLogger = Logger.getInstance();
  anotherLogger.log("Another log entry.");
}

/**
 * Usage example.
 */
useLogger();
```

## ☯️ Pros and Cons

### Pros

- **Single Instance**: Ensures that a class has only one instance, providing a global point of access to it.

- **Global Access**: Allows easy access to the singleton instance from any part of the application.

- **Lazy Initialization**: The instance is created only when it is needed, improving efficiency.

### Cons

- **Global State**: Introduces a global state to the application, which might make the code harder to test and maintain.

- **Harder to Subclass**: The Singleton pattern might be challenging to subclass or extend if the singleton instance is tightly coupled to its class.

- **Global Dependency**: The use of a singleton introduces a global dependency, potentially making the code less modular.
