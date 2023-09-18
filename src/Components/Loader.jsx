const Loader = () => {
  return (
    <div
      style={{
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '100vh',
        zIndex: 5,
        position: 'absolute',
      }}
    >
      <div className='spinner-border text-center' role='status'>
        <span className='sr-only' />
      </div>
    </div>
  );
};
export default Loader;
