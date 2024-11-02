# stream-casts

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

## Documentation

- [Product Requirements Document (PRD)](./requirements.txt)

## Sonatabot

### How does it work?

Sonatabot adds a comment to all the casts that are indexed.

It uses an `ED25519` signer from the bot farcaster account to sign messages.

### Generate Signer Private Key

To set up the bot, you need to generate a `SIGNER_PRIVATE_KEY`. Follow these steps:

1. Add the following environment variables to your `.env` file:

   - `APP_FID`
   - `APP_MNEMONIC`

2. Run the following command to generate the signer:

   ```bash
   bun generate-signer
   ```

3. This command will return:

   - A private key (to be used as `SIGNER_PRIVATE_KEY`)
   - A deeplink URL

4. Open the deeplink URL in Warpcast to authorize the private key.

5. Add the `SIGNER_PRIVATE_KEY` to your `.env` file:

   ```
   SIGNER_PRIVATE_KEY=your_generated_private_key
   ```

### Testing The Signer

1. Run the following command to generate the signer:

   ```bash
   bun test-signer
   ```

2. The bot should create a new cast saying 'Hello World!'
