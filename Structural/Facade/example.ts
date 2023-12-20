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
