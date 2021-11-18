import React from 'react'

// X move (animated)
function drawX (ctx) {

    setTimeout(() => {
        ctx.beginPath()
        ctx.strokeStyle = '#3d5a80'
        ctx.lineCap = 'round'
        ctx.lineWidth = 20
        ctx.moveTo(30, 30)
        for (let i = 0; i <= 90; i++) {
            setTimeout(() => {
                ctx.lineTo(30 + i, 30 + i)
                ctx.stroke()
            }, i * 3, i)
        }
    }, 0)

    setTimeout(() => {
        ctx.beginPath()
        ctx.strokeStyle = '#3d5a80'
        ctx.lineCap = 'round'
        ctx.lineWidth = 20
        ctx.moveTo(120, 30)
        for (let i = 0; i <= 90; i++) {
            setTimeout(() => {
                ctx.lineTo(120 - i, 30 + i)
                ctx.stroke()
            }, i * 3, i)
        }
    }, 300)

}

// O move (animated)
function drawO (ctx) {

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            ctx.beginPath();
            ctx.fillStyle = '#ee6c4d'
            ctx.moveTo(75, 75)
            ctx.arc(75, 75, 55,  Math.PI * 1.5 , Math.PI * 1.5 - i / Math.PI / 5, true)
            ctx.moveTo(75, 75)
            ctx.fill()
            ctx.beginPath();
            ctx.fillStyle = '#e0fbfc'
            ctx.moveTo(75, 75)
            ctx.arc(75, 75, 35,  Math.PI * 1.5 , Math.PI * 1.5 - i / Math.PI / 5, true)
            ctx.moveTo(75, 75)
            ctx.fill()
        }, i * 6, i)
    }

}

// 1 canvas = 1 playing square
const Canvas = ({i, play, winner}) => {

    const canvasRef = React.useRef(null)

    const canvasClass = () => winner ? 'filled' : null // Once the game is over, all the playing squares have full opacity
    
    return <canvas className={canvasClass()} width={150} height={150} key={`canvas_${i}`} ref={canvasRef} onClick={() => play(i, canvasRef)} />

}
  
export const Round = ({params}) => {

    const [winner, setWinner] = React.useState(null) // Used for endgame animation and replay button's display
    const [counter, setCounter] = React.useState(0) // Used to indicate which player is playing
    const [history, setHistory] = React.useState([]) // Used to store the moves made

    let moves = [...history] // Array used to update history and check for a possible winner
    
    function play (i, canvasRef) {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        if (!winner && !moves[i]) {

            if (counter % 2 === 0) {
                moves[i] = 'X'
                drawX(context)
            } else if (counter % 2 === 1) {
                moves[i] = 'O'
                drawO(context)
            }
            
            canvas.className = 'filled'
            setCounter(counter + 1)
            setHistory(moves)
            isGameOver()

        }

    }

    function isGameOver () {

        let winner = null

        if (counter === params.cells - 1) {
            winner = `IT'S A DRAW...`
        }
        
        for (let i = 0; i < params.cellmatches.length; i++) {
    
            let arr = []
            for (let j = 0; j < params.base; j++) {
                arr.push(moves[params.cellmatches[i][j]])
            }

            // All the elements in the array are the same. True or false ?
            let cellsAreSame = !!arr.reduce(function (a, b) { return (a === b) ? a : NaN })

            if (arr[0] && cellsAreSame) {
                arr[0] === 'X' ? winner = `PLAYER 1 WINS!` : winner = `PLAYER 2 WINS!`
            }

        }
        
        setWinner(winner)

    }

    let canvases = []
    for (let i = 0; i < params.cells; i++) {
        canvases.push(<Canvas {...{i, play, winner}} key={`canvas_${i}`}/>)
    }

    return (
        <div>
            <div className='game--board' style={{gridTemplateColumns: `repeat(${params.base}, 1fr)`}}>
                {canvases}
            </div>
            <div className='game--info'>
                {!winner
                    ?   <p>TURN: PLAYER {counter % 2 + 1}</p>
                    :   <>
                            <p>{winner}</p>
                            <button onClick={() => window.location.reload()}>REPLAY</button>
                        </>}
            </div>
        </div>
    )
    
}