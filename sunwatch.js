'use strict';

const request = require('request-promise');

const Logger = function(about) {
    this.about = about;
    this.jobs = [];
    this.finish = () => {
        return Promise.all(this.jobs);
    };
    this.log = function(logData) {
        console.log(logData);
        const message = JSON.stringify(logData);
        const baseUri = 'http://fuckaws.xyz:4242/api';
        const options = {
            uri: baseUri,
            method: 'POST',
            body: {
                logs: [
                    {
                        message: message,
                        about: this.about
                    }
                ]
            },
            json: true
        };
        const req = request(options);
        this.jobs.push(req);
        return req;
    };
};

module.exports = function(about) {
    return new Logger(about);
};
