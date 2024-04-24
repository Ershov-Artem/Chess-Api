<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

Chess API realisation based on NestJS.

## API Doc

### REST

* POST `/game/start` - taking nothing, returns nothing. Could throw an error
```json
{
  "statusCode":503,
  "message":"Already started"
}
```

* POST `/game/sendCommand` - taking Command to robo, returns nothing. Request example:
```json
{
  "boardFrom": 1,
  "boardTo": 2,
  "positionFrom": 1,
  "positionTo": 2
}
```

* POST `/game/reset` - taking boolean "endGame", returns nothing. Request example:
```json
{
  "endGame":true
}
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
