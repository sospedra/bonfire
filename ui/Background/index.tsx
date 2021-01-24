export const Background: React.FC<{}> = () => {
  return (
    <video
      poster='/cover.jpg'
      className='fixed top-0 left-0 object-cover w-full h-full bg-black pointer-events-none'
      style={{ zIndex: -1 }}
      playsInline
      autoPlay
      loop
      muted
      preload='auto'
    >
      <source src='/background.webm' type='video/webm' />
      <source src='/background.mp4' type='video/mp4' />
    </video>
  )
}
