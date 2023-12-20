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
