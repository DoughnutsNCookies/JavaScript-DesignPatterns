# 🏰 Facade

The **Facade** design pattern provides a **simplified and unified interface** to a set of interfaces in a subsystem, making it easier to use and reducing the complexity of the system. It is particularly useful when dealing with complex systems or multiple subsystems, providing a higher-level interface that clients can interact with.

## ❓ Problem

Imagine you are developing a home theater system with multiple components such as a DVD player, amplifier, speakers, and projector. The challenge is to create a system that allows users to enjoy a movie without having to interact with each individual component. Without a simplified interface, users would need to **manage each device separately**, leading to a **cumbersome and error-prone experience**.

## ✅ Solution

The **Facade** design pattern provides a solution to this problem by introducing a facade class that **encapsulates the complexities** of the subsystem and provides a simplified interface for clients. The facade acts as a gateway, allowing clients to perform common operations **without dealing with the intricacies of the underlying subsystem**. This pattern enhances usability and shields clients from unnecessary details.

In our home theater system scenario, the **Facade** pattern allows us to create a `HomeTheaterFacade` that simplifies the process of enjoying a movie by coordinating the interactions between the DVD player, amplifier, speakers, and projector.

## ✍🏻 Application

Let's create a `HomeTheaterFacade` class that encapsulates the complexities of the home theater system. The facade provides methods for common operations such as starting a movie, stopping the movie, and adjusting the volume.

```typescript
/**
 * Subsystem class - DVD player.
 */
class DVDPlayer {
  on(): void {
    console.log("DVD player is ON");
  }

  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }

  stop(): void {
    console.log("Stopping the DVD player");
  }

  off(): void {
    console.log("DVD player is OFF");
  }
}

/**
 * Subsystem class - Amplifier.
 */
class Amplifier {
  on(): void {
    console.log("Amplifier is ON");
  }

  setVolume(volume: number): void {
    console.log(`Setting volume to ${volume}`);
  }

  off(): void {
    console.log("Amplifier is OFF");
  }
}

/**
 * Subsystem class - Speakers.
 */
class Speakers {
  on(): void {
    console.log("Speakers are ON");
  }

  off(): void {
    console.log("Speakers are OFF");
  }
}

/**
 * Subsystem class - Projector.
 */
class Projector {
  on(): void {
    console.log("Projector is ON");
  }

  setInput(input: string): void {
    console.log(`Setting input to ${input}`);
  }

  off(): void {
    console.log("Projector is OFF");
  }
}

/**
 * Facade class - Home Theater Facade.
 */
class HomeTheaterFacade {
  private dvdPlayer: DVDPlayer;
  private amplifier: Amplifier;
  private speakers: Speakers;
  private projector: Projector;

  constructor(dvdPlayer: DVDPlayer, amplifier: Amplifier, speakers: Speakers, projector: Projector) {
    this.dvdPlayer = dvdPlayer;
    this.amplifier = amplifier;
    this.speakers = speakers;
    this.projector = projector;
  }

  watchMovie(movie: string): void {
    console.log("Get ready to watch a movie!");
    this.projector.on();
    this.projector.setInput("DVD");
    this.amplifier.on();
    this.amplifier.setVolume(10);
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);
    this.speakers.on();
  }

  endMovie(): void {
    console.log("That's a wrap! Ending the movie.");
    this.dvdPlayer.stop();
    this.dvdPlayer.off();
    this.amplifier.off();
    this.speakers.off();
    this.projector.off();
  }

  adjustVolume(volume: number): void {
    console.log(`Adjusting volume to ${volume}`);
    this.amplifier.setVolume(volume);
  }
}
```

Now, the client code can interact with the home theater system through the simplified `HomeTheaterFacade`, making it easier to enjoy movies without managing each device individually.

```typescript
/**
 * Client code using the Facade pattern.
 */
function movieNight(): void {
  const dvdPlayer = new DVDPlayer();
  const amplifier = new Amplifier();
  const speakers = new Speakers();
  const projector = new Projector();

  const homeTheaterFacade = new HomeTheaterFacade(dvdPlayer, amplifier, speakers, projector);

  homeTheaterFacade.watchMovie("Inception");
  homeTheaterFacade.adjustVolume(15);
  homeTheaterFacade.endMovie();
}

/**
 * Usage example.
 */
movieNight();
```

## ☯️ Pros and Cons

### Pros

- **Simplified Interface**: Provides a simplified and unified interface to a set of interfaces in a subsystem.

- **Client Convenience**: Makes it easier for clients to interact with the system by encapsulating complex operations.

- **Reduced Dependency**: Clients depend on the facade rather than the individual components, reducing dependency and coupling.

### Cons

- **Limited Customization**: May limit the customization of individual subsystem components for advanced users.

- **Dependency on Facade**: Clients become dependent on the facade, and changes to the facade may impact client code.
