# 🔄 Iterator

The **Iterator** design pattern provides a way to **access elements of an aggregate object sequentially without exposing its underlying representation**. It defines a common interface for iterating over different types of collections, promoting a unified way of accessing elements.

## ❓ Problem

Imagine you are working on a music player application, and you want to implement a feature that allows users to browse through their playlists and songs. The challenge is to create a mechanism for iterating over the elements of a playlist without exposing the internal structure of the playlist.

The conventional approach might involve exposing the internal data structure of the playlist directly, leading to **tight coupling** and making it **challenging to change the underlying implementation**.

## ✅ Solution

The **Iterator** design pattern provides a solution to this problem by introducing an iterator object that **encapsulates the traversal of elements** in a collection. The collection (aggregate) provides an interface to obtain an iterator, and the iterator object allows clients to access the elements sequentially without exposing the details of the collection's implementation.

In our music player scenario, the Iterator pattern allows us to create a `Playlist` class that encapsulates a collection of songs, and an `Iterator` interface that defines the methods for iterating over the songs. Concrete iterators (`PlaylistIterator`) implement this interface, providing a way to traverse the playlist.

## ✍🏻 Application

Let's create a `Song` class representing a song in the music player. We'll also create an `Iterator` interface with methods for iterating over songs and a `Playlist` class representing a collection of songs. The `Playlist` class provides a method to obtain an iterator, and the `PlaylistIterator` class implements the iterator interface.

```typescript
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
 * Iterator interface defining methods for iterating over songs.
 */
interface Iterator {
  hasNext(): boolean;
  next(): Song;
}

/**
 * Concrete iterator class for iterating over a playlist.
 */
class PlaylistIterator implements Iterator {
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
  createIterator(): Iterator;
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

  createIterator(): Iterator {
    return new PlaylistIterator(this);
  }
}
```

Now, the client code can create playlists, add songs to them, and iterate over the songs using an iterator.

```typescript
/**
 * Client code using the Iterator pattern.
 *
 * @param iterator The iterator to use for iterating over songs.
 */
function iterateSongs(iterator: Iterator): void {
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
```

## ☯️ Pros and Cons

### Pros

- **Decouples Client and Collection**: The Iterator pattern decouples the client code from the internal representation of the collection, promoting flexibility.

- **Unified Interface**: Provides a unified interface for iterating over different types of collections, making it easier to switch between collections.

- **Supports Multiple Iterators**: Allows a collection to have multiple iterators, each maintaining its own traversal state.

### Cons

- **Increased Complexity**: Introducing iterators and iterator interfaces may increase the overall complexity of the code, especially for simpler collections.

- **Limited Efficiency for Some Collections**: For certain collections, direct access might be more efficient than using iterators. It's essential to consider the specific use case and performance requirements.
