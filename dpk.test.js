const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the partition key when given a partition key as input", () => {
    const givenKey = deterministicPartitionKey({
      partitionKey: "123"
    });
    expect(givenKey).toBe("123");
  });

  it("Returns the correct partition key", () => {
    const computedKey = deterministicPartitionKey({});
    const hash = crypto.createHash("sha3-512").update("{}").digest("hex");
    expect(computedKey).toBe(hash);
  });

  it("Returns the correct partition key if called multiple times with the same input", () => {
    const hash = crypto.createHash("sha3-512").update("{}").digest("hex");
    let computedKey = deterministicPartitionKey({});
    expect(computedKey).toBe(hash);
    computedKey = deterministicPartitionKey({});
    expect(computedKey).toBe(hash);
  });

  it("Returns the correct partition key if the initial partition key is not a string", () => {
    const givenKey = deterministicPartitionKey({
      partitionKey: 123
    });
    expect(givenKey).toBe("123");
  });

  it("Returns the correct partition key if the initial partition key is not a string", () => {
    const partitionKey = "A".repeat(1024);
    const computedKey = deterministicPartitionKey({
      partitionKey,
    });
    const hash = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    expect(computedKey).toBe(hash);
  });
});
