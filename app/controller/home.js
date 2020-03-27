'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const {query} = this.ctx;
    ctx.body = await ctx.service.decks.list(query.time, query.sort, query.type);
  }

  async cards() {
    const { ctx } = this;
    // ctx.body = await ctx.service.cards.list();
    ctx.body = "cards";
  }
}

module.exports = HomeController;
