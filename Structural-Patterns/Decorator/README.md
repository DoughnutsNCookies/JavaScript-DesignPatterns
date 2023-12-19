# 🎨 Decorator

The **Decorator** design pattern allows behavior to be **added to individual objects**, either statically or dynamically, **without affecting the behavior** of other objects from the same class. It is useful for **extending the functionality** of classes in a flexible and reusable way, promoting the principle of open-closed design.

## ❓ Problem

Imagine you are developing a coffee ordering system. The challenge is to create a system that allows customers to customize their coffee with various options such as adding milk, sugar, or flavorings. The conventional approach might involve creating a subclass for each possible combination of options, leading to a **class explosion** and making the system **hard to maintain**.

## ✅ Solution

The **Decorator** design pattern provides a solution to this problem by allowing you to **attach new behaviors to objects** by placing them inside special wrapper classes that implement the same interface. This allows you to **stack multiple decorators**, each adding a specific behavior, without modifying the original class. The Decorator pattern enables the creation of a flexible and extensible system for customizing objects.

In our coffee ordering system scenario, the Decorator pattern allows us to add various options to a base coffee class without creating a new subclass for each combination.

## ✍🏻 Application

Let's create a `Coffee` interface as the base component. The `SimpleCoffee` class implements this interface, representing the basic coffee. Decorator classes such as `MilkDecorator`, `SugarDecorator`, and `FlavoringDecorator` extend the behavior of the base component by implementing the same interface and wrapping instances of the base class.

```typescript
/**
 * Base component interface for coffee.
 */
interface Coffee {
  cost(): number;
  description(): string;
}

/**
 * Concrete implementation of the base coffee.
 */
class SimpleCoffee implements Coffee {
  cost(): number {
    return 5; // Base cost for simple coffee
  }

  description(): string {
    return "Simple coffee";
  }
}

/**
 * Decorator class for adding milk to the coffee.
 */
class MilkDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 2; // Additional cost for milk
  }

  description(): string {
    return this.coffee.description() + ", with milk";
  }
}

/**
 * Decorator class for adding sugar to the coffee.
 */
class SugarDecorator implements Coffee {
  private coffee: Coffee;

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  cost(): number {
    return this.coffee.cost() + 1; // Additional cost for sugar
  }

  description(): string {
    return this.coffee.description() + ", with sugar";
  }
}

/**
 * Decorator class for adding flavoring to the coffee.
 */
class FlavoringDecorator implements Coffee {
  private coffee: Coffee;
  private flavor: string;

  constructor(coffee: Coffee, flavor: string) {
    this.coffee = coffee;
    this.flavor = flavor;
  }

  cost(): number {
    return this.coffee.cost() + 3; // Additional cost for flavoring
  }

  description(): string {
    return this.coffee.description() + `, with ${this.flavor} flavoring`;
  }
}
```

Now, the client code can create customized coffee orders by stacking different decorators on top of the base coffee.

```typescript
/**
 * Client code using the Decorator pattern.
 *
 * @param coffee The coffee to customize.
 */
function customizeCoffee(coffee: Coffee): void {
  console.log(`Order: ${coffee.description()}`);
  console.log(`Cost: $${coffee.cost()}`);
  console.log();
}

/**
 * Usage example.
 */
const simpleCoffee = new SimpleCoffee();
const milkCoffee = new MilkDecorator(simpleCoffee);
const sugarMilkCoffee = new SugarDecorator(milkCoffee);
const flavoredCoffee = new FlavoringDecorator(simpleCoffee, "vanilla");

customizeCoffee(simpleCoffee);
customizeCoffee(milkCoffee);
customizeCoffee(sugarMilkCoffee);
customizeCoffee(flavoredCoffee);
```

## ☯️ Pros and Cons

### Pros

- **Flexible Extension**: Decorators can be added or removed independently, providing a flexible way to extend functionality.

- **Open/Closed Principle**: The Decorator pattern follows the open/closed principle, allowing new functionality to be added without altering existing code.

- **Composition Over Inheritance**: Encourages composition over inheritance, avoiding the need for a large number of subclasses.

### Cons

- **Complexity**: The system may become more complex as the number of decorator classes increases.

- **Order Sensitivity**: The order in which decorators are applied may affect the behavior of the final object.

- **Potential Overhead**: The use of multiple decorators may introduce a performance overhead, especially in deeply nested compositions.
