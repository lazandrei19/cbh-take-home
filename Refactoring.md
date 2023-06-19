# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. I moved the constants out of the function, to improve visibility and ease of change.
2. I looked for patterns where I could un-nest statements, thus making the code easier to read and lessening the cognitive load of the developers looking at the code, by maintaining them maximum indent level to a minimum.
3. After that, I realized that the code basically handled three cases:
   1. There was no event provided, so we would return TRIVIAL_PARTITION_KEY.
   2. An event was provided and a partition key wasn't given, in which case we calculate the hash of the event
   3. An event was provided and a partition key was given, so we stringify the partition key (if needed) and then make sure it is smaller than the maximum
4. I added JSDocs for better DX with code editors (a typescript compiler could have been added for an even better experience).
5. I added test cases to test for repetability of the hash and for the different conditions, thus achieving a 100% code coverage.
