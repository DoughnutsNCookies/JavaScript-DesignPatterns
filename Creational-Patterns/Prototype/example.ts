/**
 * Defining the prototype interface.
 */
interface Shape {
  clone(): Shape;
  draw(): void;
}

/**
 * Implement concrete classes for each shape.
 */
class Circle implements Shape {
  draw(): void {
    console.log("Drawing a circle.");
  }

  clone(): Shape {
    return new Circle();
  }
}

class Rectangle implements Shape {
  draw(): void {
    console.log("Drawing a rectangle.");
  }

  clone(): Shape {
    return new Rectangle();
  }
}

class Triangle implements Shape {
  draw(): void {
    console.log("Drawing a triangle.");
  }

  clone(): Shape {
    return new Triangle();
  }
}

/**
 * Client code using the prototype.
 *
 * @param prototype The prototype to clone.
 */
function createShape(prototype: Shape): Shape {
  return prototype.clone();
}

/**
 * Usage example.
 */
const circlePrototype = new Circle();
const rectanglePrototype = new Rectangle();
const trianglePrototype = new Triangle();

const newCircle = createShape(circlePrototype);
const newRectangle = createShape(rectanglePrototype);
const newTriangle = createShape(trianglePrototype);

newCircle.draw();     // Output: Drawing a circle.
newRectangle.draw();  // Output: Drawing a rectangle.
newTriangle.draw();   // Output: Drawing a triangle.
