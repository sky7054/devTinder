- create repository
- Initialised Repository
- node_modules, package.json,package-lock.json
- install express
- create a server 
- listen to port 7000
- Write request handlers for /test.. /hello
- Install nodemon and update script inside package.json
- What are Dependencies
- what is the use of "-g" while installing npm
- Difference between caret and tilda (~ vs ^)

- initialize git
- .gitignore
- Create a remote repo on github
- Push all the code to remote origin
- Play with routes and route extensions exe. /hello, /test,/hello/2, /xyz
- Order of routes matter a lot
- Install postman app and make a workspace/collection> test API call
- Write logic to handle GET,POST,PATCH,DELETE API calls and test them on postman
- Explore routing and and use of ?, +, (), * in the routes
- Use of regex in routes /a/, /*fly$/
- Reading the query param in the route
- Reading the dynamic routes

- Multiple Router handler - play with code
- next()
- next function and errors along with res.send();
- app.use("/routes", rH,[rH2, rH3, rH3], rH4);
- what is middleware ? why do we need it ?
- How expressjs basically handles request behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user, except /user/login
- Error handling using app.use("/",(err, res, req, next) => {});

- Create a free cluster on mongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application on database "Connection-url"/devTinder
- Call the connectDB function and connect to the database before starting application 7000
- Create a userSchema and userModel
- Create post/signup API to add data to database
- Push some documents using API calls from postman
- Error handing using try, catch

- JSON & JS Object (difference) 
- Add the express.json middleware to your app
- Make your signup API dynamic to receive data from from the end user





