#!/bin/sh

echo RUNSCRIPT started

#move into your git repo 
cd ~/rpi-nodejs-hometest1;
yarn;
pm2 start appWeb.js --name "rpi";

while true
do

git fetch;
LOCAL=$(git rev-parse HEAD);
REMOTE=$(git rev-parse @{u});

#if our local revision id doesn't match the remote, we will need to pull the changes
if [ $LOCAL != $REMOTE ]; then
    pm2 stop rpi;
    git fetch --all;
	git reset --hard origin/master;
    npm install;
    pm2 start appWeb.js --name "rpi";
fi
echo RUNSCRIPT sleep 5 sec
sleep 5
done
echo RUNSCRIPT ended

