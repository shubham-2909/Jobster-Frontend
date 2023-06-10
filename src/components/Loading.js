const Loading = ({ center }) => {
  return (
    <div
      style={{ marginTop: '30px' }}
      className={center ? 'loading loading-center' : 'loading'}
    ></div>
  )
}

export default Loading
