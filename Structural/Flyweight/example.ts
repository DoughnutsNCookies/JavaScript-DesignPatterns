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
