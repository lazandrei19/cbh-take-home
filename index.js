const { deterministicPartitionKey } = require("./dpk");

console.log(deterministicPartitionKey({
    partitionKey: "123",
    aa: 1
}));