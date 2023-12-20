# ⭐ Behavioral Design Patterns

**Behavioral design** explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.

## Patterns

Here is a list of common Behavioral design patterns:

### 1. ⛓️ [Chain of Responsibility](./Chain-of-Responsibility)

Passes a request along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

**Use Case:**

- Achieving loose coupling between sender and receiver objects.
- Allowing multiple objects to handle a request without the sender needing to know which will do so.
- Dynamically assembling a chain of handlers based on runtime conditions.

---

### 2. 🕹️ [Command](./Command)

Encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing of requests, and support for undoable operations.

**Use Case:**

- Decoupling the sender and receiver of a request.
- Supporting undoable operations.
- Queuing requests or transforming them into objects for easy parameterization.

---

### 3. 🔄 [Iterator](./Iterator)

Provides a way to access elements of an aggregate object sequentially without exposing its underlying representation. It defines a separate object for traversing the elements.

**Use Case:**

- Iterating over elements of a collection without exposing its internal structure.
- Supporting multiple simultaneous traversals of a collection.
- Simplifying the client code by providing a uniform interface for iteration.

---

### 4. 🤝 [Mediator](./Mediator)

Defines an object that centralizes communication between a set of objects, promoting loose coupling by preventing the objects from explicitly referring to each other.

**Use Case:**

- Decoupling the components of a system by centralizing communication.
- Simplifying the communication between objects in a complex system.
- Allowing for easier maintenance and extension of a system by reducing dependencies.

---

### 5. 📜 [Memento](./Memento)

Captures and externalizes an object's internal state so that the object can be restored to this state later. It allows for the undo or rollback of an object's state.

**Use Case:**

- Providing the ability to restore an object to a previous state.
- Implementing an undo mechanism.
- Preserving and restoring the state of an object without exposing its internal structure.

---

### 6. 🔍 [Observer](./Observer)

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

**Use Case:**

- Establishing a one-to-many relationship between objects.
- Allowing multiple objects to react to changes in another object.
- Decoupling the sender (subject) and receivers (observers) for improved maintainability.

---

### 7. 🔄 [State](./State)

Allows an object to alter its behavior when its internal state changes. The object appears to change its class.

**Use Case:**

- Modeling an object with multiple states and allowing it to transition between them.
- Simplifying complex conditional logic related to an object's state.
- Making state-specific behavior explicit and localizing it in individual state classes.

---

### 8. 🎯 [Strategy](./Strategy)

Defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from clients that use it.

**Use Case:**

- Allowing a client to choose from a family of algorithms dynamically.
- Encapsulating algorithms, making them easily replaceable or extendable.
- Avoiding code duplication when multiple classes share similar functionalities.

---

### 9. 📝 [Template Method](./Template-Method)

Defines the skeleton of an algorithm in the superclass but lets subclasses alter specific steps of the algorithm without changing its structure.

**Use Case:**

- Providing a framework with a defined structure, allowing subclasses to customize certain steps.
- Avoiding code duplication by defining common steps in a base class.
- Allowing extensions of an algorithm without modifying its overall structure.

---

### 10. 🚶 [Visitor](./Visitor)

Represents an operation to be performed on the elements of an object structure. It lets you define a new operation without changing the classes of the elements on which it operates.

**Use Case:**

- Defining operations on elements of a complex object structure without modifying those elements.
- Separating the algorithm from the elements on which it operates.
- Adding new operations to a set of classes without altering their code.

---