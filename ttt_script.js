const blocks = document.querySelectorAll('.box');
const reset = document.getElementById('Reset');

let currentPlayer = 'O';
// let gameActive = true;

const win_condition = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const check_condition = () => {
    for (let [a, b, c] of win_condition) {
        if (blocks[a].innerText && 
            blocks[a].innerText === blocks[b].innerText && 
            blocks[a].innerText === blocks[c].innerText) {
            return blocks[a].innerText;
        }
    }
    return null;
}

const play = (event) => {
    const blk = event.target;
    if (blk.innerText === '') {
        blk.innerText = currentPlayer;
        blk.removeEventListener('click', play);
        
        const winner = check_condition();
        if (winner) {
            // gameActive = false;
            setTimeout(() => {
                alert(`Player ${winner} has won!`);
                reset_board();
            }, 100);
        } else if ([...blocks].every(block => block.innerText !== '')) {
            // gameActive = false;
            setTimeout(() => {
                alert('Match has drawn!');
                reset_board();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

const reset_board = () => {
    currentPlayer = 'O';
    // gameActive = true;
    blocks.forEach(block => {
        block.innerText = '';
        block.addEventListener('click', play);
    });
}

blocks.forEach(block => {
    block.addEventListener('click', play);
});

reset.addEventListener('click', reset_board);
