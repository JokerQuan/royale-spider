const Service = require('egg').Service;
const Crawler = require('crawler');
const { parseDecks } = require('./parser');

class DecksService extends Service {

    async list (time = '1d', sort='pop', type = 'TopLadder') {
        const decksUrl = "https://royaleapi.com/decks/popular?";
        const extraUrl = `time=${time}&sort=${sort}&size=20&players=PvP&min_trophies=0&max_trophies=10000&mode=detail&type=${type}&&&global_exclude=false`;
        return new Promise((resolve, reject) => {
            const c = new Crawler({
                timeout : 15 * 1000,
                retries : 5,
                retryTimeout : 10 * 1000,
                userAgent : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                callback : function(error, res, done) {
                    if(error){
                        reject(error);
                    }else{
                        resolve(parseDecks(res.$, res.body));
                    }
                    done();
                }
            });
            c.queue(decksUrl + extraUrl);
        });
    }
}

module.exports = DecksService;