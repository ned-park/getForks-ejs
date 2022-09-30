# Introduction

getForks is a new way of managing, sharing, updating, and creating recipes that brings the power and convenience of version control to recipe development without the complexity.

Since recipes are (generally) simpler than software, the complexities of version control are largely absent, while the advantages remain without requiring a significant learning curve.

![image of getForks site](https://raw.githubusercontent.com/ned-park/getForks/main/readme_image.jpg)

getForks is live! Visit [https://getforks.herokuapp.com/](https://getforks.herokuapp.com/) to give it a try.


---

# Technology Packages/Dependencies used 

bcrypt, ckeditorconnect-mongo, dotenv, ejs, express, express-flash, express-session, javascript, mongodb, mongoose, morgan, node, nodemon, passport, passport-local, tailwind, validator, 

---

# Install all the dependencies or node packages used for development via Terminal

```
npm install
``` 

## Then

- Create the `config/.env` file and add the following as `key=value` 
  - PORT: 3000 or some other port number
  - MONGO_URI: `your database URI` 
  - CLOUD_NAME: Cloudinary Cloudname
  - API_KEY: Cloudinary API_Key
  - API_SECRET: Cloudinary API_Secret
 
## Finally

For development:
 ```
npm run dev
 ```
 
For a production
 
```
npm start
```


