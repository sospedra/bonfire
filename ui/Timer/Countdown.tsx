import useInterval from '@use-it/interval'
import { useRef, useState } from 'react'
import { toTime } from '../../service/time'
import { plans } from './plans'
import css from './countdown.module.css'

export const Countdown: React.FC<{
  mode: 'long' | 'short'
  done: () => void
}> = (props) => {
  const { current: plan } = useRef(plans[props.mode])
  const [status, setStatus] = useState({
    index: 0,
    countdown: plan[0].time,
  })

  useInterval(() => {
    if (status.countdown > 0) {
      setStatus({
        ...status,
        countdown: status.countdown - 1000,
      })
    } else if (plan[status.index + 1]) {
      setStatus({
        index: status.index + 1,
        countdown: plan[status.index + 1].time,
      })
    } else {
      props.done()
    }
  }, 1000)

  return (
    <div>
      <p className='font-mono text-center text-8xl'>
        {toTime(status.countdown)}
      </p>
      <div className='flex flex-row items-center justify-between w-full mt-4'>
        {plan.map(({ type }, position) => {
          const index = Math.floor(position / 2)
          if (type === 'work') {
            return (
              <div
                className={`${css.bullet} ${
                  index === status.index ? css.bulletActive : ''
                } ${index <= status.index ? css.bulletDone : ''}`}
              />
            )
          }

          if (type === 'rest') {
            return (
              <div
                className={`${css.dash} ${
                  index < status.index ? css.dashDone : ''
                }`}
              />
            )
          }

          return null
        })}
        <div
          className={`${css.bullet} ${
            plan.length - 1 === status.index ? css.bulletActive : ''
          } ${plan.length - 1 <= status.index ? css.bulletDone : ''}`}
        />
      </div>
    </div>
  )
}
