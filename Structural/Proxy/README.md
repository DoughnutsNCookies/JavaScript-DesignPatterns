# 🛡️ Proxy

The **Proxy** design pattern provides a surrogate or placeholder for another object to **control access** to it. It is useful in scenarios where you want to add an extra layer of control over the interaction with an object, such as lazy loading, access control, or logging.

## ❓ Problem

Imagine you are developing a multimedia application that loads and displays high-resolution images. Loading these images can be resource-intensive, and you want to optimize the process by only loading images when they are actually needed. The challenge is to implement a mechanism that allows you to control the loading of images and perform additional actions when accessing them.

The conventional approach might involve loading images directly, leading to **unnecessary resource usage and potential performance issues**.

## ✅ Solution

The **Proxy** design pattern provides a solution to this problem by introducing a proxy class that acts as a surrogate for the real object. The proxy class controls access to the real object and can perform additional actions before or after delegating the request to the real object. In our multimedia application scenario, the proxy can be responsible for lazy loading images and performing logging or access control.

## ✍🏻 Application

Let's create an `Image` interface representing the real object that loads and displays high-resolution images. The `RealImage` class implements this interface, representing the actual image loading process. The `ImageProxy` class acts as a proxy, controlling access to the real image and performing additional actions.

```typescript
/**
 * Subject interface for the real object and proxy.
 */
interface Image {
  display(): void;
}

/**
 * Real object class that loads and displays high-resolution images.
 */
class RealImage implements Image {
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
    this.loadImage();
  }

  private loadImage(): void {
    console.log(`Loading image: ${this.filename}`);
    // Simulate loading the image (resource-intensive operation).
  }

  display(): void {
    console.log(`Displaying image: ${this.filename}`);
    // Simulate displaying the image.
  }
}

/**
 * Proxy class that controls access to the real image.
 */
class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}
```

Now, the client code can use the `ImageProxy` class to control access to the real image, ensuring that the image is loaded only when needed.

```typescript
/**
 * Client code using the Proxy pattern.
 *
 * @param image The image to display.
 */
function displayImage(image: Image): void {
  image.display();
}

/**
 * Usage example.
 */
const imageProxy1 = new ImageProxy("highres1.jpg");
const imageProxy2 = new ImageProxy("highres2.jpg");

// Image loading is deferred until the display method is called.
displayImage(imageProxy1);
displayImage(imageProxy2);

// Subsequent calls to display do not reload the image.
displayImage(imageProxy1);
```

## ☯️ Pros and Cons

### Pros

- **Controlled Access**: Allows control over the access to the real object, enabling additional actions before or after the request is delegated.

- **Lazy Loading**: Supports lazy loading, allowing resources to be loaded only when they are actually needed.

- **Security**: Can be used for implementing access control mechanisms to restrict access to certain operations.

### Cons

- **Complexity**: Introduces an additional layer of complexity, especially in scenarios where multiple proxy classes are involved.

- **Overhead**: The proxy might introduce some overhead, especially when performing additional actions or maintaining state.
