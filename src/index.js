import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { SetUp } from './components/SetUp'
import { Round } from './components/Round'

const App = () => {
    const [params, setParams] = React.useState(null) // Used to customize the game's parameters
    return (
        <div>
            <h1>TIC-TAC-TOE</h1>
            {
                !params
                    ?   <SetUp {...{setParams}}/>
                    :   <Round {...{params}}/>
            }
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))