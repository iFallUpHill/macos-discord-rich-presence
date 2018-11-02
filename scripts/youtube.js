/* eslint-disable no-console */
const osascript = require('node-osascript');
const DiscordRPC = require('discord-rpc');
const config = require('../config').youtube;
const ClientId = "325545800400764938";

DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({
    transport: 'ipc'
});

var oldTitle;

async function setActivity() {
    if (!rpc) return;

    let activity = {
        largeImageKey: 'youtube',
        largeImageText: 'YouTube',
    }

    osascript.execute((`set youtubeData to "validPayload"
    tell application "${config.browser}"
	repeat with t in tabs of windows
		tell t
			if URL starts with "http://www.youtube.com/watch?v=" or URL starts with "https://www.youtube.com/watch?v=" then
				set youtubeData to execute JavaScript "var text = 'textContent' in document.body ? 'textContent' : 'innerText';
var yttitle = document.querySelector('#container > h1')[text]
var ytuploader = document.querySelector('#owner-name > a')[text]
validPayload = { 'title': yttitle, 'uploader': ytuploader }"
				exit repeat
			end if
		end tell
	end repeat
end tell
return youtubeData`), (err, data) => {
        if (err) return console.error(err);

        activity.details = data.title ? data.title : 'Unknown Video';
        activity.state = 'by ' + data.uploader ? data.uploader : 'Unknown Uploader';

        if (oldTitle !== data.title) {
            oldTitle = data.title
            console.log(`[${new Date().toLocaleTimeString()}]: Change Detected: Updating Video.`)
            rpc.setActivity(activity);
        }
    });
}

setActivity();
setInterval(() => {
    setActivity();
}, config.updateInterval);

rpc.login({ clientId: ClientId }).catch(console.error);
