# 🤖 Prototype

Also known as the **Clone** pattern, the **Prototype** design pattern is a creational pattern that focuses on creating objects by copying an existing object, known as the prototype. This pattern allows the creation of new objects with the same properties as the original object, providing a way to produce new instances without specifying their exact class.

## ❓ Problem

Imagine you are working on a graphic design application that allows users to create and customize various shapes, such as circles, rectangles, and triangles. The challenge you face is **efficiently creating new instances** of these shapes with different configurations, such as colors, sizes, and positions.

The conventional approach of creating objects using constructors leads to **code duplication and a lack of flexibility**. Copying existing objects seems like a viable solution, but not all programming languages provide built-in support for this, and manually copying objects can be error-prone and tedious.

## ✅ Solution

The **Prototype** design pattern provides a solution to this problem by introducing a **cloneable interface or method** in the base class (prototype). Subclasses implement the cloning method to create copies of themselves. This way, clients can create new objects by copying an existing prototype, reducing the need for complex initialization logic.

In our graphic design application scenario, the **Prototype** pattern allows us to clone shapes easily, providing a flexible and efficient way to create and customize shapes.

## ✍🏻 Application

Let's create a `Shape` interface as our prototype, declaring a method for cloning. Subclasses, such as `Circle`, `Rectangle`, and `Triangle`, implement the cloning method to create copies of themselves.

```typescript
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
```

Now, the client code can create new shapes by cloning existing prototypes without specifying their concrete classes.

```typescript
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
```

## ☯️ Pros and Cons

### Pros

- **Reduced Initialization Cost**: Cloning an existing object can be more efficient than creating a new one from scratch, especially if the initialization process is complex.

- **Flexibility**: Clients can create new objects by cloning prototypes without being aware of their concrete classes, promoting flexibility in object creation.

- **Dynamic Object Creation**: Allows for dynamic creation of new types of objects at runtime by cloning existing prototypes.

### Cons

- **Shallow vs. Deep Copy**: Depending on the language and implementation, the prototype pattern may require handling of shallow or deep copying to ensure proper behavior.

- **Complexity**: Implementing the cloning method in all concrete classes can make the code more complex, especially when dealing with deeply nested or interconnected objects.
