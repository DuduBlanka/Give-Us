@echo off

REM Change the directory to the "server" folder
cd server

REM Start the server
start npm start

REM Wait for 5 seconds
timeout /t 5

REM Navigate out of the "server" folder
cd..

REM Change the directory to the "client/general" folder
cd client\general

REM Open the HTML file
start "" HomePage.html