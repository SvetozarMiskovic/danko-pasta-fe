const PokemonStatTitle = ({
  name,
  xp,
}: {
  name: string | undefined;
  xp: number | undefined;
}) => {
  return (
    <div className='w-full text-white bg-green-700 flex justify-between border border-gray-400  p-2 rounded-md'>
      <h3 className='capitalize font-bold text-xl md:text-2xl'>{name}</h3>
      <h3 className='font-bold text-xl md:text-2xl self-center'>XP {xp}</h3>
    </div>
  );
};

export default PokemonStatTitle;
