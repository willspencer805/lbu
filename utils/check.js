const answers = require("./answers.json")
// Receives tx data from web3 provider and validates data based on data in answer.json
function isValid(module, data, sender) {
  const localAnswers = answers[module]
  const toAddress = data.to
  const fromAddress = data.from
  const callData = data.data.substring(0, 10)

  return (
    fromAddress.toUpperCase() == sender.toUpperCase() &&
    toAddress.toUpperCase() == localAnswers.address.toUpperCase() &&
    callData.toUpperCase() == localAnswers.signature.toUpperCase()
  )
}

module.exports = { isValid }
