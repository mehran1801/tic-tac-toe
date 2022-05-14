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
        }else{
            game.oState.push(cellValue)
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
        
    }

})