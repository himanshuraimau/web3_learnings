import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WalletGenerator from './Components/Wallet'
import Fotter from './Components/Fotter'

function App() {
          return (
            <div className="app">
              <WalletGenerator/>
              <Fotter/>
            </div>
          )


}

export default App
