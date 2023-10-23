#Project is developed by LE Vu Thuy Tu, Vu Thanh Tung, NGUYEN Le Hoang 
# How to start the project

## Project overview

### home page 
![](/images/homepage.png)
**Features :**
+ choose levels
+ play with suggestion or not
+ register player name

### Game board
![](/images/board.png)
**Features :**
+ Undo/Redo history 
+ Follow the leader board
+ Check validity of move
+ Track score 
+ save score after the game finish


## start the backend 
```
cd game/game-backend
mvn spring-boot:run
```

## start the frontend
```
cd game/game-frontend
ng serve --open
```
## Layout

`sudoku/sudoku-backend` is backend of the application. It contains th Java code of the server.
It is in charge with providing a REST API.

`sudoku/sudoku-frontend` is the Angular front-end of the application.

`sudoku-doc` is the folder that will contain your reports (and its pictures) and the user documentation.

