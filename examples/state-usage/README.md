# Plain JavaScript example for passing state during authentication flow with Passport Twitter OAuth 2.0 Strategy

This is an example of passing state during the authentication flow with Passport and `@superfaceai/passport-twitter-oauth2` packages on Express server. After a successful login, the application shows user profile information, the state that was passed during the authentication request and logs the access token to a console.

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

1. Start the server with
   ```shell
   npm start
   ```
1. Visit `http://localhost:3000/auth/twitter?state=my-very-long-state-12234567890`

## Troubleshooting

If you run into any issues with the example, please don't hesitate to [open an issue](https://github.com/superfaceai/passport-twitter-oauth2/issues/new).
