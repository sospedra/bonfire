import prettyMilliseconds from 'pretty-ms'

export const toTime = (mili: number) => {
  const time = prettyMilliseconds(mili, {
    colonNotation: true,
  }).split('.')[0]

  return time.padStart(5, '0')
}
