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

  /** @type {string} */
  let candidate;

  if (event.partitionKey) {
    let givenPartitionKey = JSON.stringify(event.partitionKey);
    candidate = givenPartitionKey.length > MAX_PARTITION_KEY_LENGTH ?
      crypto.createHash("sha3-512").update(candidate).digest("hex") :
      givenPartitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return candidate;
};