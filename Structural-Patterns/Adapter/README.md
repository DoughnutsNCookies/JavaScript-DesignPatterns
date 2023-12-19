# 🔄 Adapter

The **Adapter** design pattern allows the interface of an existing class to be **used as another interface**. It is often used to make existing classes work with others **without modifying their source code**. The Adapter pattern is particularly useful when integrating new components into an existing system or when dealing with incompatible interfaces.

## ❓ Problem

Imagine you are developing a multimedia player that can play audio files. The player's existing codebase is designed to work with audio interfaces, but now you want to integrate a new library that provides advanced audio processing capabilities. Unfortunately, the new library uses a different interface, making it **incompatible** with your player.

The conventional approach would involve **modifying the existing codebase** to accommodate the new library's interface. However, this can be **time-consuming, error-prone, and may disrupt the stability** of the existing system.

## ✅ Solution

The **Adapter** design pattern provides a solution to this problem by introducing a **wrapper class (the adapter)** that converts the interface of the new library into the interface expected by the existing code. This allows the new library to **seamlessly integrate** with the multimedia player without requiring modifications to the player's core functionality.

In our multimedia player scenario, the Adapter pattern enables us to use the advanced audio processing library by creating an adapter that translates its interface into the one expected by the player.

## ✍🏻 Application

Let's create an `AudioPlayer` class that works with the existing audio interface. We also have a new library, `AdvancedAudioProcessor`, with a different interface. To make the library compatible with the player, we introduce an adapter, `AdapterForAdvancedAudio`, that translates the library's methods into the expected audio interface.

```typescript
/**
 * Existing audio interface.
 */
interface Audio {
  play(): void;
  pause(): void;
}

/**
 * Class representing the multimedia player.
 */
class AudioPlayer implements Audio {
  play(): void {
    console.log("Playing audio.");
  }

  pause(): void {
    console.log("Pausing audio.");
  }
}

/**
 * New library with an incompatible interface.
 */
class AdvancedAudioProcessor {
  start(): void {
    console.log("Starting processing.");
  }

  stop(): void {
    console.log("Stopping processing.");
  }
}

/**
 * Adapter class that makes the new library compatible with the existing audio interface.
 */
class AdapterForAdvancedAudio implements Audio {
  private advancedAudioProcessor: AdvancedAudioProcessor;

  constructor(advancedAudioProcessor: AdvancedAudioProcessor) {
    this.advancedAudioProcessor = advancedAudioProcessor;
  }

  play(): void {
    this.advancedAudioProcessor.start();
  }

  pause(): void {
    this.advancedAudioProcessor.stop();
  }
}
```

Now, the client code can use the `AudioPlayer` class with the new library through the adapter, seamlessly integrating the advanced audio processing capabilities.

```typescript
/**
 * Client code using the adapter pattern.
 *
 * @param audioInterface The audio interface to use.
 */
function useAudioInterface(audioInterface: Audio) {
  audioInterface.play();
  audioInterface.pause();
}

/**
 * Usage example.
 */
const audioPlayer = new AudioPlayer();
const advancedAudioProcessor = new AdvancedAudioProcessor();
const adapterForAdvancedAudio = new AdapterForAdvancedAudio(advancedAudioProcessor);

useAudioInterface(audioPlayer); // Output: Playing audio. Pausing audio.
useAudioInterface(adapterForAdvancedAudio); // Output: Starting processing. Stopping processing.
```

## ☯️ Pros and Cons

### Pros

- **Compatibility**: Allows incompatible interfaces to work together without modifying existing code.

- **Reusability**: Enables the reuse of existing classes with different interfaces.

- **Separation of Concerns**: The existing code is not aware of the new library's implementation details, promoting a clear separation of concerns.

### Cons

- **Complexity**: Introducing adapters may increase the complexity of the codebase, especially when dealing with multiple adapters.

- **Performance Overhead**: Adapters may introduce a performance overhead, as they translate calls from one interface to another.

- **Multiple Adapters**: In some cases, multiple adapters might be needed to make a new component fully compatible with an existing system.