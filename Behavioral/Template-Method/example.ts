/**
 * Abstract class defining the template method and abstract methods for individual steps.
 */
abstract class ProcessTemplate {
  // Template method outlining the overall algorithm structure.
  executeProcess(): void {
    this.step1();
    this.step2();
    this.step3();
    this.finalStep();
  }

  // Abstract methods representing individual steps.
  abstract step1(): void;
  abstract step2(): void;
  abstract step3(): void;

  // A hook method that can be overridden by subclasses but is not required.
  hookMethod(): void {
    console.log("Default implementation of the hook method");
  }

  // A final step that is common across all subclasses.
  finalStep(): void {
    console.log("Final step common to all subclasses");
  }
}

/**
 * Concrete subclass providing a specific implementation for the process.
 */
class ConcreteProcess1 extends ProcessTemplate {
  step1(): void {
    console.log("ConcreteProcess1: Step 1");
  }

  step2(): void {
    console.log("ConcreteProcess1: Step 2");
  }

  step3(): void {
    console.log("ConcreteProcess1: Step 3");
  }

  // Optionally override the hook method.
  hookMethod(): void {
    console.log("ConcreteProcess1: Custom implementation of the hook method");
  }
}

/**
 * Concrete subclass providing a different implementation for the process.
 */
class ConcreteProcess2 extends ProcessTemplate {
  step1(): void {
    console.log("ConcreteProcess2: Step 1");
  }

  step2(): void {
    console.log("ConcreteProcess2: Step 2");
  }

  step3(): void {
    console.log("ConcreteProcess2: Step 3");
  }
}

/**
 * Client code using the Template Method pattern.
 */
function testTemplateMethod(): void {
  const process1 = new ConcreteProcess1();
  console.log("Executing ConcreteProcess1:");
  process1.executeProcess();

  const process2 = new ConcreteProcess2();
  console.log("Executing ConcreteProcess2:");
  process2.executeProcess();
}

/**
 * Usage example.
 */
testTemplateMethod();
