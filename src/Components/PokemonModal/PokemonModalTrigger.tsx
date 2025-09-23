import React from 'react';

const PokemonModalTrigger = ({
  setIsOpen,
  trigger,
}: {
  setIsOpen: (isOpen: boolean) => void;
  trigger: React.ReactNode;
}) => {
  return (
    <span
      className='cursor-pointer'
      onClick={() => setIsOpen(true)}
    >
      {trigger}
    </span>
  );
};

export default PokemonModalTrigger;
