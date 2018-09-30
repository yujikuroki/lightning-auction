const { getInvoice } = require("./btc_payment")

const invoices = {}

module.exports.add = (invoiceId, price, expire_at) => {
  const status = "new"
  const invoice = {
    invoiceId,
    price: parseFloat(price),
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

module.exports.getMaxInvoice = () => {
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

