# 🌲 Composite

The **Composite** design pattern allows clients to treat individual objects and compositions of objects **uniformly**. It enables you to compose objects into tree structures to represent part-whole hierarchies. This pattern is useful when clients need to work with both **individual objects and compositions of objects** seamlessly.

## ❓ Problem

Imagine you are developing a graphic design application that allows users to create complex drawings consisting of simple shapes and groups of shapes. The challenge is to create a system that can treat individual shapes and groups of shapes in a uniform way, enabling users to **manipulate them without knowing their specific types**.

The conventional approach might involve creating separate classes for each shape and then creating a separate class for groups, leading to complex code for handling both individual shapes and groups.

## ✅ Solution

The **Composite** design pattern provides a solution to this problem by allowing you to compose objects into **tree structures**. Both individual shapes and groups of shapes implement a common interface, enabling clients to treat them uniformly. This pattern facilitates the creation of complex structures while providing a seamless way to work with individual elements and compositions.

In our graphic design application scenario, the **Composite** pattern allows us to create a hierarchy of shapes and groups, providing a **unified interface** for manipulation.

## ✍🏻 Application

Let's create a `Graphic` interface as the common interface for both individual shapes and groups. Concrete classes such as `Circle`, `Square`, and `Group` implement this interface. The `Group` class can contain a list of `Graphic` objects, allowing it to represent a composition of shapes.

```typescript
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
```

Now, the client code can create complex drawings by treating individual shapes and groups uniformly.

```typescript
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
```

## ☯️ Pros and Cons

### Pros

- **Uniform Treatment**: Enables clients to treat individual objects and compositions of objects uniformly.

- **Flexibility**: Allows the creation of complex structures with a consistent interface.

- **Simplifies Client Code**: Clients can work with structures of objects without being aware of their specific types.

### Cons

- **Complexity**: The Composite pattern may introduce complexity, especially in scenarios where not all methods make sense for every component.

- **Limited Type Checking**: Since the common interface is shared between individual objects and groups, type checking may be needed in certain situations.

- **Performance**: In some cases, iterating over a composite structure may have a performance impact, especially if the structure is deep and complex.
