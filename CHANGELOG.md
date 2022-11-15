# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.2.0 - 2022-11-15
### Added
- `confidential` client type, to comply with RFC6749 terminology
- TypeScript type definitions

### Changed
- **The module was rewritten to TypeScript.** It should be fully backwards compatible, but if you run into any issues, [please report them](https://github.com/superfaceai/passport-twitter-oauth2/issues).
- `users.read` scope is added only with `skipUserProfile` option disabled

### Deprecated
- `private` client type

## 1.1.0 - 2022-10-21
### Added
- `users.read` scope added as a minimum default for the strategy to work

## 1.0.0 - 2022-01-28

## 0.0.2-beta.0 - 2022-01-27

## 0.0.1-beta.0 - 2022-01-26
### Added
- Twitter OAuth 2.0 Passport strategy
