# feliz-viernes

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

## Digital Ocean Droplet Setup

### 1. Create and Access Your Droplet

1. Create a new Ubuntu droplet on Digital Ocean
2. Access your droplet via SSH:
   ```bash
   ssh root@your_droplet_ip
   ```

### 2. Install Required Software

1. Install Node Version Manager (nvm):

   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   ```

2. Install Node.js 20:

   ```bash
   nvm install 20
   nvm use 20
   ```

3. Install Bun:

   ```bash
   # Install unzip (required for Bun installation)
   apt-get update && apt-get install unzip -y

   # Install Bun
   curl -fsSL https://bun.sh/install | bash
   source ~/.bashrc
   ```

4. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

### 3. Configure GitHub Actions

1. Add the following secrets to your GitHub repository:
   - `DROPLET_IP`: Your Digital Ocean droplet's IP address
   - `DROPLET_USER`: Your droplet's username (usually 'root')
   - `DROPLET_PASSWORD`: Your droplet's password

### 4. Verify Installation

Run these commands to verify everything is installed correctly:

```bash
nvm --version
bun --version
pm2 --version
```

Now your Droplet is ready for the CI/CD pipeline to deploy the application.
