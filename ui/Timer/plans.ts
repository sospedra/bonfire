import { toMiliseconds } from '../../service/time'

type Plan = { type: 'work' | 'rest'; time: number }[]

export const plans: {
  long: Plan
  short: Plan
} = {
  long: [
    {
      type: 'work',
      time: toMiliseconds(20),
    },
    {
      type: 'rest',
      time: toMiliseconds(10),
    },
    {
      type: 'work',
      time: toMiliseconds(25),
    },
    {
      type: 'rest',
      time: toMiliseconds(10),
    },
    {
      type: 'work',
      time: toMiliseconds(20),
    },
    {
      type: 'rest',
      time: toMiliseconds(5),
    },
    {
      type: 'work',
      time: toMiliseconds(15),
    },
  ],
  short: [
    {
      type: 'work',
      // time: toMiliseconds(20),
      time: 7000,
    },
    {
      type: 'rest',
      time: toMiliseconds(5),
    },
    {
      type: 'work',
      time: toMiliseconds(20),
    },
  ],
}
