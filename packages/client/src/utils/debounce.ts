function debounce(func: (...args1: any[]) => any, timeout = 300) {
  let timer: number;
  return (...args2: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      func.apply(undefined, args2);
    }, timeout);
  };
}

export default debounce;