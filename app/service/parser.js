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
            const avgElixir = decksEles[i].children[3].children[1].children[1].children[2].children[1].children[1].children[3].children[2].data.replace(/\n/g, "");
            const cardCycle = decksEles[i].children[3].children[1].children[1].children[2].children[1].children[3].children[3].children[2].data.replace(/\n/g, "").split(" ")[0];


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
    },

    parseCards : ($, body) => {
        const cards = [];
        //卡片 container
        const cardEles = $("div[class='grid_item']");

        // console.log(cardEles[0].attribs["data-usage"]);

        for(let i = 0; i < cardEles.length; i++){
            const name = cardEles[i].children[3].attribs.href.split("card/")[1];
            const usagePercent = (+(cardEles[i].attribs["data-usage"]) * 100).toFixed(1);
            const usageDelta = (+(cardEles[i].attribs["data-delta"])).toFixed(1);
            const winPercent = (+(cardEles[i].attribs["data-winpercent"])).toFixed(1);
            const winDelta = (+(cardEles[i].attribs["data-windelta"])).toFixed(1);

            const card = {
                name,
                usagePercent,
                usageDelta,
                winPercent,
                winDelta
            };

            cards.push(card);
        }

        return cards;
    },

    parseBattles : ($, body) => {
        const tbody = $("tbody");
        if (!tbody || !tbody[0] || !tbody[0].children || tbody[0].children.length <=0){
            return [];
        }

        const tr = tbody[0].children;

        if(!tr || tr.length <=0) {
            return [];
        }

        const battles = [];

        // console.log(tr[1].children[1].children[2])

        for (let i = 1; i < tr.length; i = i + 2) {

            if(!tr[i]) {
                continue;
            }

            /**
             * 图片
             */
            const cards = tr[i].children[1].children[1].attribs.id.split("deck_")[1];

            const usage = tr[i].children[1].children[2].data.trim();

            /**
             * 数据
             */
            const crowns = tr[i].children[3].children[0].data,
                  netWinPercent = tr[i].children[5].children[0].data,
                  win = tr[i].children[7].children[0].data,
                  winPercent = tr[i].children[9].children[0].data,
                  draw = tr[i].children[11].children[0].data,
                  drawPercent = tr[i].children[13].children[0].data,
                  loss = tr[i].children[15].children[0].data,
                  lossPercent = tr[i].children[17].children[0].data,
                  total = tr[i].children[19].children[0].data;
                  

            const battle = {
                cards,
                usage,
                crowns,
                netWinPercent,
                win,
                winPercent,
                draw,
                drawPercent,
                loss,
                lossPercent,
                total
            }

            battles.push(battle);
        }

        return battles;
    }
}