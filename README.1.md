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

# access individual docker container
- mongo
1- `docker exec -it mongodb bash`
2- mongosh (entrou no banco)
3- use auth
4- db.auth(<user>,passwordPrompt())
5- db.users.find({}).pretty() //db.users.deleteMany({})

- redis
1- docker exec -it redis_cache redis-cli -a secret
2- scan 0
3- get "session:..."/ ttl "session..."

# curl routes
* -v = 
* -H = 
* -d = data
  ```sh /register -d '{
      "email": "teste@gmail.com",
      "name": "jeff",
      "password": "Secret123",
      "passwordConfirmation": "Secret123"
  }' ```