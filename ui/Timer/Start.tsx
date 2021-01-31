export const Start: React.FC<{ onSelect: (mode: 'long' | 'short') => any }> = (
  props,
) => {
  return (
    <div className='flex flex-row'>
      <button
        onClick={() => props.onSelect('long')}
        className='flex flex-col items-center justify-center flex-1 p-4 mr-2 font-bold border-2 border-white rounded hover:underline'
      >
        <p>Start long session</p>
        <p>(2 hours)</p>
      </button>
      <button
        onClick={() => props.onSelect('short')}
        className='flex flex-col items-center justify-center flex-1 p-4 ml-2 text-gray-400 border-2 border-gray-400 rounded hover:underline'
      >
        <p>Start short session</p>
        <p>(45 minutes)</p>
      </button>
    </div>
  )
}
