# robo_betty_alpha

# How to install
1. `npm install -g gulp bower foreman`
2. make sure you are in the robo_betty_alpha repo dir
3. `npm install`


# You will need a .env file. Ask team leads about this
1. the .env file will go in the root directory of the app
2. it will be used to store server configurations
3. __This .env file should never be pushed to github__

# How to run frontend portion only
1. `gulp frontend`

This will launch a server that will host your angular app.
This server will solely serve your angular files. This will not run our backend.
This server will also be updated when you changed one of the source files.

# How to run backend portion only
2. `gulp clean`
1. `nf start web`

This will only start up the backend. You can use this to quickly test API
routes.

# How To run entire app with our backend
1. `gulp build`
2. `nf start web`
