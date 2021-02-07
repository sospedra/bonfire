import { DEFAULT_PLAYLIST_ID } from '../service/playlist'
import { Home } from '../ui/Home'

export default function Root() {
  return <Home playlistID={DEFAULT_PLAYLIST_ID} />
}
