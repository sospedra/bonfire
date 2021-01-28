const subselect = (text: string) => {
  return text.split('-').pop().trim()
}

export const createSong = (sound: Sound) => {
  const song = { ...sound }

  song.title = subselect(song.title)

  return song
}
