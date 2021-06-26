# Blog

A blog using Node.js, Express.js, and Mongoose.

The application is deployed to Heroku and can be accessed through the following link:

[Blog on Heroku](https://bloghtoan.herokuapp.com/)

---

## Usage

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

- MONGO_URI: this is the connection string of your MongoDB Atlas database.

- SESSION_SECRET: a secret message for the session. You can use any string here.

- GMAIL_EMAIL, GMAIL_PASSWORD: the email and password given to nodemailer to send/receive the email. Please put a real email and password here because you will receive the messages sent from the contact us form on this email.

Now you can run in the terminal and the application should work.

```
npm install
npm start
```

or with nodemon

```
npm install
npm run dev
```
