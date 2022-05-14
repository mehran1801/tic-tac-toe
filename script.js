// we need an object for storing the state of our game.

const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
        // Rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}


document.addEventListener('click',e=>{
    const target = e.target;
    console.log('initializing code')
    const isCell = target.classList.contains('grid-cell')
    const isDisabled = target.classList.contains('disabled');
    if(isCell && !isDisabled){
        const cellValue = target.dataset.value;
        if(game.xTurn){
            game.xState.push(cellValue)
            console.log("xState is "+ game.xState);
        }else{
            game.oState.push(cellValue)
            console.log("oState is "+game.oState);

        }
        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')
        game.xTurn = !game.xTurn;
        // check for draws
        let lengthOfCellsNotDisabled = document.querySelectorAll('.grid-cell:not(.disabled)').length;
        if(!lengthOfCellsNotDisabled){
            // console.log(`checked the length of cells excluding disabled ones ${lengthOfCellsNotDisabled}`)
            document.querySelector('.game-over').classList.add('visible');
            document.querySelector('.game-over-text').innerHTML = 'Draw!'
        }
        // check for wins
        game.winningStates.forEach(winningState => {
            const xWins = winningState.every(state => game.xState.includes(state))
            const oWins = winningState.every(state => game.oState.includes(state))
          
            if (xWins || oWins) {
                document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
                document.querySelector('.game-over').classList.add('visible')
                document.querySelector('.game-over-text').textContent = xWins
                    ? 'X wins!'
                    : 'O wins!'
            }
        })
        // restarting the game
        document.querySelector('.restart').addEventListener('click', () => {
            document.querySelector('.game-over').classList.remove('visible')
            document.querySelectorAll('.grid-cell').forEach(cell => {
                cell.classList.remove('disabled', 'x', 'o')
            })
        
            game.xTurn = true
            game.xState = []
            game.oState = []
        })
    }

})