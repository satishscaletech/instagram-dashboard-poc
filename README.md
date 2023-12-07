<p align="center">
  <a href="https://www.scaletech.xyz/" target="blank">
  <img src="https://raw.githubusercontent.com/mono-repo-dev/assets/master/logo-alt.png" width="180" alt="Scaletech Logo" />
  </a>
</p>

## Description

**Social Genius** Social Genius helps instagram businessess profile to get insights data.

## Core Features

- Facebook authentication API.
- Retrieve Instagram information using FACEBOOK GRAPH API.

### Set up env

```Bash
$ cp .env.example .env
```

## Install dependencies

```Bash
#Install package
$ make install
```

## Lint and format

```Bash
#Linting and formatting
$ make lint
```

## Running the backend API

```bash
# development
$ make backend-dev

# build
$ make backend-build

# production mode
$ make start:prod
```

## Running the Frontend

```bash
# development
$ make frontend-dev

# build
$ make frontend-build
```

## Run individual packages command mentioned inside script propperty inside package.json

```bash
# [package_name] -> each app and library have its own package.json file in that `name` peroperty will called as package_name

# [package_script] -> each app and library have its own package.json file in that `script` peroperty will called as package_script
$ pnpm run --filter [package_name] [package_script]
```

## Installation

```bash
# install dependency
$ pnpm install
```

## Build the packages and library

```bash
# Build packages using Nx
$ pnpm build
```

## Test

```bash
# unit tests
$ pnpm test
$ pnpm test:cov
```
