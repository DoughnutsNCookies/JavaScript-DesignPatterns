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
class MyReadyState implements VendingMachineState {
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
    this.currentState = new MyReadyState();
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
