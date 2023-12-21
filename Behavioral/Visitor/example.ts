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
