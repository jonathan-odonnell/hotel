const RoomFormError = ({ error }) => {
  return (
    <>
      {error && <div className="error"><p>{error}</p></div>}
  </>
  )
};

export default RoomFormError;