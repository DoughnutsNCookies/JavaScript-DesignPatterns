# ✈️ Flyweight

The **Flyweight** design pattern is used to **minimize memory or computational overhead** by **sharing as much as possible** with related objects. It is particularly useful when dealing with a large number of similar objects, allowing you to share common state among them and reduce overall resource usage.

## ❓ Problem

Imagine you are working on a graphical editor that allows users to create and manipulate a large number of individual characters (e.g., letters, symbols) on a canvas. The challenge is that each character object carries its own intrinsic properties, such as font, size, and color, leading to **significant memory overhead** when dealing with a large number of characters.

The conventional approach might involve creating a separate object for each character, resulting in high memory consumption and reduced performance.

## ✅ Solution

The Flyweight design pattern provides a solution to this problem by **separating the intrinsic (shared) state and the extrinsic (unique) state** of objects. The intrinsic state is shared among multiple objects, while the extrinsic state is unique to each object. This allows you to reuse shared state, reducing memory overhead and improving performance.

In our graphical editor scenario, the **Flyweight** pattern allows us to create a `CharacterFlyweightFactory` that manages shared character objects and a `Character` class that represents individual characters with unique properties.

## ✍🏻 Application

Let's create a `Character` interface representing the intrinsic state of characters. The `ConcreteCharacter` class implements this interface, representing individual characters with unique extrinsic state. The `CharacterFlyweightFactory` manages shared character objects and provides a method to get or create a character.

```typescript
/**
 * Flyweight interface for characters.
 */
interface Character {
  display(font: string, size: number, color: string): void;
}

/**
 * Concrete flyweight class representing individual characters.
 */
class ConcreteCharacter implements Character {
  private symbol: string;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  display(font: string, size: number, color: string): void {
    console.log(`Character: ${this.symbol}, Font: ${font}, Size: ${size}, Color: ${color}`);
  }
}

/**
 * Flyweight factory class managing shared character objects.
 */
class CharacterFlyweightFactory {
  private characters: { [key: string]: Character } = {};

  getCharacter(symbol: string): Character {
    if (!this.characters[symbol]) {
      this.characters[symbol] = new ConcreteCharacter(symbol);
    }
    return this.characters[symbol];
  }
}
```

Now, the client code can use the `CharacterFlyweightFactory` to create or retrieve shared character objects, reducing memory usage.

```typescript
/**
 * Client code using the Flyweight pattern.
 *
 * @param factory The flyweight factory.
 * @param symbol The symbol for the character.
 * @param font The font for the character.
 * @param size The size for the character.
 * @param color The color for the character.
 */
function useCharacter(factory: CharacterFlyweightFactory, symbol: string, font: string, size: number, color: string): void {
  const character = factory.getCharacter(symbol);
  character.display(font, size, color);
}

/**
 * Usage example.
 */
const characterFactory = new CharacterFlyweightFactory();

useCharacter(characterFactory, "A", "Arial", 12, "Red");
useCharacter(characterFactory, "B", "Times New Roman", 16, "Blue");
useCharacter(characterFactory, "A", "Arial", 12, "Green"); // Reusing existing character object for "A"
```

## ☯️ Pros and Cons

### Pros

- **Memory Efficiency**: Reduces memory usage by sharing common state among multiple objects.

- **Performance Improvement**: Improves performance by reusing shared state, especially when dealing with a large number of similar objects.

- **Scalability**: Allows for easy scalability when dealing with a large number of objects.

### Cons

- **Complexity**: Introduces complexity by separating intrinsic and extrinsic states, which may be unnecessary for simpler scenarios.

- **State Sharing Limitation**: The pattern is most effective when there is a significant amount of shared state; otherwise, the benefits may be limited.
