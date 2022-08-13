# Gaming App

## Front-End

- **Signup**
  - [X] Email address
  - [X] Password (twice to make sure passwords match)
  - [X] First and last name
  - [X] Nickname

- **Homepage (Logged Out)**
  - [ ] Login/Signup
  - [ ] Header welcoming users to the site
  - [ ] Text about how to play the game

- **Homepage (Logged In)**
  - [ ] Header welcoming user by their nickname
  - [ ] Current user’s last game score and highest score
  - [ ] Starting the game

- **Game page**
  - [ ] Should be only available when user logged in

## Back-End

- **Signup API - route: ‘/signup’ \[POST]**
  - [X] The signup api is responsible for signing up a new user.
  - [X] Validate all the user input is valid -_Middleware_
  - [X] Check that passwords match -_Middleware_
  - [X] Make sure the email address and nickname is unique -_Middleware_
  - [X] Store the user in your DB and log the user in
  - [X] Be sure not to save the user's password as a plain string. (bcrypt is a great tool for this)
  - [X] Fields:
    - [X] Email Address
    - [X] Password (twice to make sure passwords match)
    - [X] First and last name
    - [X] nickname

- **Login API - route: ‘/login’ \[POST]**
  - [X] The login api is responsible for logging in existing users
  - [X] Validate all the user input is valid -_Middleware_
  - [X] Check the email and password match an existing user -_Middleware_
  - [X] Retrieve the users from the database -_Middleware_
  - [X] Log the user in.
  - [X] Fields:
    - [X] Email address
    - [X] Password

- **Add score API - route: ‘/addScore \[POST]**
  - [X] The add score API adds the score of the player at the end of the round/game to a table
  - [X] Fields:
    - [X] email/nickname
    - [X] Score
    - [X] Date

- **Get user last score API - Route: ‘/lastScore/:id \[GET] (Protected to user only)**
  - [X] The get user last score api is responsible for getting the user’s last score
  - [ ] Display the users last score in the home or game page

- **Get user highest score API - Route: ‘/highScore/:id \[GET] (Protected to user only)**
  - [X] The get user high score api is responsible for getting highest score of a user
  - [ ] Display the user’s highest score in the home or game page

  
## Advanced Requirements:

- **Front-End**
  - [ ] Create more than one game, users can choose which game to play and change games (like an arcade)
  - [ ] Create the ability for 2 players to play a game together or versus
  - [ ] Display a game history page with top scores(nickname and score) in a separate page

- **Back-End**
  - [ ] Have multiple game scores stored in different tables, one for each game.
  - [ ] Create a top scores table for the top 5 players.
  - [X] Create a secure login with JWT and Bcrypt
