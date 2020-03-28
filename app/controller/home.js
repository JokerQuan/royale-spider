'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {query} = this.ctx;
    ctx.body = await ctx.service.decks.list(query.time, query.sort, query.type);
    // ctx.body = require("../service/decks.json");
  }

  async cards() {
    const { ctx } = this;
    const {query} = this.ctx;
    ctx.body = await ctx.service.cards.list(query.cardTime, query.cardBattleType);
    // ctx.body = require("../service/cards.json");
  }
}

module.exports = HomeController;
