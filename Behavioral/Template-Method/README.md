# 📝 Template Method Design Pattern

The **Template** Method design pattern **defines the skeleton of an algorithm in the superclass** but lets subclasses **override specific steps of the algorithm** without changing its structure. It enables the definition of a **common algorithm structure** in a superclass while allowing subclasses to provide concrete implementations for certain steps.

## ❓ Problem

Consider a scenario where you need to implement a process that involves multiple steps, and the order of these steps should remain the same across different variations of the process. However, the specific implementation of each step can vary. The challenge is to provide a consistent structure for the algorithm while allowing flexibility in the implementation of individual steps.

The conventional approach might involve **duplicating the overall process structure** in each subclass, leading to **code redundancy and maintenance issues**.

## ✅ Solution

The **Template** Method design pattern solves this problem by defining a template method in the superclass that outlines the overall algorithm structure. This template method calls several abstract methods, which are then implemented by concrete subclasses to provide specific implementations for individual steps.

In our scenario, the **Template** Method pattern allows us to create a `ProcessTemplate` class with a template method (`executeProcess`) and abstract methods representing individual steps. Concrete subclasses, such as `ConcreteProcess1` and `ConcreteProcess2`, implement these abstract methods to customize the algorithm for specific variations.

## ✍🏻 Application

Let's create an abstract class `ProcessTemplate` that defines the template method and abstract methods representing individual steps. We'll implement concrete subclasses (`ConcreteProcess1` and `ConcreteProcess2`) that provide specific implementations for these steps.

```typescript
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
```

Now, the client code can create instances of concrete subclasses and execute the template method, which invokes the overall algorithm structure.

```typescript
/**
 * Client code using the Template Method pattern.
 */
function testTemplateMethod(): void {
  const process1 = new ConcreteProcess1();
  console.log("Executing ConcreteProcess1:");
  process1.executeProcess();

  console.log("\n");

  const process2 = new ConcreteProcess2();
  console.log("Executing ConcreteProcess2:");
  process2.executeProcess();
}

/**
 * Usage example.
 */
testTemplateMethod();
```

## ☯️ Pros and Cons

### Pros

- **Consistent Algorithm Structure**: The Template Method pattern provides a consistent structure for an algorithm in the superclass, ensuring that the order of steps remains the same across subclasses.

- **Reuse and Extension**: Common behavior is defined in the superclass, promoting code reuse. Subclasses can override specific steps to customize behavior without changing the overall structure.

- **Open/Closed Principle**: The pattern follows the Open/Closed Principle, allowing for easy extension by introducing new subclasses.

### Cons

- **Limited Flexibility**: The template method defines the structure of the algorithm, limiting flexibility in terms of changing the order of steps dynamically.

- **Increased Complexity**: In some cases, the template method might become overly complex if there are too many steps or if the steps are tightly coupled.
