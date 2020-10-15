# colyseus-react-game
A simple game built with Colyseus server and React UX


## Auth
- Player requests authorization with:
  - email
  - password
  - phone
  - code
- If the email is new
  - create record
  - store the password
  - send the code 
  - restart the auth process from original form
- If the user-record exists
  - validate 4 elements
  - send token


## Game
- players may create up to 3 rooms
  - home
  - safe
  - combat
- players can move via
  - keyboard
  - script
  - mouse
- score keeping
  - touching another player
    - gives 1 point
    - transports that player home
