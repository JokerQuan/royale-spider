const Service = require('egg').Service;
const Crawler = require('crawler');
const { parseCards } = require('./parser');

class CardsService extends Service {

    async list (time = '7d', cat = 'GC') {
        const cardsUrl = "https://royaleapi.com/cards/popular?";
        const extraUrl = `time=${time}&mode=grid&cat=${cat}&sort=usage`;
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
                        resolve(parseCards(res.$, res.body));
                    }
                    done();
                }
            });
            c.queue({
                uri : cardsUrl + extraUrl
            });
        });
    }
}

module.exports = CardsService;