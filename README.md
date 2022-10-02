# [repo-name]

Ping API endpoints every (1) minute(s) to check if it's healthy

## How to run

Run locally

```sh
$ yarn run local -f ping
```

Deploy lambda development

```sh
$ yarn run deploy
```

Deploy lambda production

```sh
$ yarn run deploy --stage prod
```

Remove lambda

```sh
$ yarn run remove [--stage prod]
```


## How to run

- Make sure you have set AWS credential using this command:
```sh
serverless config credentials --provider aws --key [your aws key] --secret [your aws secret key]
```

## Locally for development (2 approaches)
Note: It's recommended to use node version 10.x
### Using node
```sh
$ yarn run-dev -f ping
```
### Using Serverless
```sh
$ cp config.example.yml config.yml # and edit
$ yarn
$ sls invoke local -f ping
# OR
$ yarn dev # Then, Open http://localhost:6000
```

## In production
```sh
$ yarn
$ yarn build
.................Wok in Progress.............
```
