module.exports = {
    parseDecks : ($, body) => {
        const baseUrl = "https://royaleapi.com"
        const decks = [];
        // 卡组 container
        const decksEles = $('div[id^="deck_"][id$="_container"]');
        // console.log(decksEles[0].children[5].children[1].children[1].children[2].data);
        
        for (let i = 0; i < decksEles.length; i++) {

            /**
             * 图片
             */
            const picsEle = decksEles[i].children[3].children[1].children[1].children[1];
            const cards = [];
            for(let j = 1; j < 16; j = j + 2){
                const picAttr = picsEle.children[j].children[1].children[1].attribs;
                cards.push({
                    name : picAttr.alt,
                    src : baseUrl + picAttr.src.split("?")[0]
                });
            }

            /**
             * 对战数据
             */
            const battleDataRow_1   = decksEles[i].children[3].children[3].children[1].children[3].children[1].children[1].children[3].children[1],
                  battleDataRow_2   = decksEles[i].children[3].children[3].children[1].children[3].children[1].children[1].children[3].children[3],

                  usage             = battleDataRow_1.children[1].children[0].data,
                  netWins           = battleDataRow_1.children[3].children[0].data,
                  wins              = battleDataRow_1.children[5].children[0].data,
                  draws             = battleDataRow_1.children[7].children[0].data,
                  losses            = battleDataRow_1.children[9].children[0].data,

                  usagePercent      = battleDataRow_2.children[1].children[0].data,
                  netWinsPercent    = battleDataRow_2.children[3].children[0].data,
                  winsPercent       = battleDataRow_2.children[5].children[0].data,
                  drawsPercent      = battleDataRow_2.children[7].children[0].data,
                  lossesPercent     = battleDataRow_2.children[9].children[0].data;

            /**
             * 圣水数据
             */
            const avgElixir = decksEles[0].children[5].children[1].children[1].children[2].data.replace(/\n/g, "");
            const cardCycle = decksEles[0].children[5].children[1].children[3].children[2].data.replace(/\n/g, "").split(" ")[0];


            /**
             * 返回客户端数据
             */
            const deck = {
                usage,
                netWins,
                wins,
                draws,
                losses,
                usagePercent,
                netWinsPercent,
                winsPercent,
                drawsPercent,
                lossesPercent,
                sort : i + 1,
                name : decksEles[i].children[1].children[3].children[0].data.replace(/\n/g, ""),
                battleUrl : baseUrl + decksEles[i].children[1].children[5].attribs.href,
                cards,
                avgElixir,
                cardCycle
            };

            decks.push(deck);
        }

        return decks;
    }
}