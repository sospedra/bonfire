import prettyMilliseconds from 'pretty-ms'

export const toTime = (mili: number) => {
  return prettyMilliseconds(mili, {
    colonNotation: true,
  }).split('.')[0]
}
