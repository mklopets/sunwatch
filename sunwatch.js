'use strict';

const request = require('request-promise');

const Logger = function(about) {
    this.about = about;
    this.log = function(logData) {
        console.log(logData);
        const baseUri = 'http://fuckaws.xyz:4242/api';
        const options = {
            uri: baseUri,
            method: 'POST',
            body: {
                logs: [
                    {
                        message: logData,
                        about: this.about
                    }
                ]
            },
            json: true
        };
        return request(options);
    };
};

module.exports = function(about) {
    return new Logger(about);
};
