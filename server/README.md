## Prerequisite
Home directory should contain a `.aws` directory containing file named `credentials`.

```cat ~/.aws/credentials```
```
[default]
aws_access_key_id = XXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXX
```

Set `setenv` file with database credentials.
Then run below command.
```
. ./setenv
```

## Running server in development mode
In same console window run below command.
```
npm run start-local
```

## Running Kue Engine UI
```
node_modules/kue/bin/kue-dashboard -p 3050 -r redis://127.0.0.1:6379
```
