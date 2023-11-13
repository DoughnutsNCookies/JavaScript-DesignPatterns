# 🌌 Abstract Factory Design Pattern

Also known as the **Kit** pattern, the Abstract Factory is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes.

## ❓ Problem

Consider a scenario where you are developing a game that **supports multiple platforms** (e.g., PC, Console, Mobile) and needs to create UI components such as buttons, panels, and menus. Each platform requires a **specific set of UI components** tailored to its design guidelines.

The challenge arises when you want to ensure that the UI components for each platform are **cohesive** and follow the platform-specific look and feel. The traditional approach of directly creating UI components in the game code results in **code duplication** and makes it difficult to switch between platforms without affecting the entire codebase.

## ✅ Solution

The **Abstract Factory** design pattern addresses this problem by introducing an abstract factory interface that declares **a set of methods** for creating each type of UI component. Concrete subclasses, representing specific platforms, **implement this interface** and provide their **own implementations** for creating UI components.

This way, the game code can use a **factory object** (specific to the selected platform) to create UI components without being concerned with the platform-specific details.

## ✍🏻 Application

In our game development scenario, we can create an `UIFactory` interface that declares methods for creating buttons, panels, and menus.

```typescript
/**
 * Defining the abstract product interfaces.
 */
interface Button {
  render(): void;
}

interface Panel {
  render(): void;
}

interface Menu {
  render(): void;
}

/**
 * Abstract Factory interface declaring methods for creating UI components.
 */
interface UIFactory {
  createButton(): Button;
  createPanel(): Panel;
  createMenu(): Menu;
}
```

Concrete subclasses, such as `PCUIFactory`, `ConsoleUIFactory`, or `MobileUIFactory`, implement this interface to provide platform-specific UI components.

```typescript
/**
 * Implement concrete classes for each UI component for PC platform.
 */
class PCButton implements Button {
  render(): void {
    console.log("Rendering PC Button.");
  }
}

class PCPanel implements Panel {
  render(): void {
    console.log("Rendering PC Panel.");
  }
}

class PCMenu implements Menu {
  render(): void {
    console.log("Rendering PC Menu.");
  }
}

/**
 * Concrete factory implementing the UIFactory interface for PC platform.
 */
class PCUIFactory implements UIFactory {
  createButton(): Button {
    return new PCButton();
  }

  createPanel(): Panel {
    return new PCPanel();
  }

  createMenu(): Menu {
    return new PCMenu();
  }
}
```

Now, the client code in the game can use the abstract factory and create UI components without being concerned with the specific platform implementation.

```typescript
/**
 * Client code using the abstract factory.
 *
 * @param factory The factory to use to create UI components.
 */
function createUIComponents(factory: UIFactory): void {
  const button = factory.createButton();
  const panel = factory.createPanel();
  const menu = factory.createMenu();

  button.render(); // Output: Rendering PC Button.
  panel.render(); // Output: Rendering PC Panel.
  menu.render(); // Output: Rendering PC Menu.
}

/**
 * Usage example for the PC platform.
 */
const pcFactory = new PCUIFactory();
createUIComponents(pcFactory);
```

## ☯️ Pros and Cons

### Pros

- You can be sure that the products you're getting from a factory are **compatible with each other**.
- You **avoid tight coupling** between concrete products and client code.
- **Single Responsibility Principle**. You can extract the product creation code into one place, making the code easier to support.
- **Open/Closed Principle**. You can introduce new variants of products without breaking existing client code.

### Cons

- The code may become more complicated than it should be, since **a lot of new interfaces and classes are introduced** along with the pattern.
