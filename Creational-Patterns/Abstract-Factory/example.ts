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

/**
 * Implement concrete classes for each UI component.
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
