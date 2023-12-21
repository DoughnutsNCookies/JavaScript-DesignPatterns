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
