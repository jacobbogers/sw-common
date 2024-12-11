import { runifOne } from 'lib-r-math.js';

export async function handler(event, context) {
  for (const message of event.Records) {
    await processMessageAsync(message);
  }
  console.info("done");
}

async function processMessageAsync(message) {
  try {
    console.log(`${runifOne(0, 1)} Processed message ${message.body}`);
    await Promise.resolve(1);
  } catch (err) {
    console.error("An error occurred");
    throw err;
  }
}
