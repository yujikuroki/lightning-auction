const AUCTION_TIME_MINUTES = 5

class Auctions {
  constructor() {
    this.now_unixtime = new Date()
  }

  get items() {
    // AUCTION_TIME_MINUTESおきのオークションを生成
    return [0, 1, 2, 3, 4].map((i) => {
      return new Auction(new Date(this.now_unixtime - (this.now_unixtime % (AUCTION_TIME_MINUTES * 60 * 1000) + AUCTION_TIME_MINUTES * i * 60 * 1000)))
    }) 
  }
}

class Auction {
  constructor(start_at) {
    this.start_at = start_at
    this.end_at = new Date(this.start_at.getTime())
    this.end_at.setMinutes(this.end_at.getMinutes() + AUCTION_TIME_MINUTES)
    this.id = start_at.getTime()
    this.status = (this.end_at.getTime() > (new Date()).getTime()) ? "bidding" : "finished"
  }
}

module.exports.Auctions = Auctions
module.exports.Auction = Auction
