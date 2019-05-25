#!/bin/sh
#This is a simple bash script that will poll github for changes to your repo,
#if found pull them down, and then rebuild and restart 
#We run the script with nohup so it executes as a background process: $nohup ./runscript

echo RUNSCRIPT started
while true
do

#move into your git repo 
cd ~/rpi-nodejs-hometest1;

git fetch;
LOCAL=$(git rev-parse HEAD);
REMOTE=$(git rev-parse @{u});

#if our local revision id doesn't match the remote, we will need to pull the changes
if [ $LOCAL != $REMOTE ]; then
    pm2 stop all;
    git fetch --all;
	git reset --hard origin/master;
    npm install;
    pm2 start app.js;
fi
echo RUNSCRIPT sleep 5 sec
sleep 5
done
echo RUNSCRIPT ended

# @reboot /usr/bin/sudo -u pi -H /usr/local/bin/forever start -c /bin/bash ~/rpi-nodejs-hometest1/runscript
# sudo crontab -e