const Error = ({ error }: { error: string }) => {
  return <span className='text-red-500 text-xs'>{error}</span>;
};

export default Error;
