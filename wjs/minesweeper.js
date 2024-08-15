function createBoard(rows, cols, mines) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = { mine: false, number: 0, revealed: false, marked: false };
        }
    }
    placeMines(board, rows, cols, mines);
    return board;
}

function placeMines(board, rows, cols, mines) {
    // Randomly place mines
    for (let i = 0; i < mines; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        } while (board[row][col].mine);
        board[row][col].mine = true;
        for (let x = Math.max(row - 1, 0); x <= Math.min(row + 1, rows - 1); x++) {
            for (let y = Math.max(col - 1, 0); y <= Math.min(col + 1, cols - 1); y++) {
                board[x][y].number += 1;
            }
        }
    }
}

function setupGame() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear previous board
    const board = createBoard(10, 10, 20);
    board.forEach((row, rowIndex) => {
        const rowElement = document.createElement('tr');
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('td');
            cellElement.oncontextmenu = function(e) {
                e.preventDefault(); // 阻止右键菜单
                if (!cell.revealed) {
                    cell.marked = !cell.marked;
                    cellElement.classList.toggle('marked', cell.marked);
                }
            };
            cellElement.addEventListener('click', () => {
                if (cell.mine) {
                    alert('BOOM！恭喜你踩雷了！重新开始吧');
                    setupGame(); // Reset game
                } else if (!cell.marked) {
                    cellElement.textContent = cell.number;
                    cell.revealed = true;
                    cellElement.style.pointerEvents = 'none';
                }
            });
            rowElement.appendChild(cellElement);
        });
        boardElement.appendChild(rowElement);
    });
}

// 在页面加载完毕时初始化扫雷游戏
window.onload = function() {
    setupGame();
};
