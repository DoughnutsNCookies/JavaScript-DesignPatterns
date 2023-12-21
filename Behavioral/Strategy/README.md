# 🎯 Strategy

The **Strategy** design pattern **defines a family of algorithms**, **encapsulates each one**, and makes them **interchangeable**. It allows the client to **choose an algorithm at runtime**, independently of the context that uses it. This pattern enables a class to alter its behavior when its internal state changes.

## ❓ Problem

Consider a sorting algorithm used in a system. Depending on the size of the dataset, you may want to switch between different sorting algorithms such as quicksort, bubblesort, or mergesort. The challenge is to implement a flexible and maintainable system that allows the client to choose the sorting strategy dynamically.

The conventional approach might involve using **conditional statements or switch cases** to select the appropriate algorithm, leading to code that is **hard to extend and maintain**.

## ✅ Solution

The **Strategy** design pattern addresses this problem by defining a family of algorithms as separate classes and encapsulating each algorithm within its class. The context class, which uses these algorithms, has a reference to a strategy interface. The strategy can be switched at runtime, allowing the client to choose the appropriate algorithm.

In our sorting algorithm scenario, the **Strategy** pattern allows us to create strategy classes (e.g., `QuickSort`, `BubbleSort`, `MergeSort`) and a context class (`Sorter`) that can switch between these strategies dynamically.

## ✍🏻 Application

Let's create a `SortStrategy` interface that declares the method for sorting. We'll implement concrete strategy classes (`QuickSort`, `BubbleSort`, `MergeSort`) and a `Sorter` class that has a reference to the current sorting strategy.

```typescript
/**
 * Strategy interface defining the method for sorting.
 */
interface SortStrategy {
  sort(data: number[]): number[];
}

/**
 * Concrete strategy class representing the quicksort algorithm.
 */
class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    console.log("Using QuickSort");
    // Implementation of quicksort algorithm
    return data.sort((a, b) => a - b);
  }
}

/**
 * Concrete strategy class representing the bubblesort algorithm.
 */
class BubbleSort implements SortStrategy {
  sort(data: number[]): number[] {
    console.log("Using BubbleSort");
    // Implementation of bubblesort algorithm
    return data.sort((a, b) => a - b);
  }
}

/**
 * Concrete strategy class representing the mergesort algorithm.
 */
class MergeSort implements SortStrategy {
  sort(data: number[]): number[] {
    console.log("Using MergeSort");
    // Implementation of mergesort algorithm
    return data.sort((a, b) => a - b);
  }
}

/**
 * Context class representing the sorter that uses a sorting strategy.
 */
class Sorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  performSort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}
```

Now, the client code can create a `Sorter` instance and dynamically switch between sorting strategies.

```typescript
/**
 * Client code using the Strategy pattern.
 */
function testSortingStrategies(): void {
  const dataToSort = [5, 2, 8, 1, 9, 4, 6];

  const sorter = new Sorter(new QuickSort());
  console.log("Sorted data:", sorter.performSort(dataToSort));

  sorter.setStrategy(new BubbleSort());
  console.log("Sorted data:", sorter.performSort(dataToSort));

  sorter.setStrategy(new MergeSort());
  console.log("Sorted data:", sorter.performSort(dataToSort));
}

/**
 * Usage example.
 */
testSortingStrategies();
```

## ☯️ Pros and Cons

### Pros

- **Flexible Algorithm Selection**: The Strategy pattern allows the client to choose the algorithm dynamically at runtime.

- **Modularity**: Each algorithm is encapsulated within its class, promoting modularity and easy maintenance.

- **Open/Closed Principle**: The pattern follows the Open/Closed Principle, allowing for easy addition of new strategies without modifying existing code.

### Cons

- **Increased Number of Classes**: The Strategy pattern can lead to a large number of classes, especially in systems with many strategies.

- **Client Awareness**: Clients need to be aware of the different strategies and choose the appropriate one, which may increase client complexity.

- **Potential Overhead**: The pattern may introduce some overhead, especially when dealing with small and straightforward algorithms.
