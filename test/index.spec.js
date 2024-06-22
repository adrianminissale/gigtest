const chai = require("chai");
const expect = chai.expect;
const fs = require("fs");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server");

const connection = require("../db/connection");

const schema = fs.readFileSync(
  path.join(__dirname, "../schema.graphql"),
  "utf8"
);
const typeDefs = gql(schema);
const resolvers = require("../resolver");
const Currency = require("../db/model/currency");

let testServer, randomValue = Math.floor(Math.random() * 100);

before(async () => {
  await connection.initialize();
  testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

describe("Currency Converter Tests- ", () => {
  describe("Add Currency Tests - ", () => {
    it(`#1 - should add dollar currency`, async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    addCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "Dollar",
            value: randomValue,
          },
        },
      });

      const currency = await Currency.findOne({
        where: {
          name: "Dollar",
        },
      });

      expect(response.data.addCurrency).to.be.eq("Currency Added!");
      expect(currency.dataValues.name).to.be.eq("Dollar");
      expect(currency.dataValues.value).to.be.eq(randomValue);
    });

    it("#2 - should send Invalid Input in case of empty name", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    addCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "",
            value: 85,
          },
        },
      });

      expect(response.data.addCurrency).to.be.eq("Invalid Input!");
    });

    it("#3 - should send Invalid Input in case of zero value", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    addCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "Dollar",
            value: 0,
          },
        },
      });

      expect(response.data.addCurrency).to.be.eq("Invalid Input!");
    });
  });

  describe("Get Currency Tests", () => {
    it("#1 - should return Dollar value", async () => {
      const response = await testServer.executeOperation({
        query: `query ExampleQuery($name: String!) {
                getValue(name: $name) {
                  name,
                  value
                }
              }`,
        variables: { name: "Dollar" },
      });

      expect(response.data.getValue.name).to.be.eq("Dollar");
      expect(response.data.getValue.value).to.be.eq(randomValue);
    });

    it("#2 - should return Empty name and zero value on Euro", async () => {
      const response = await testServer.executeOperation({
        query: `query ExampleQuery($name: String!) {
                getValue(name: $name) {
                  name,
                  value
                }
              }`,
        variables: { name: "Euro" },
      });

      expect(response.data.getValue.name).to.be.eq("");
      expect(response.data.getValue.value).to.be.eq(0);
    });
  });

  describe("Update Currency Tests", () => {
    it("#1 - should update Dollar value", async () => {
      randomValue = Math.floor(Math.random() * 100);
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    updateCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "Dollar",
            value: randomValue,
          },
        },
      });

      const currency = await Currency.findOne({
        where: {
          name: "Dollar",
        },
      });

      expect(response.data.updateCurrency).to.be.eq("Currency Updated!");
      expect(currency.dataValues.name).to.be.eq("Dollar");
      expect(currency.dataValues.value).to.be.eq(randomValue);
    });

    it("#2 - should send Invalid Input in case of empty name", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    updateCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "",
            value: 85,
          },
        },
      });

      expect(response.data.updateCurrency).to.be.eq("Invalid Input!");
    });

    it("#3 - should send Invalid Input in case of zero value", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($currency: CurrencyInput!) {
                    updateCurrency(currency: $currency)
                  }`,
        variables: {
          currency: {
            name: "Dollar",
            value: 0,
          },
        },
      });

      expect(response.data.updateCurrency).to.be.eq("Invalid Input!");
    });
  });

  describe("Delete Currency Tests", () => {
    it("#1 - should Delete Dollar from DB", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($name: String!) {
            deleteCurrency(name: $name)
              }`,
        variables: { name: "Dollar" },
      });

      const currency = await Currency.findOne({
        where: {
          name: "Dollar",
        },
      });

      expect(response.data.deleteCurrency).to.be.eq("Currency Deleted!");
      expect(currency).to.be.eq(null);
    });

    it("#2 - should return Invalid Input for deleting Euro", async () => {
      const response = await testServer.executeOperation({
        query: `mutation Mutation($name: String!) {
            deleteCurrency(name: $name)
              }`,
        variables: { name: "Euro" },
      });

      expect(response.data.deleteCurrency).to.be.eq("Invalid Input!");
    });
  });
});
