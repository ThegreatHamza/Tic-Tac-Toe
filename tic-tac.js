
        // Game Board Factory Function
        const createGameBoard = () => {
            const board = ['', '', '', '', '', '', '', '', ''];
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            const makeMove = (index, player) => {
                if (board[index] === '') {
                    board[index] = player;
                    return true;
                }
                return false;
            };

            const checkWinner = (player) => {
                return winningCombinations.some(combination =>
                    combination.every(index => board[index] === player)
                );
            };

            const isFull = () => board.every(cell => cell !== '');

            return { board, makeMove, checkWinner, isFull };
        };

        // Player Factory Function
        const createPlayer = (name, symbol) => {
            return { name, symbol };
        };

        // Game Module
        const game = (() => {
            let board;
            let players = [];
            let currentPlayerIndex;
            const cells = document.querySelectorAll('.cell');
            const messageDisplay = document.getElementById('message');
            const startButton = document.getElementById('startButton');

            // Initialize the game
            const initializeGame = () => {
                const player1Name = document.getElementById('player1Name').value.trim();
                const player2Name = document.getElementById('player2Name').value.trim();

                if (!player1Name || !player2Name) {
                    messageDisplay.textContent = "Please enter names for both players.";
                    return;
                }

                players = [createPlayer(player1Name, 'X'), createPlayer(player2Name, 'O')];
                currentPlayerIndex = 0;
                board = createGameBoard();
                cells.forEach(cell => {
                    cell.textContent = '';
                    cell.addEventListener('click', handleCellClick);
                });
                updateMessage();
            };

            // Update the display message
            const updateMessage = () => {
                messageDisplay.textContent = `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].symbol})`;
            };

            // Handle a click on a game board cell
            const handleCellClick = (event) => {
                const cell = event.target;
                const index = parseInt(cell.dataset.index);

                if (board.makeMove(index, players[currentPlayerIndex].symbol)) {
                    cell.textContent = players[currentPlayerIndex].symbol;
                    cell.removeEventListener('click', handleCellClick); // Prevent re-clicking

                    if (board.checkWinner(players[currentPlayerIndex].symbol)) {
                        endGame(`${players[currentPlayerIndex].name} wins!`);
                    } else if (board.isFull()) {
                        endGame("It's a draw!");
                    } else {
                        switchPlayer();
                        updateMessage();
                    }
                }
            };

            // Switch to the other player
            const switchPlayer = () => {
                currentPlayerIndex = 1 - currentPlayerIndex;
            };

            // End the game and display the result
            const endGame = (message) => {
                messageDisplay.textContent = message;
                cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
            };

            // Event listener for the start button
            startButton.addEventListener('click', initializeGame);

            return {}; // Return an empty object for the module
        })();
    