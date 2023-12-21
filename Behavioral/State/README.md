# 🚦 State Design Pattern

The **State** design pattern allows an object to **alter its behavior when its internal state changes**. The pattern represents various states of an object as separate classes and delegates the state-specific behavior to these classes. This enables the object to change its behavior dynamically as its internal state changes.

## ❓ Problem

Consider a vending machine that dispenses different items based on its current state. The machine should behave differently when it is in the "Ready" state (awaiting user input), the "Dispensing" state (dispensing an item), or the "Out of Stock" state. The challenge is to implement this behavior in a way that is modular, extensible, and adheres to the Open/Closed Principle.

The conventional approach might involve using conditional statements to check the current state within the vending machine's code, leading to a **complex and hard-to-maintain system**.

## ✅ Solution

The **State** design pattern addresses this problem by **representing each state of the vending machine as a separate class**. The vending machine has a reference to the current state object, and the state-specific behavior is delegated to these state classes. When the state changes, the machine switches to the corresponding state class, allowing for dynamic behavior changes.

In our vending machine scenario, the **State** pattern allows us to create classes for each state (e.g., `ReadyState`, `DispensingState`, `OutOfStockState`) and switch between them as the machine transitions through different states.

## ✍🏻 Application

Let's create an interface `VendingMachineState` that defines methods for different states. We'll implement concrete state classes (`ReadyState`, `DispensingState`, `OutOfStockState`) and a `VendingMachine` class that maintains a reference to the current state. The machine can switch between states based on events such as user input or item availability.

```typescript
/**
 * State interface defining methods for different states of the vending machine.
 */
interface VendingMachineState {
  insertCoin(): void;
  ejectCoin(): void;
  dispenseItem(): void;
}

/**
 * Concrete state class representing the "Ready" state.
 */
class ReadyState implements VendingMachineState {
  insertCoin(): void {
    console.log("Coin inserted. Item selected.");
  }

  ejectCoin(): void {
    console.log("Coin ejected. No item selected.");
  }

  dispenseItem(): void {
    console.log("No item dispensed. Please insert a coin and select an item.");
  }
}

/**
 * Concrete state class representing the "Dispensing" state.
 */
class DispensingState implements VendingMachineState {
  insertCoin(): void {
    console.log("Coin already inserted. Please wait for the current item to be dispensed.");
  }

  ejectCoin(): void {
    console.log("Cannot eject coin during dispensing. Please wait for the current item to be dispensed.");
  }

  dispenseItem(): void {
    console.log("Item dispensed. Enjoy your purchase!");
  }
}

/**
 * Concrete state class representing the "Out of Stock" state.
 */
class OutOfStockState implements VendingMachineState {
  insertCoin(): void {
    console.log("No items available. Cannot accept coins.");
  }

  ejectCoin(): void {
    console.log("No items available. Cannot return coins.");
  }

  dispenseItem(): void {
    console.log("No items available. Cannot dispense.");
  }
}

/**
 * Context class representing the vending machine.
 */
class VendingMachine {
  private currentState: VendingMachineState;

  constructor() {
    this.currentState = new ReadyState();
  }

  setState(newState: VendingMachineState): void {
    this.currentState = newState;
  }

  insertCoin(): void {
    this.currentState.insertCoin();
  }

  ejectCoin(): void {
    this.currentState.ejectCoin();
  }

  dispenseItem(): void {
    this.currentState.dispenseItem();
  }
}
```

Now, the client code can create a `VendingMachine` instance and interact with it. The machine's behavior dynamically changes based on its current state.

```typescript
/**
 * Client code using the State pattern.
 */
function testVendingMachine(): void {
  const vendingMachine = new VendingMachine();

  vendingMachine.insertCoin(); // Output: Coin inserted. Item selected.
  vendingMachine.dispenseItem(); // Output: No item dispensed. Please insert a coin and select an item.

  vendingMachine.setState(new DispensingState());
  vendingMachine.insertCoin(); // Output: Coin already inserted. Please wait for the current item to be dispensed.
  vendingMachine.dispenseItem(); // Output: Item dispensed. Enjoy your purchase!

  vendingMachine.setState(new OutOfStockState());
  vendingMachine.insertCoin(); // Output: No items available. Cannot accept coins.
  vendingMachine.ejectCoin(); // Output: No items available. Cannot return coins.
  vendingMachine.dispenseItem(); // Output: No items available. Cannot dispense.
}

/**
 * Usage example.
 */
testVendingMachine();
```

## ☯️ Pros and Cons

### Pros

- **Clean Separation of Concerns**: The State pattern cleanly separates the behavior associated with each state into its own class, promoting modularity.

- **Open/Closed Principle**: The pattern follows the Open/Closed Principle, allowing for easy addition of new states without modifying existing code.

- **Simplifies Context Class**: The context class (e.g., `VendingMachine`) remains simpler as the state-specific behavior is delegated to state classes.

### Cons

- **Number of Classes**: The State pattern can lead to a large number of classes, especially in systems with a high number of states.

- **Complexity**: In simpler cases, using conditionals might be more straightforward than introducing multiple state classes.

- **Context Knowledge**: State classes need to be aware of the context, leading to potential dependencies.
