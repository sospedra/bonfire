import css from './footer.module.css'

export const Footer: React.FC<{}> = () => {
  return (
    <footer className='flex text-xs italic text-center'>
      <p>
        hand-crafted with 💜 by{' '}
        <a
          href='https://sospedra.me'
          target='_blank'
          rel='noopener noreferrer'
          className={css.signature}
        >
          sospedra
        </a>
      </p>
    </footer>
  )
}
