# TypeScript example for Passport Twitter OAuth 2.0 Strategy

This is a TypeScript example with Passport and `@superfaceai/passport-twitter-oauth2` packages on Express server. The logic is the same as in [basic-usage example](../basic-usage/): After a successful login, the application shows user profile information and logs the access token to a console.

Additional type dependecies for Node.js, Express, Passport, and passport-session are added for correct type checking.

Check [`@superfaceai/passport-twitter-oauth2`](https://github.com/superfaceai/passport-twitter-oauth2) for more info about the package and [step-by-step tutorial](https://superface.ai/blog/twitter-oauth2-passport) on setting up the Twitter application.

## Setup

1. Install dependencies
   ```shell
   npm i
   ```
1. Copy `.env.example` to `.env`
   ```shell
   cp .env.example .env
   ```
1. Paste your Client ID and Client Secret from Twitter developer portal to `.env` file

## Usage

1. Build the TypeScript files
   ```shell
   npm run build
   ```
1. Start the server
   ```shell
   npm start
   ```
1. Visit `http://localhost:3000/auth/twitter`

## Troubleshooting

If you run into any issues with the example, please don't hesitate to [open an issue](https://github.com/superfaceai/passport-twitter-oauth2/issues/new).
