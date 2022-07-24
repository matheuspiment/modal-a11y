const intersectionObserverMock = function () {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);

export {};
