This is Interview's test

### Getting Started

1. First, clone this repository.
2. Run `npm install` to install the necessary packages
3. Create an .env file from .env.example and add values ​​to the variables enviroment

```
CLIENT_BASE_URL =
CLIENT_ID =
CLIENT_SECRET =
REDIRECT_URI =
CODE =
```

#### Values

| ENV             | Description                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------- |
| CLIENT_BASE_URL | Is a url of the form https://[your-account].amocrm.ru                                               |
| CLIENT_ID       | Client id will be provided from amoCRM's api when you sign up for external integration              |
| CLIENT_SECRET   | Client secret key will be provided from amoCRM's api when you sign up for external integration      |
| REDIRECT_URI    | Is the redirect url to get the Authorization Code. Usually https://example.com                      |
| CODE            | Code (Код авторизаций) will be provided from amoCRM's api when you sign up for external integration |

4. Run `npm run token` first to save the token and refresh token to the token.json
5. Run `npm run start` to create task for contact who do not have any transactions
