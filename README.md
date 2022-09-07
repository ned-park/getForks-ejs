# Introduction

getForks is a new way of managing, sharing, updating, and creating recipes that brings the power and convenience of version control to recipe development.

Since recipes are (generally) far simpler than software, much of the usual headaches from version control are absent, while the advantages remain.

getForks is still in early development, when there's something users can interact with you'll find a photo of it and a link to the live project here.


---

# Technology Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

```
npm install
``` 

## Then

- Create a `.env` file and add the following as `key: value` 
  - PORT: 3000 or some other port number
  - MONGO_URI: `your database URI` 
 
## Finally

For development:
 ```
npm run dev
 ```
 
For a production
 
```
npm start
```


