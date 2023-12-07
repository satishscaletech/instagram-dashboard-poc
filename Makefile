default:

install:
	pnpm install

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint

env:
	pnpm run update:env

clear:
	pnpm clean

backend-dev:
	pnpm run --filter @instagram-dashboard/backend start:debug

backend-build:
	pnpm run --filter @instagram-dashboard/backend build

backend-prod:
	pnpm run --filter @instagram-dashboard/backend start:prod

frontend-dev:
	pnpm run --filter @instagram-dashboard/frontend start

frontend-build:
	pnpm run --filter @instagram-dashboard/frontend build
