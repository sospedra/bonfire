export const parsePlaylistID = (iframeOrPlaylistID: string) => {
  try {
    if (iframeOrPlaylistID.includes('http')) {
      return iframeOrPlaylistID.split('playlists/')[1].split('&')[0]
    } else {
      return iframeOrPlaylistID
    }
  } catch (ex) {
    return null
  }
}
