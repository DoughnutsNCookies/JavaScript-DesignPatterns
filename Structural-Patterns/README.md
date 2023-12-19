# 🧠 Structural Design Patterns

**Structural design** explain how to assemble objects and classes into larger structures, while keeping these structures flexible and efficient.

## Patterns

Here is a list of common Structural design patterns:

### 1. 🔄 [Adapter](./Adapter)

Allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

**Use Case:**

- Integrating new functionalities without altering existing code.
- Making incompatible interfaces compatible.
- Reusing existing classes in a new system architecture.

---

### 2. 🌉 [Bridge](./Bridge)

Separates abstraction from implementation, allowing them to vary independently. It involves a bridge interface that acts as a mediator between two components, allowing them to evolve independently.

**Use Case:**

- Decoupling abstraction and implementation.
- Facilitating the support of multiple platforms or systems.
- Enhancing scalability and flexibility in system design.

---

### 3. 🌲 [Composite](./Composite)

Composes objects into tree structures to represent part-whole hierarchies. Clients can treat individual objects and compositions of objects uniformly.

**Use Case:**

- Treating individual objects and compositions uniformly.
- Simplifying the client code when working with complex tree structures.
- Supporting recursive composition of elements.

---

### 4. 🎨 [Decorator](./Decorator)

Attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality.

**Use Case:**

- Adding or altering behavior of objects without modifying their code.
- Combining multiple features or responsibilities dynamically.
- Designing a flexible system with easily customizable components.

---

### 5. 🏰 [Facade](./Facade)

Provides a simplified, unified interface to a set of interfaces in a subsystem. It defines a higher-level interface that makes the subsystem easier to use.

**Use Case:**

- Presenting a simplified interface to a complex system.
- Shielding clients from the complexities of subsystem components.
- Improving maintainability by encapsulating subsystem changes.

---

### 6. 🔃 [Flyweight](./Flyweight)

Minimizes memory usage or computational expenses by sharing as much as possible with related objects. It is particularly useful when a large number of similar objects need to be created.

**Use Case:**

- Managing a large number of similar objects efficiently.
- Reducing memory footprint by sharing common state.
- Improving performance in scenarios with a vast number of instances.

---

### 7. 🔒 [Proxy](./Proxy)

Acts as a placeholder for another object, controlling access to it. It is useful for implementing lazy loading, access control, logging, or monitoring of the real object.

**Use Case:**

- Controlling access to an object.
- Implementing lazy loading for resource-intensive objects.
- Adding a level of indirection to support security or logging.

---