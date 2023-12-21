 # 🕰️ Memento

The **Memento** design pattern **captures and externalizes an object's internal state without exposing its structure**. This allows the object to be restored to this state later. The pattern is useful when you need to **implement undo mechanisms, persist object states, or provide snapshots of an object's state**.

## ❓ Problem

Imagine you are developing a text editor application, and you want to implement an undo/redo mechanism to allow users to revert to previous states of the document. The challenge is to capture and restore the state of the document without exposing its internal details.

The conventional approach might involve **tightly coupling the document state with the undo/redo functionality**, making it **difficult to maintain and extend the system**.

## ✅ Solution

The **Memento** design pattern provides a solution to this problem by introducing three main components: the **Originator** (the object whose state needs to be saved), the **Memento** (an object that stores the state of the Originator), and the **Caretaker** (an object responsible for keeping track of and managing the Mementos).

In our text editor scenario, the Memento pattern allows us to create a `TextEditor` class (Originator) that can save and restore its state using `TextEditorMemento` objects (Memento), managed by a `History` class (Caretaker).

## ✍🏻 Application

Let's create a `TextEditor` class representing the Originator, a `TextEditorMemento` class representing the Memento, and a `History` class representing the Caretaker.

```typescript
/**
 * Memento class representing the state of the text editor.
 */
class TextEditorMemento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

/**
 * Originator class representing the text editor.
 */
class TextEditor {
  private text: string;

  constructor() {
    this.text = "";
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }

  createMemento(): TextEditorMemento {
    return new TextEditorMemento(this.text);
  }

  restoreFromMemento(memento: TextEditorMemento): void {
    this.text = memento.getState();
  }
}

/**
 * Caretaker class managing the history of the text editor states.
 */
class History {
  private mementos: TextEditorMemento[] = [];

  addMemento(memento: TextEditorMemento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): TextEditorMemento | undefined {
    return this.mementos[index];
  }
}
```

Now, the client code can use the Memento pattern to save and restore states of the text editor.

```typescript
/**
 * Client code using the Memento pattern.
 */
function testTextEditorMemento(): void {
  const textEditor = new TextEditor();
  const history = new History();

  // Initial state
  textEditor.setText("Hello, ");
  history.addMemento(textEditor.createMemento());

  // Update state
  textEditor.setText("Hello, World!");
  history.addMemento(textEditor.createMemento());

  // Restore to previous state
  const previousMemento = history.getMemento(0);
  if (previousMemento) {
    textEditor.restoreFromMemento(previousMemento);
    console.log(`Restored state: ${textEditor.getText()}`);
  } else {
    console.log("No previous state available.");
  }
}

/**
 * Usage example.
 */
testTextEditorMemento();
```

## ☯️ Pros and Cons

### Pros

- **State Encapsulation**: The Memento pattern encapsulates the state of an object, preventing direct access and modification by external components.

- **Undo/Redo Mechanism**: Provides a convenient way to implement undo/redo mechanisms in applications.

- **Maintainability**: Separates concerns and makes it easier to maintain and extend the system.

### Cons

- **Overhead**: Can introduce overhead, especially when dealing with large states or frequent state changes.

- **Increased Complexity**: Adds additional classes and relationships, increasing the overall complexity of the system.

- **Memory Usage**: Storing multiple states might consume memory, especially if a large number of Mementos are kept in the history.