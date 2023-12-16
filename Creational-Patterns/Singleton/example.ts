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
