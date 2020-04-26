module.exports = initialContext => {
  let context = initialContext || {};
  return func => async (...args) => {
    const result = await Promise.resolve(func(context, ...args));
    context = result || context;
  };
};
