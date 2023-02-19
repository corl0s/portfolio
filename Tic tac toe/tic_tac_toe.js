var board;
var playerO = "O";
var playerX = "X"
var currPlayer = playerO;
var gameOver = false;

var rows = 3;
var columns = 3;

window.onload = function()
{
    setGame();
}

function setGame()
{
    board = [];

    for (r  = 0;r < rows;r++)
    {
        let row = [];
        for(c = 0;c < columns;c++)
        {
            // for javascript
            row.push(' ');

            // for html
            // <div> id ="r-c" class = "tile"</div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            
            if(r == 0 || r == 1)
            {
                tile.classList.add("horizontal-line");
            }

            if(c == 0 || c == 1)
            {
                tile.classList.add("vertical-line");
            }

            tile.addEventListener("click",setTile);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setTile()
{
    if (gameOver)
    {
        return;
    }
    
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if(board[r][c] == ' ')
    {
        board[r][c] = currPlayer;
        this.innerText = currPlayer;
        if(currPlayer == playerO)
        {
            currPlayer = playerX;
        }
        else
        {
            currPlayer = playerO;
        }
        winnerCheck();
    }
    
}

function checkHorizontal()
{
    let c =0;
    for (r = 0;r < rows;r++)
    {
        // window.alert(c);
        if(board[r][c] != ' ' && board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2])
        {
            for (i = 0;i < rows;i++)
            {
                tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
                

            }
            
            gameOver = true;
            setWinner(r,c);
            return;
        }
    }
}

function checkVertical()
{
    let r = 0;
    for (c = 0;c < columns;c++)
    {
        // window.alert(c);
        if(board[r][c] != ' ' && board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c])
        {
            for (i = 0;i < columns;i++)
            {
                tile = document.getElementById(i.toString() + "-" + c.toString());
                tile.classList.add("winner");

            }
            setWinner(r,c);
            gameOver = true;
            return;
        }
    }
}

function checkDiagonal()
{
    let r = 0;
    let c = 0;
    if(board[r][c] != ' ' && board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2])
    {
        for (i = 0;i < columns;i++)
        {
            tile = document.getElementById(i.toString() + "-" + i.toString());
            tile.classList.add("winner");

        }
        setWinner(r,c);
        gameOver = true;
        return;
    }
    r = 2;
    c = 0;
    if(board[r][c] != ' ' && board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2])
    {
        let a = 0;
        let b = 2;
        for (i = 2;i >= 0;i--)
        {
            tile = document.getElementById(a.toString() + "-" + b.toString());
            a++;
            b--;
            tile.classList.add("winner");
        }
        setWinner(r,c);
        gameOver = true;
        return;
    }

}

function setWinner(r,c)
{
    let winner =  document.getElementById("winner");
    if(board[r][c] == playerO)
    {
        winner.innerText = "O wins";
    }
    else
    {
        winner.innerText = "X wins";
    }
}

function winnerCheck()
{
    checkHorizontal();
    checkVertical();
    checkDiagonal();
}