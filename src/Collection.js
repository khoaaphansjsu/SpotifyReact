class Collections() {
    constructor(name) {
        this.name = name;
        this.playlists = [];
        this.artists = [];
        this.songs = [];
    }
    getJSON() {
        json = {
            "name": this.name,
            "playlists": this.playlists,
            "artists": this.artists,
            "songs": this.songs
        }
        return json;
    }
}