

var playerblue = "B";
var playerRed = "R";
var currPlayer = playerblue;

var gameOver = false;
var board;
var columnHeight;

var rows = 6;
var columns = 7;

window.onload = function()
{
    setGame();
}

function setGame()
{
    board = [];
    columnHeight = [5,5,5,5,5,5,5];

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
            tile.addEventListener("click",setPeice);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPeice()
{
    if(gameOver)
    {
        
        return;
    }

    let cords = this.id.split("-");
    let r = parseInt(cords[0]);
    let c = parseInt(cords[1]);

    r = columnHeight[c];
    if(r < 0)
    {
        return;
    }
    board[r][c] = currPlayer;
    
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if(currPlayer == playerRed)
    {
        tile.classList.add("red-peice");
        currPlayer = playerblue;
    }
    else
    {
        tile.classList.add("blue-peice");
        currPlayer = playerRed;
    }
    columnHeight[c]--;

    winnerCheck();
}

function checkHorizontal()
{
    for (r = 0;r < rows;r++)
    {
        for (c = 0;c < columns - 3;c++)
        {
            if(board[r][c] != ' ')
            {
                // window.alert(c);
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3])
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function checkVertical()
{
    for (c = 0;c < columns;c++)
    {
        for (r = 0;r < rows - 3;r++)
        {
            if(board[r][c] != ' ')
            {
                // window.alert(c);
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c])
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function checkDiagonal()
{
    // Anti diagonal checking

    for (r = 0;r < rows - 3;r++)
    {
        for (c = 0;c < columns - 3;c++)
        {
            if(board[r][c] != ' ')
            {
                // window.alert(c);
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3])
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    for (r = 2;r < rows;r++)
    {
        for (c = 0;c < columns-3;c++)
        {
            if(board[r][c] != ' ')
            {
                // window.alert(c);
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3])
                {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
}

function setWinner(r,c)
{
    let winner =  document.getElementById("winner");
    if(board[r][c] == playerRed)
    {
        winner.innerText = "Red wins";
    }
    else
    {
        winner.innerText = "Blue wins";
    }
    var button = document.createElement('BUTTON');
    button.classList.add("button");
    var text = document.createTextNode("Click to restart");
    button.appendChild(text);
    document.body.appendChild(button);
    button.addEventListener ("click", function() {
        window.location.reload();
      });
    gameOver = true;
}

function winnerCheck()
{
    checkHorizontal()
    checkVertical()
    checkDiagonal()
}