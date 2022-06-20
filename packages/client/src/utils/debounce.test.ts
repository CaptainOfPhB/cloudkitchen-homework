import debounce from './debounce';

jest.useFakeTimers();

it('callback should be executed after delay time', () => {
  const fn = jest.fn();
  debounce(fn)();
  expect(fn).not.toBeCalled();
  jest.advanceTimersByTime(300);
  expect(fn).toHaveBeenCalledTimes(1);
});

it('callback should only be executed when the interval time is greater than the delay time', () => {
  const fn = jest.fn();
  const callback = jest.fn(debounce(fn));
  callback(1);
  callback(12);
  callback(123);
  callback(1234);
  callback(12345);
  jest.advanceTimersByTime(300);
  expect(callback).toHaveBeenCalledTimes(5);
  expect(fn).toHaveBeenCalledTimes(1);
  expect(fn).toBeCalledWith(12345);
});
