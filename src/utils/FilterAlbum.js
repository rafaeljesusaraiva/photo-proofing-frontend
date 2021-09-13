export function FilterAlbum(albums, slug) {
    let found = null;
    albums.forEach(album => {
        if (album.slug === slug) {
            found = album;
        }
    });
    return found;
}