import nc from "next-connect"
const { ethers } = require("ethers")
const { isValid } = require("../../../../utils/check")

const getAndValidate = nc({
  onError: (err, req, res, next) => {
    console.log(err)
    res.status(500).end(err.toString())
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: { message: "route not found" } })
    return
  },
  attachParams: true,
}).post(async (req, res) => {
  const hash = req.body.hash
  const module = req.body.module
  const sender = req.body.sender
  try {
    const provider = new ethers.providers.InfuraProvider(
      "goerli",
      process.env.INFURA_KEY
    )
    const txData = await provider.getTransaction(hash)
    const success = isValid(module, txData, sender)
    res.status(200).json({ Response: { completed: success } })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      Response: {
        message: err,
      },
    })
  }
})

export default getAndValidate
