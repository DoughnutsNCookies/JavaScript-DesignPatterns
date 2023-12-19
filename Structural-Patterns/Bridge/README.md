# 🌉 Bridge Design Pattern

The **Bridge** design pattern **separates abstraction from implementation**, allowing both to evolve independently. It is particularly useful when you want to **avoid a permanent binding** between an abstraction and its implementation, enabling flexibility in changing or extending both components.

## ❓ Problem

Imagine you are developing a drawing application that supports different shapes (abstraction) and rendering modes (implementation). The challenge is to create a system that allows users to draw various shapes while easily switching between rendering modes, such as drawing shapes using raster graphics or vector graphics.

The conventional approach might involve creating a hierarchy for each shape and another hierarchy for each rendering mode. However, this leads to a **combinatorial explosion of classes**, making the system **complex and hard to maintain**.

## ✅ Solution

The **Bridge** design pattern provides a solution to this problem by separating the abstraction (shapes) from its implementation (rendering modes). This allows you to create a bridge between the two, enabling users to draw shapes in different rendering modes without the need for an exhaustive class hierarchy.

In our drawing application scenario, the **Bridge** pattern allows us to create various shapes and rendering modes **independently and then combine them dynamically at runtime**, providing a flexible and scalable system.

## ✍🏻 Application

Let's create an `Shape` interface as the abstraction and an `Renderer` interface as the implementation. Concrete classes such as `Circle`, `Square`, `RasterRenderer`, and `VectorRenderer` implement these interfaces. The `Shape` class has a reference to a `Renderer`, forming the bridge between the abstraction and implementation.

```typescript
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
```

Now, the client code can create various shapes and rendering modes independently and combine them dynamically at runtime.

```typescript
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
```

## ☯️ Pros and Cons

### Pros

- **Decoupling**: Separates abstraction and implementation, allowing them to evolve independently.

- **Flexibility**: Enables the creation of various combinations of shapes and rendering modes at runtime.

- **Scalability**: Avoids a combinatorial explosion of classes, making the system more scalable.

### Cons

- **Complexity**: The Bridge pattern introduces additional complexity, which might be overkill for simpler systems.

- **Increased Number of Classes**: The system may have more classes due to the separation of abstraction and implementation. This can be challenging to manage in smaller projects.
