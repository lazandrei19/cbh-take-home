const crypto = require("crypto");

// Constants moved at the top for visibility
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Given an optional event, returns a partitionKey.
 * @param {{partitionKey?: string} | undefined} event - The event for which to get the partition key (optional)
 * @returns {string} The partition key
 */
exports.deterministicPartitionKey = (event) => {
  if (event === undefined) return TRIVIAL_PARTITION_KEY;

  if (!event.partitionKey) {
    return crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  const givenPartitionKey = typeof event.partitionKey === "string" ?
    event.partitionKey :
    JSON.stringify(event.partitionKey);
  if (givenPartitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(givenPartitionKey).digest("hex");
  }

  return givenPartitionKey
};