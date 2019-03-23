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

1. Git
2. Javascript
3. Canvas
4. HTML/CSS
5. MySQL
6. letsencrypt
7. Phaser
8. Nginx (server is DigitalOcean)


## Top 5 technical challenges
1. browser reacts to user input without noticable delay
2. intergrating phaser api with gamepad api
3. transfering game-logic from server to game-state to all users
4. 2D
5. browser app


# Installation
## Database
The database file is in `backend/db/`. Run this file on your local database. If you do not already, you will have to create an initial database call jjc.

## Locally
This application runs on 4 ports, initial setup is frontend on 3000, backend on 8000, socket on 8081, and the MySQL database on 8889 (this will be customizable later). You will need 3 terminal windows to fully run this application.
1. In the first terminal, navigate to `frontend`.
2. Run `npm install`.
3. Run `npm start`.
4. In the second terminal, navigate to `frontend`.
5. Run `node ./src/server.js`.
6. In the third terminal, navigate to `backend`.
7. Run `npm install`.
8. Run `node app.js`.

## Server
Current ports on formula0.julesyan.com:
- app/api (aka Main NodeJS app): 8080
    - formula0.julesyan.com/api
- server: 8081
    - formula0.julesyan.com/socket
- npm (aka React app): 3000
    - formula0.julesyan.com
- mysql (database): 3306

To run the application on different ports, you will have to manually change those (later on will be developed to be in a config file)

We are assuming you have admin access to your entire server. These instructions are for servers running Ubuntu 16.04. There are many other ways to run applications on servers using different technologies, but it was a good learning experience to do it manually instead of relying on a software. Other systems should have similar file locations and configurations, but please research this on your own. Some of these instructions are taken directly from other documents, those are credited below.

**Note: These instructions run the application in development mode, to run them in production mode, compile/build the applications.**



### Prerequisites
- Have Linux, Nginx, and MySQL installed on your Ubuntu system (LEMP): [Instructions](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04)
    - You will need to disable Apache if you have that running as you can't run both Apache and Nginx
    - PHP is part of LEMP but is not needed for this application, installing it will neither benefit or detriment the application
    - You will need to know which port MySQL is running on, by default it should be 3306
- Have cURL installed: [Instructions](https://www.luminanetworks.com/docs-lsc-610/Topics/SDN_Controller_Software_Installation_Guide/Appendix/Installing_cURL_for_Ubuntu_1.html)
- Have a domain pointing to this server's IP (this is configured in the DNS settings of your hosting service


1. We need to install `npm` and `node` for our applications to run. Starting in the home directory, run the installation script for Node.js and then install `nodejs` along with the build-essential components for some applications.
    ```
    cd ~
    curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt-get install nodejs
    sudo apt-get install build-essential
    ```
2. For ease of use, we will be install PM2 (our process manager), since it allows us to run multiple applications in the background.
    ```
    sudo npm install -g pm2
    ```
3. Now to move the files to an appropriate folder. Most servers will have web files being fetched from `/var/www/html/`, since we redirect to ports instead of files, we can just put the folders in `/var/www/html/`. Your folder structure should now be: `/var/www/html/frontend` and `/var/www/html/backend`
    - For those who are using subdomains, your folder structure will likely start with `/var/www/<sitename>/public_html/` instead (we will use the above file structure for the rest of the instructions)
    - It is suggested you use `git` (or something equivalent) to copy files to your server, otherwise `scp` would be a good alternative
    - You can check if the applications runs before the next step, but is unnecessary
4. To start the Node.js application we will be using `pm2`, it is irrelevant which directory we run it in as it is a global command. Just as we would run a normal  Node application, we will be running the `app.js` file (If you have another file you run as the application, use that in replacement of `app.js`).
    ```
    pm2 start app.js
    ```
    With similar output to the following:
    ```
    [PM2] Spawning PM2 daemon
    [PM2] PM2 Successfully daemonized
    [PM2] Starting app.js in fork_mode (1 instance)
    [PM2] Done.
    ┌──────────┬────┬──────┬──────┬────────┬─────────┬────────┬─────────────┬──────────┐
    │ App name │ id │ mode │ pid  │ status │ restart │ uptime │ memory      │ watching │
    ├──────────┼────┼──────┼──────┼────────┼─────────┼────────┼─────────────┼──────────┤
    │ app      │ 0  │ fork │ 3524 │ online │ 0       │ 0s     │ 21.566 MB   │ disabled │
    └──────────┴────┴──────┴──────┴────────┴─────────┴────────┴─────────────┴──────────┘
     Use `pm2 show <id|name>` to get more details about an app
    ```
    Your application will now be added to the PM2 processes with the name 'app'. There are extra commands to have the application restart on server boot, but for now it is unnecessary. Applications will restart on crash or kill, any changes to an application files will need you to restart the PM2 application.

    Your application should be available on `http://localhost:3000` (or whichever port you configured), test it with cURL

    Some useful commands when using PM2 (`app_name_or_id` refers to the one from PM2):
    - See all current applications running: `pm2 list`
    - Stopping an application: `pm2 stop app_name_or_id`
    - Restarting an application: `pm2 restart app_name_or_id`
    - More information about an application: `pm2 info app_name_or_id`
    - The process monitor for PM2: `pm2 monit`
    - All the tails of the logs for the applications: `pm2 logs`
5. To point or redirect incoming requests to the correct application port, we will have to manually configure it. Since you have Nginx already configured (I hope you do), let's open up the configuration file we want (if you are using subdomains, your file my be the site name instead of `default`):
    ```
    sudo nano /etc/nginx/sites-available/default
    ```
    Locate the line the block that starts with `location /` and replace it with the following (again change the port number if your's is configured for a different port):
    ```
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    ```
    Check for any syntax errors with:
    ```
    sudo nginx -t
    ```
    Restart Nginx:
    ```
    sudo systemctl restart nginx
    ```
    Now your application will be running on your domain! (The `location /` block essentially says whenever someone comes to this domain, redirect them to http://localhost:3000).

    In this file you can also change the root (i.e. where the files for the application are located, but it should not be necessary) and the server_name (i.e. the domains and subdomains that will redirect to http://localhost:3000).

    For our case, since `app.js` if our backend, we want it to be on formula0.julesyan.com/api, this can be achieved by changing `location /` to `location /api/`
6. Repeat steps 4 and 5 for `server.js`, which is located in the frontend files, and change the ports accordingly
7. To run the React application, we follow similar steps to step 4, but instead we run:
    ```
    pm2 start npm -- start
    ```
    Where the application will be called npm. Look at the PM2 logs to know when the React application is fully running
8. Repeat step 5 and change the ports accordingly

The entire application should now be running on your domain! Please remember that all calls to the api etc, will need to be to the indicated domain and **not** to localhost.



# Credits
Created by JJC (Joshua Chong, Julia Yan, Charles Ng) for [CSCC09](https://thierrysans.me/CSCC09/)

Any similarities to the [Formula One Group's](http://www.libertymedia.com/companies/formula-one-group.html) [Formula 1](https://www.formula1.com/), [Formula 2](http://www.fiaformula2.com/), or [Formula 3](http://www.fiaformula3.com/) are completely for humor.

### Instructional Credits
- [How To Set Up a Node.js Application for Production on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [How To Move an Nginx Web Root to a New Location on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-move-an-nginx-web-root-to-a-new-location-on-ubuntu-16-04)
