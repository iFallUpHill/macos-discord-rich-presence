# MacOS Discord Rich Presence

A work around to enable rich presence on MacOS when using various media services.

## Supported Services
* iTunes.app (Title / Artist / Album)
* YouTube in Browser* (Title / Uploader)

**Note**: For YouTube support in your desired browser, you may have to allow JavaScript events to be executed by Apple Events. 

E.g. Google Chrome: `View > Developer > Allow JavaScript from Apple Events`

## Usage
```bash
git clone https://github.com/iFallUpHill/macos-discord-rich-presence.git
cd macos-discord-rich-presence
npm install

# For iTunes
npm run itunes

# For YouTube
npm run youtube
```

**Note**: You may have to advance to the next song (iTunes) or change videos (YouTube) for the script begin working.

## Configuration
Edit the `config.js` file in the root of the project with your desired settings.

## Limitations
Due to the nature of Discord applications, it is not possible to update the image of the Rich Presence service to reflect the media being consumed. For example, this tool cannot update the application icon to be the cover art of the current song. 

## Inspiration
[justJS/SimplePresence](https://github.com/justJS/SimplePresence)


