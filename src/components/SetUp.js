export const SetUp = ({setParams}) => {

    let base // Number of cells on each row (player's choice)
    let cells // Total number of cells
    let cellmatches = [] // Cell numbers used to evaluate the moves made (used to end the game and declare a winner)

    // Grid size setup
    function pickSize (num) {

        base = num
        cells = num * num

        for (let i = 0; i < base * 2 + 2; i++) {
            cellmatches[i] = []
        }

        for (let i = 0; i < base; i++) {
            for (let j = 0; j < base; j++) {
                cellmatches[i].push(i * base + j) // Matches row cells
                cellmatches[i + base].push(i + base * j) // Matches column cells
            }
            cellmatches[base * 2].push(i * (base + 1)) // Matches diagonal cells from top left to bottom right
            cellmatches[base * 2 + 1].push(i * (base - 1) + (base - 1)) // Matches diagonal cells from top right to bottom left
        }

        setParams({
            base: base,
            cells: cells,
            cellmatches: cellmatches
        })
        
    }

    const btns = []
    for (let i = 3; i <= 10; i++) {
        btns.push (<button key={`setup--btn_${i}`} onClick={() => pickSize(i)}>{i} x {i}</button>)
    }

    return (
        <div className='setup--block'>
            <p>Please select a grid size.</p>
            <div className='setup--btns'>
                {btns}
            </div>
        </div>
    )
}