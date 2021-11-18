import React from 'react'

// 1 canvas = 1 playing square
const Canvas = ({i}) => {

    const canvasRef = React.useRef(null)
    
    return <canvas width={150} height={150} key={`canvas_${i}`} ref={canvasRef}/>

}
  
export const Round = ({params}) => {

    let canvases = []
    for (let i = 0; i < params.cells; i++) {
        canvases.push(<Canvas  {...{i}} key={`canvas_${i}`}/>)
    }

    return (
        <div>
            <div className='game--board' style={{gridTemplateColumns: `repeat(${params.base}, 1fr)`}}>
                {canvases}
            </div>
        </div>
    )
    
}