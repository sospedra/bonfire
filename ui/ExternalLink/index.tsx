export const ExternalLink: React.FC<{ href: string; className?: string }> = (
  props,
) => {
  return (
    <a
      className={`font-bold hover:underline ${props.className || ''}`}
      href={props.href}
      rel='noopener noreferrer'
      target='_blank'
    >
      {props.children}
    </a>
  )
}
