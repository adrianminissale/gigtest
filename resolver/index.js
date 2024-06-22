const add = async (parent, args) => {};

const get = async (parent, args) => {};

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
