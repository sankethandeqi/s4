## Running server in development mode
```
npm run start-local
```

## Prerequisite
Home directory should contain a `.aws` directory containing file named `credentials`
```~/.aws/credentials```
```
[default]
aws_access_key_id = XXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXX
```

## Running Kue Engine UI
```
node_modules/kue/bin/kue-dashboard -p 3050 -r redis://127.0.0.1:6379
```