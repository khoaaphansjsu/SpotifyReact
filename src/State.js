class State() {
    constructor(user) {
        this.db = null;
        this.supafy = null;
        this.user = user;
        this.superplaylists = []
        this.superplaylist = {
            "playlists": [],
            "artists": [],
            "songs": []
        }

    }
}