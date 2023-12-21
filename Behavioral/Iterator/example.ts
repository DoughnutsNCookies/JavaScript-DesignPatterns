/**
 * Song class representing a song in the music player.
 */
class Song {
  private title: string;
  private artist: string;

  constructor(title: string, artist: string) {
    this.title = title;
    this.artist = artist;
  }

  getTitle(): string {
    return this.title;
  }

  getArtist(): string {
    return this.artist;
  }
}

/**
 * MyIterator interface defining methods for iterating over songs.
 */
interface MyIterator {
  hasNext(): boolean;
  next(): Song;
}

/**
 * Concrete iterator class for iterating over a playlist.
 */
class PlaylistIterator implements MyIterator {
  private playlist: Playlist;
  private currentPosition: number;

  constructor(playlist: Playlist) {
    this.playlist = playlist;
    this.currentPosition = 0;
  }

  hasNext(): boolean {
    return this.currentPosition < this.playlist.getSongs().length;
  }

  next(): Song {
    const song = this.playlist.getSongs()[this.currentPosition];
    this.currentPosition++;
    return song;
  }
}

/**
 * Aggregate interface defining the method for obtaining an iterator.
 */
interface Aggregate {
  createIterator(): MyIterator;
}

/**
 * Concrete aggregate class representing a playlist.
 */
class Playlist implements Aggregate {
  private songs: Song[] = [];

  addSong(song: Song): void {
    this.songs.push(song);
  }

  getSongs(): Song[] {
    return this.songs;
  }

  createIterator(): MyIterator {
    return new PlaylistIterator(this);
  }
}

/**
 * Client code using the MyIterator pattern.
 *
 * @param iterator The iterator to use for iterating over songs.
 */
function iterateSongs(iterator: MyIterator): void {
  while (iterator.hasNext()) {
    const song = iterator.next();
    console.log(`Now playing: ${song.getTitle()} by ${song.getArtist()}`);
  }
}

/**
 * Usage example.
 */
const playlist = new Playlist();
playlist.addSong(new Song("Song1", "Artist1"));
playlist.addSong(new Song("Song2", "Artist2"));
playlist.addSong(new Song("Song3", "Artist3"));

const iterator = playlist.createIterator();
iterateSongs(iterator);
