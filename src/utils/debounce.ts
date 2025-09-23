// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceConstraintType = (...args: any[]) => void;

function debounce<F extends DebounceConstraintType>(fn: F, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default debounce;
