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
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};