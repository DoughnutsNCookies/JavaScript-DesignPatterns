/**
 * Common interface for both individual shapes and groups.
 */
interface Graphic {
  draw(): void;
}

/**
 * Concrete implementation of an individual shape - Circle.
 */
class Circle implements Graphic {
  draw(): void {
    console.log("Drawing a circle.");
  }
}

/**
 * Concrete implementation of an individual shape - Square.
 */
class Square implements Graphic {
  draw(): void {
    console.log("Drawing a square.");
  }
}

/**
 * Concrete implementation representing a group of shapes.
 */
class Group implements Graphic {
  private graphics: Graphic[] = [];

  add(graphic: Graphic): void {
    this.graphics.push(graphic);
  }

  draw(): void {
    console.log("Drawing a group:");
    this.graphics.forEach((graphic) => graphic.draw());
  }
}
/**
 * Client code using the Composite pattern.
 *
 * @param graphic The graphic to draw.
 */
function drawGraphic(graphic: Graphic): void {
  graphic.draw();
}

/**
 * Usage example.
 */
const circle = new Circle();
const square = new Square();
const group = new Group();

group.add(circle);
group.add(square);

drawGraphic(circle);  // Output: Drawing a circle.
drawGraphic(square);  // Output: Drawing a square.
drawGraphic(group);   // Output: Drawing a group: Drawing a circle. Drawing a square.
