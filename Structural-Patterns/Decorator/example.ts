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
