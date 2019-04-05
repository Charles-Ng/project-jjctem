# Formula0 REST API Documentation

## User API

### Create/Sign Up

- description: create a new user
- request: `POST /user/signup/`
    - body: object
      - username: (string)
      - password: (string)
- response: 200
    - content-type: `application/json`
    - body: object
      - user: (object) the entire user
      - insertId: (int) the user's id
      - msg: (string) a response message

```
$ curl -X POST
       -F "username='someone_new'"
       -F "password='pass'"
       http://localhsot:3000/user/signup/'
```


### Login
description: sign into applicatoin
- request: `POST /user/login/`
    - body: object
      - username: (string)
      - password: (string)
- response: 200
    - body: object
      - user: (object) the entire user
      - msg: (string) a response message

```
$ curl -X POST
     -F "username='someone_new'"
     -F "password='pass'"
     http://localhsot:3000/user/login/'
```

### Logout
description: sign up to applicatoin
 - request: `GET /user/logout/`
 - response: 200
   - content-type: `application/json`
   - body: object
        - msg: (string) a response message

```
$ curl -X GET
     http://localhsot:3000/user/logout/'
```

## Leaderboard API

### Top 10
description: get the top 10 players of all time
 - request: `GET /leaderboard`
 - response: 200
   - content-type: `application/json`
   - body: object
        - res: (array of objects) list of the top 10 users and their time

  ```
  $ curl -X GET
         http://localhsot:3000/leaderboard'
  ```


### Add score
description: add a user and their score to the board
 - request: `POST /leaderboard/add`
     - body: object
       - username: (string)
       - time: (float)
 - response: 200
   - content-type: `application/json`
   - body: object
        - msg: (string) a response message

  ```
  $ curl -X POST
         -F "username='someone_new'"
         -F "time='20.40'"
         http://localhsot:3000/leaderboard/add'
  ```


### All the scores
description: get all the scores ever recorded
 - request: `GET /leaderboard/all`
 - response: 200
   - content-type: `application/json`
   - body: object
        - res: (array of objects) list of all the users and their time

  ```
  $ curl -X GET
         http://localhsot:3000/leaderboard/all'
  ```


### Personal scores
description: get the best score for the user
 - request: `POST /leaderboard/personal`
     - body: object
       - username: (string)
 - response: 200
   - content-type: `application/json`
   - body: object
        - rank: (int) the rank of the score
        - username: (string) the username
        - time: (float) the time of the top score

  ```
  $ curl -X POST
         -F "username='someone_new'"
         http://localhsot:3000/leaderboard/personal'
  ```
