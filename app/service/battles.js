const Service = require('egg').Service;
const Crawler = require('crawler');
const { parseBattles } = require('./parser');

class BattlesService extends Service {

    async list (battle_type = "LadderTop200", cards) {
        const baseUrl = "https://royaleapi.com/decks/stats/" + cards + "/matchup?";
        const extraUrl = `battle_type=${battle_type}`;
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
                        resolve(parseBattles(res.$, res.body));
                    }
                    done();
                }
            });
            c.queue({
                uri : baseUrl + extraUrl
            });
        });
    }
}

module.exports = BattlesService;