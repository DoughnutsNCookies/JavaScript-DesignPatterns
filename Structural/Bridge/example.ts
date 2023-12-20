/**
 * Abstraction interface for shapes.
 */
interface Shape {
  draw(): void;
}

/**
 * Implementation interface for rendering.
 */
interface Renderer {
  renderShape(shape: Shape): void;
}

/**
 * Concrete implementation of rendering using raster graphics.
 */
class RasterRenderer implements Renderer {
  renderShape(shape: Shape): void {
    console.log(`Drawing ${shape.constructor.name} in raster graphics.`);
  }
}

/**
 * Concrete implementation of rendering using vector graphics.
 */
class VectorRenderer implements Renderer {
  renderShape(shape: Shape): void {
    console.log(`Drawing ${shape.constructor.name} in vector graphics.`);
  }
}

/**
 * Concrete implementation of a shape - Circle.
 */
class Circle implements Shape {
  constructor(private renderer: Renderer) {}

  draw(): void {
    this.renderer.renderShape(this);
  }
}

/**
 * Concrete implementation of a shape - Square.
 */
class Square implements Shape {
  constructor(private renderer: Renderer) {}

  draw(): void {
    this.renderer.renderShape(this);
  }
}

/**
 * Client code using the Bridge pattern.
 *
 * @param shape The shape to draw.
 * @param renderer The renderer to use.
 */
function drawShape(shape: Shape, renderer: Renderer): void {
  shape.draw();
}

/**
 * Usage example.
 */
const rasterRenderer = new RasterRenderer();
const vectorRenderer = new VectorRenderer();

const circle = new Circle(rasterRenderer);
const square = new Square(vectorRenderer);

drawShape(circle, rasterRenderer);  // Output: Drawing Circle in raster graphics.
drawShape(square, vectorRenderer);  // Output: Drawing Square in vector graphics.
