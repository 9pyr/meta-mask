import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import './App.css'

function App() {
  const [accountId, setAccountId] = useState()
  const [balance, setBalance] = useState(0)

  const handlerConnectWallet = async () => {
    const { ethereum } = window

    if (!ethereum) return

    const [account] = await ethereum.request({ method: 'eth_requestAccounts' })

    setAccountId(account)
  }

  const getAccountInfo = async () => {
    const { ethereum } = window

    if (!ethereum) return

    console.log('🔥 connect wallet')
    const [account] = await ethereum.request({ method: 'eth_accounts' })

    setAccountId(account)

    if (accountId) {
      const web3 = new Web3(Web3.givenProvider || ethereum)
      const balance = await web3.eth.getBalance(account)
      const balanceEther = await web3.utils.fromWei(balance, 'ether')

      setBalance(balanceEther)
    }
  }

  useEffect(() => {
    getAccountInfo()
  }, [accountId])

  return (
    <div className='App'>
      {!accountId && (
        <div>
          <div className='text'>you not connect wallet</div>
          <div>
            <button onClick={handlerConnectWallet}>connect wallet</button>
          </div>
        </div>
      )}
      {accountId && (
        <div className='card'>
          <div>Address: {accountId}</div>
          <div>Balance: {balance} Ether</div>
        </div>
      )}
      {balance}
    </div>
  )
}

export default App
