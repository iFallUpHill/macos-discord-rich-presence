/* eslint-disable no-console */
const osascript = require('node-osascript');
const DiscordRPC = require('discord-rpc');
const config = require('../config').itunes;
const ClientId = "327592981580349440";

DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({
    transport: 'ipc'
});

var oldID;

async function setActivity() {
    if (!rpc) return; 

    let activity = {
        largeImageKey: 'apple',
        largeImageText: 'Apple Music',
    }

    osascript.execute((`tell application "iTunes"
    if player state is playing or player state is paused then
    set tname to current track's name
    set tartist to current track's artist
    set talbum to current track's album
    set tid to current track's id
    return { name: tname, artist:tartist, album:talbum, id: tid }
    end if
    end tell`), (err, data) => {
        if (err) return console.error(err);
        
        activity.details = data.name ? data.name : 'Unknown Song';
        activity.state = 'by ' + data.artist ? data.artist : 'Unknown Artist';
        activity.largeImageText = data.album ? data.album : 'Unknown Album';

        if (oldID !== data.id) {
            oldID = data.id
            console.log(`[${new Date().toLocaleTimeString()}]: Change Detected: Updating Song.`)
            rpc.setActivity(activity);
        }
    });
};

setActivity();
setInterval(() => {
    setActivity();
}, config.updateInterval);

rpc.login({ clientId: ClientId }).catch(console.error);
