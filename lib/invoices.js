const { getInvoice } = require("./btc_payment")
const { AUCTION_TIME_MINUTES } = require("./auctions")

const invoices = {}

module.exports.add = (loginId, invoiceId, price, invoice_at, expire_at) => {
  const status = "new"
  const invoice = {
    loginId,
    invoiceId,
    price: parseFloat(price),
    invoice_at,
    expire_at,
    status
  }
  invoices[invoiceId] = invoice

  const monitor = () => {
    getInvoice(invoiceId, (currentInvoice) => {
      invoices[invoiceId].status = currentInvoice.status

      if (invoice.expire_at.getTime() < (new Date()).getTime()) {
        remove(invoiceId)
        return
      }

      if (currentInvoice.status == "new") {
        setTimeout(monitor, 1000);
      }
    })
  }

  monitor()
}

module.exports.remove = (invoiceId) => {
  delete invoices[invoiceId]
}

const getMaxInvoice = () => {
  let maxBidPrice = 0
  let invoice = null
  for (k in invoices) {
    let i = invoices[k]
    if (i.status == "complete" && maxBidPrice < i.price) {
      maxBidPrice = i.price
      invoice = i
    }
  }
  return invoice
}
module.exports.getMaxInvoice = getMaxInvoice

module.exports.getRefundableInvoices = () => {
  const max = getMaxInvoice()
  const result = {}
  for (k in invoices) {
    let i = invoices[k]
    if (i.status == "complete" && i.invoiceId != max.invoiceId) {
      result[k] = i
    }
  }
  return result 
}
