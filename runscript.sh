#!/bin/sh

echo RUNSCRIPT started

#move into your git repo 
cd ~/rpi-nodejs-hometest1;
yarn;

while true
do

git fetch;
LOCAL=$(git rev-parse HEAD);
REMOTE=$(git rev-parse @{u});

#if our local revision id doesn't match the remote, we will need to pull the changes
if [ $LOCAL != $REMOTE ]; then
	echo GIT fetching;
	pm2 stop rpi;
	git fetch --all;
	git reset --hard origin/master;
	npm install;
	pm2 start appWeb.js --name "rpi";
else
	if [ "$(pm2 id rpi)" = "[]" ]; then
		echo init starting app;
		pm2 start appWeb.js --name "rpi";
	fi
fi

echo RUNSCRIPT sleep 5 sec
sleep 5
done
echo RUNSCRIPT ended
