import { useAccount } from "wagmi"
import React, { useState } from "react"
export default function Module1() {
  const [hash, setHash] = useState("")
  const { address, isConnecting, isDisconnected } = useAccount()

  const handleSubmit = async () => {
    event.preventDefault()

    console.log("Submitted")
    const endpoint = "../../api/validateTx/exampleModule"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hash: hash,
        module: "module1",
        sender: address,
      }),
    }
    fetch(endpoint, options).then((res) => console.log(res.body))
  }

  const handleChange = (event) => {
    setHash(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange}></input>
      <button type="submit">Submit</button>
    </form>
  )
}
