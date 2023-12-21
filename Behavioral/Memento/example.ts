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
class MyHistory {
  private mementos: TextEditorMemento[] = [];

  addMemento(memento: TextEditorMemento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): TextEditorMemento | undefined {
    return this.mementos[index];
  }
}

/**
 * Client code using the Memento pattern.
 */
function testTextEditorMemento(): void {
  const textEditor = new TextEditor();
  const history = new MyHistory();

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