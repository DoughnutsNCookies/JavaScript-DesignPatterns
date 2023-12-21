# 🧳 Visitor Design Pattern

The **Visitor** design pattern allows the definition of **a new operation on a set of classes without changing their structure**. It is particularly useful when working with a complex object structure composed of different types, and the required operations depend on the types of objects. The pattern **separates the algorithm from the object structure**, making it **easy to add new operations**.

## ❓ Problem

Consider a scenario where you have a hierarchy of shapes, such as circles, squares, and triangles. You need to implement various operations, like calculating the area, perimeter, and color information for each shape. The challenge is to introduce new operations without modifying the existing shape classes, keeping the code open for extension.

The conventional approach might involve adding new methods to each shape class whenever a new operation is required, leading to a **large and inflexible class hierarchy**.

## ✅ Solution

The **Visitor** design pattern addresses this problem by defining a **Visitor** interface with methods corresponding to different types of objects in the object structure. Each shape class implements an `accept` method that takes a **Visitor** as an argument. Concrete **Visitor** classes implement the operations for each type of shape. This way, new operations can be added without modifying the existing shape classes.

In our scenario, the Visitor pattern allows us to create shape classes and concrete visitor classes to perform various operations on these shapes.

## ✍🏻 Application

Let's create a hierarchy of shape classes (`Circle`, `Square`, `Triangle`) and a `ShapeVisitor` interface with methods for different types of shapes. Concrete visitor classes (`AreaVisitor`, `PerimeterVisitor`, `ColorVisitor`) implement these methods to perform specific operations on shapes.

```typescript
/**
 * Shape interface defining the accept method for visitors.
 */
interface Shape {
  accept(visitor: ShapeVisitor): void;
}

/**
 * Concrete shape class representing a circle.
 */
class Circle implements Shape {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this);
  }
}

/**
 * Concrete shape class representing a square.
 */
class Square implements Shape {
  side: number;

  constructor(side: number) {
    this.side = side;
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitSquare(this);
  }
}

/**
 * Concrete shape class representing a triangle.
 */
class Triangle implements Shape {
  sideA: number;
  sideB: number;
  sideC: number;

  constructor(sideA: number, sideB: number, sideC: number) {
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }

  accept(visitor: ShapeVisitor): void {
    visitor.visitTriangle(this);
  }
}

/**
 * Visitor interface defining methods for different types of shapes.
 */
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitSquare(square: Square): void;
  visitTriangle(triangle: Triangle): void;
}

/**
 * Concrete visitor class calculating the area of shapes.
 */
class AreaVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius * circle.radius;
    console.log(`Area of circle: ${area.toFixed(2)}`);
  }

  visitSquare(square: Square): void {
    const area = square.side * square.side;
    console.log(`Area of square: ${area.toFixed(2)}`);
  }

  visitTriangle(triangle: Triangle): void {
    // Using Heron's formula to calculate the area of a triangle
    const s = (triangle.sideA + triangle.sideB + triangle.sideC) / 2;
    const area = Math.sqrt(s * (s - triangle.sideA) * (s - triangle.sideB) * (s - triangle.sideC));
    console.log(`Area of triangle: ${area.toFixed(2)}`);
  }
}

/**
 * Concrete visitor class calculating the perimeter of shapes.
 */
class PerimeterVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    const perimeter = 2 * Math.PI * circle.radius;
    console.log(`Perimeter of circle: ${perimeter.toFixed(2)}`);
  }

  visitSquare(square: Square): void {
    const perimeter = 4 * square.side;
    console.log(`Perimeter of square: ${perimeter.toFixed(2)}`);
  }

  visitTriangle(triangle: Triangle): void {
    const perimeter = triangle.sideA + triangle.sideB + triangle.sideC;
    console.log(`Perimeter of triangle: ${perimeter.toFixed(2)}`);
  }
}

/**
 * Concrete visitor class displaying the color of shapes.
 */
class ColorVisitor implements ShapeVisitor {
  visitCircle(circle: Circle): void {
    console.log(`Color of circle: Red`);
  }

  visitSquare(square: Square): void {
    console.log(`Color of square: Blue`);
  }

  visitTriangle(triangle: Triangle): void {
    console.log(`Color of triangle: Green`);
  }
}
```

Now, the client code can create instances of shapes and visitors, and perform operations without modifying the shape classes.

```typescript
/**
 * Client code using the Visitor pattern.
 */
function testVisitorPattern(): void {
  const circle = new Circle(5);
  const square = new Square(4);
  const triangle = new Triangle(3, 4, 5);

  const areaVisitor = new AreaVisitor();
  const perimeterVisitor = new PerimeterVisitor();
  const colorVisitor = new ColorVisitor();

  console.log("Calculating areas:");
  circle.accept(areaVisitor);
  square.accept(areaVisitor);
  triangle.accept(areaVisitor);

  console.log("\nCalculating perimeters:");
  circle.accept(perimeterVisitor);
  square.accept(perimeterVisitor);
  triangle.accept(perimeterVisitor);

  console.log("\nDisplaying colors:");
  circle.accept(colorVisitor);
  square.accept(colorVisitor);
  triangle.accept(colorVisitor);
}

/**
 * Usage example.
 */
testVisitorPattern();
```

## ☯️ Pros and Cons

### Pros

- **Separation of Concerns**: The Visitor pattern separates the algorithm from the object structure, making it easy to add new operations without modifying existing classes.

- **Open/Closed Principle**: The pattern follows the Open/Closed Principle, allowing for easy addition of new visitors without modifying existing shapes.

- **Maintainability**: It makes the code more maintainable by centralizing operations in visitor classes.

### Cons

- **Increased Number of Classes**: The pattern can lead to an increased number of classes, especially in systems with a large and diverse object structure.

- **Complexity**: Understanding and implementing the pattern can be complex, especially for simpler scenarios where the object structure is not highly dynamic.
