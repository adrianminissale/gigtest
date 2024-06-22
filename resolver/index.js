const currencies = []

const add = async (parent, { currency }) => {
  const newCoin = { currency };
  currencies.push(newCoin);
  console.log('------------------------------------');
  console.log(currency);
  console.log('------------------------------------');
  return "Currency Added!";
};

const get = async (parent, { name }) => {
  console.log('------------------------------------');
  console.log(currencies);
  console.log('------------------------------------');
  return currencies.filter(coin => coin.name === name);
};

const update = async (parent, args) => {};

const remove = async (parent, args) => {};

module.exports = {
  Query: {
    getValue: get,
  },
  Mutation: {
    addCurrency: add,
    updateCurrency: update,
    deleteCurrency: remove,
  },
};
