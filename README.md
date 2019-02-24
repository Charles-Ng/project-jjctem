# Forumla 0

### Team members
Here are our team members in no particular order

1. Charles Ng
2. Julia Yan
3. Joshua Chong

### overall description of web application

Create a 2D racing game that allows users to race each other with real time synchronization. Furthermore, users can create an account handle, while aiming for the fastest time on the global leaderboards on our web app.

## Key features for beta

In the beta version, we are aiming to create a head to head multiplayer racing game in a browser.  The map at first will be static and won't move along with the user. The user will be able to create an account, and then join a room off a serverlist.  Once two users connect, the game will load and game-logic will be sent to the two user's browser in real time. Users will be able to input with minimal latency where they want to go on the map. Once the game is finished, the leaderboard database in the backend will be updated. User's can choose to rematch after the game is finished or they can go back to server list and find another race.

TL;DR
1. Race against other users online with real time synchronization
2. One static race map (only cars move)
3. Leaderboard for fastest time of all time
4. Creating an secure account system

## Additonal features for final version

In the final version of the app, we hope to add in spectators who can view the game on their browser. We hope to make the race map and the racer move at the same time. Also in real time, they can drag and drop obstacles that will be updated to all racers in real time. We also hope to add voice chat in the game with the spectators so that the racers can audibly express their frustrations or excitement. Also allow users to reconnect and disconnect from the game as they please while keeping the game state consistent.

TL;DR
1. Zoom-in map (track and cars move)
2. Obstacles in the map that placed by people
3. voice chat and text chat in game
4. allow user to reconnect and disonnect

## Technologies

1. git
2. Javascript
3. canvas
4. facebook messenger
5. html css
6. some database
7. letsencrypt
8. Julia's domains and servers
9. phaser

## Top 5 technical challenges
1. browser reacts to user input without noticable delay
2. intergrating phaser api with gamepad api
3. transfering game-logic from server to game-state to all users
4. 2D
5. browser app 
