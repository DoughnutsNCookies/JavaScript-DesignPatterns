# 🧠 Creational Design Patterns

**Creational design** patterns focus on the process of object creation.

They provide mechanisms for creating instances of objects in a way that is flexible, efficient, and independent of the system's architecture, making a system independent of its object creation, composition, and representation.

## Patterns

Here is a list of common creational design patterns:

### 1. 🏭 [Factory Method](./Factory-Method)

Defines an interface for creating an object but leaves the choice of its type to the subclasses, creation being deferred at the time of instantiation.

**Use Case:**

- Creating objects without specifying the exact class.
- A class cannot anticipate the class of objects it must create.

---

### 2. 🌌 [Abstract Factory](./Abstract-Factory)

Provides an interface for creating families of related or dependent objects without specifying their concrete classes.

**Use Case:**

- Creating families of objects that need to be consistent with each other.
- Switching between different families of objects in a system.

---

### 3. 👷 [Builder](./Builder)

Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

**Use Case:**

- Constructing complex objects step by step.
- Creating different representations of the same object.

---

### 4. 🤖 [Prototype](./Prototype)

Creates new objects by copying an existing object, known as the prototype.

**Use Case:**

- Creating new objects that are similar to existing objects.
- Reducing the cost of creating complex objects.

---

### 5. 1️⃣ [Singleton](./Singleton)

Ensures a class has only one instance and provides a global point of access to it.

**Use Case:**

- Controlling access to resources, such as a database connection.
- Managing a shared resource in a concurrent system.

---
