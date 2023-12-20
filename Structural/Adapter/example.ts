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
