const currencies = [];
let currencyId = 0;

const add = async (parent, { currency }) => {
  const newCoin = {...currency, id: currencyId++};
  currencies.push(newCoin);
  return "Currency Added!";
};

const getAll = async (parent) => {
  return currencies;
};

const get = async (parent, { name }) => {
  return currencies.find(coin => coin.name === name);
};

const update = async (parent, { currency }) => {
  const currencyId = currencies.findIndex(coin => coin.name === currency.name);
  currencies[currencyId] = {...currencies[currencyId], ...currency}
  return currency;
};

const remove = async (parent, { name }) => {
  const currencyId = currencies.findIndex(coin => coin.name === name);
  currencies.splice(currencyId, 1);
  return "Currency Deleted!";
};

module.exports = {
  Query: {
    getAll: getAll,
    getValue: get,
  },
  Mutation: {
    addCurrency: add,
    updateCurrency: update,
    deleteCurrency: remove,
  },
};
