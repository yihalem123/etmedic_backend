# etmedic_backend



## Overview

### Server

Runs on a [NodeJs](https://nodejs.org) server. [MongoDb](http://mongodb.org/) for storing the chats and users.



### API

There are some available endpoints:
   -https://etmedic.herokuapp.com/api/users/signup : Register a new user
     -- Method: POST
     --Header:none,
      --Body:{fullName,email,phoneNumber,password}
- */api/auth   : Retrieves a token for a known user
  - Method: POST
  - Header: none
  - Body: { email: '', password: ''}
  - Response: A JSON object containing the jwt auth token.
- */api/users/userid*: Get details about the logedin user
  - Method: Get
  - Header: 
  - x-auth-token:the token send when authenticated
  - Response: A JSON object containing the user details .
- */api/doctors *: List all  doctors (requires authentication)
  - Method: GET
  - Header: x-auth-token:the token send when the user login
  - Parameters: None
  - Response: A JSON object containing all the registered doctors.
  - - */api/doctors/doctorid *: List single  doctor (requires authentication)
  - Method: GET
  - Header: x-auth-token:the token send when the user login
  - Parameters: None
  - Response: A JSON object containing details about single doctor
  - - */api/doctors?category=category&services=services *: List all  doctors with the given parameters (requires authentication)
  - Method: GET
  - Header: x-auth-token:the token send when the user login
  - Parameters: None
  - Response: A JSON object containing all the registered doctors with the category specified in the param
  -  - - */api/categories/ *: List all  categories (requires authentication)
  - Method: GET
  - Header: x-auth-token:the token send when the user login
  - Parameters: None
  - Response: A JSON object containing all categories
- */api/conversations/*:to send request for chat to doctor
  - Method: POST
  - body:{userId,doctorId}
  - Header: x-access-token
  - Parameters: string
  - Response: details about the converstaion
  - 
- */api/conversations/Userid*:to get all conversations started by the user
  - Method: Get
  - Header: x-auth-token:token
  - Parameters: none
  - Response: all conversations by the user
  -  */api/conversations/find/UserId/doctorId*:to get all conversations b.n two users
  - Method: Get
  - Header: x-auth-token:token
  - Parameters: none
  - Response: all conversations by the user andd single doctor
  - - */api/messages/*:to get all conversations started by the user
  - Method: POST
  - Header: x-auth-token:token
  - Parameters: none
  - body:{conversationId,senderId,message}
  - Response: the message details
  - - */api/messages/conversationId*:to get all conversations started by the user
  - Method: Get
  - Header: x-auth-token:token
  - Parameters: none
  - Response: all messages in a single conversation
  - 
## Getting started

To get you started you can simply clone the repository and install the dependencies.

### Prerequisites
  
You need git to clone the repository. You can get git from the [Git website](http://git-scm.com/).

I also use a number of node.js tools to initialize and test the node-chat. You must have node.js and
its package manager (npm) installed. You can get them from the [NodeJs website](http://nodejs.org/).

### Clone etmedic

Clone the node-chat repository using git:

```
git clone https://github.com/yihalem123/etmedic_backend.git
cd node-chat
```

### Install Dependencies

You can get the tools we depend upon via `npm`, the node package manager.
 

Simply do:

```
npm install
```

You should find that you have a new folder in your project:

* `node_modules` - contains the npm packages for the tools we need



### Run the Application

The simplest way to start
this server is:

```
node server.js
```

Now browse to the app at `http://localhost:3000/`.



### Heroku

Heroku have provided a CI/deployment setup:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

If you run this, you will get a cloned version of this repo to start working on in a private git repo,
along with a CI service (in Travis) hosted that will run unit tests.

## Issues and nice-to-have features
Please report any issue or nice to have feature [here](https://github.com/yihalem123/etmedic_backend/issues/).

## Production
Currently available online in [heroku](http://etmedic.herokuapp.com).
