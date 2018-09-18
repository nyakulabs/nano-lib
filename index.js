const snekfetch = require('snekfetch'); // yeah, i know it's deprecated. i don't care.

class nanolib {
    constructor() {} // what's even the point? the class is only used for methods anyways

    async extractImage(message) {
        return new Promise(async (resolve, reject) => {
            let paragraph = message.cleanContent;
            let match = paragraph.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i);
            if (match) {
                let matched = paragraph.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i)[0];
                let req = await snekfetch.get(matched);
                if (!req.body) resolve();
                resolve({
                  'image': req.body,
                  'url': matched
                });
            } else if (message.attachments.first()) {
                if (message.attachments.first().width > 0 && message.attachments.size > 0) {
                    let req = await snekfetch.get(message.attachments.first().url);
                    if (!req.body) resolve();
                    resolve({
                      'image': req.body,
                      'url': message.attachments.first().url
                    });
                }
            }
        });
    }

    // TODO: finish this method
    async extractTarget(message, options) {

    }
}

module.exports = new nanolib;
