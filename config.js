const config = {
    itunes: {
        updateInterval: 5000, // Polling interval in milliseconds

    },
    youtube: {
        updateInterval: 5000, // Polling interval in milliseconds
        browser: 'Google Chrome', // possible: Safari, Google Chrome, Firefox, etc. (based on the *.app name of your browser)
    },
}

module.exports = config;

