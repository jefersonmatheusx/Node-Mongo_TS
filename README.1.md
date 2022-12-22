# mongo 
ensure that the mongod process on your pc is OFF

# node-auth

## curl

```sh
curl -v -X POST localhost:3000/register -H 'Content-Type: application/json' \
  -d '{"email":"alex@gmail.com", "name":"Alex", "password": "secret123", "passwordConfirmation":"secret123"}'
```


```sh
curl -X POST localhost:3000/register --cookie 'SID=s%3AX4vRrnxMn49iwafTGNObwGqQ059-1TLE.wziSc5jG9Qz5tIZiuILSxmzch5Az10lta1bqlXt%2FvVs'
```

