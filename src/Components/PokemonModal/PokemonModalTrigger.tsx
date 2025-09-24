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
      tabIndex={0}
      role='button'
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          setIsOpen(true);
        }
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }}
      className='cursor-pointer'
      onClick={() => setIsOpen(true)}
    >
      {trigger}
    </span>
  );
};

export default PokemonModalTrigger;
