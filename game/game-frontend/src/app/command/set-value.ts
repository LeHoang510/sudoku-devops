import { UndoableCommand } from "interacto";
import { Game } from "../models/game";

export class SetValue extends UndoableCommand{

    value : number;
    oldValue : number;
    index : number;
    game : Game;
    isRisky : boolean;

    public constructor(val: number , i: number, g: Game ) {
        super();
        this.value = val;
        this.index = i;
        this.game = g;
        this.oldValue = 0;
        this.isRisky = this.game.map.helpTiles[i]?.size > 1;
    }

    // remember the old value for undo redo
    protected override createMemento() {
        this.oldValue = this.game.map.cas[this.index];
    }
    
    // if the value change the command can be executed
    public override canExecute(): boolean {
        return this.game.map.cas[this.index] !== this.value;
    }

    protected execution(): void {
        console.log("command execution works")
        this.game.setValue(this.index,this.value);
    }

    public redo(): void {
        console.log("command redo works")
        this.game.setValue(this.index,this.value);
    }

    public undo(): void {
        console.log("command undo works")
        this.game.setValue(this.index,this.oldValue);
    }
    
    // put new element in history
    public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
        return SetValue.getSnapshot(this.game, this.index, this.isRisky);
    }

    // Draw new element
    public static getSnapshot(game: Game, indexChanged: number, isRisky:boolean): HTMLImageElement {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const tileSize = 110;
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.font = '100px Bodo';
        ctx.fillStyle = 'black';

        if(isRisky && game.map.cas[indexChanged]!=0){ // Draw element if the move is risky
            for (let i = 0; i < game.map.cas.length; i++){
                if(game.map.cas[i]==0){ // Draw blank cell
                    ctx.fillStyle = 'purple';
                    ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    ctx.fillStyle = 'black'
                    ctx.fillText("", 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                } else if(i==indexChanged){ // Draw the cell that have just been change
                    if(game.checkCase2(i)){ // Draw error cell
                        ctx.fillStyle = 'red';
                        ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    }else{ // Draw good cell
                        ctx.fillStyle = 'purple';
                        ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    }
                    ctx.fillStyle = 'green';
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                    ctx.fillStyle = 'black';
                } else if(game.checkCase2(i)){ // Draw error cell
                    ctx.fillStyle = 'red';
                    ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    ctx.fillStyle = 'black';
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                } else { //Draw normal cell
                    ctx.fillStyle = 'purple';
                    ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    ctx.fillStyle = 'black'
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                }
            }
        }else{ // Draw element if the move is not risky
            for (let i = 0; i < game.map.cas.length; i++){
                if(game.map.cas[i]==0){ // Draw blank cell
                    ctx.fillText("", 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                } else if(i==indexChanged){ // Draw the cell that have just been change
                    if(game.checkCase2(i)){ // Draw error cell
                        ctx.fillStyle = 'red';
                        ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    }
                    ctx.fillStyle = 'green';
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                    ctx.fillStyle = 'black';
                } else if(game.checkCase2(i)){ // Draw error cell
                    ctx.fillStyle = 'red';
                    ctx.fillRect((i % 9) * tileSize,Math.floor(i / 9) * tileSize,110,110)
                    ctx.fillStyle = 'black';
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                } else { //Draw normal cell
                    ctx.fillText(game.map.cas[i].toString(), 
                                (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
                }
            }
        }
        // Draw lines
        for(let i = 1; i < 9; i++) {
            ctx.moveTo(i * tileSize, 0);
            ctx.lineTo(i * tileSize, canvas.height);
            ctx.moveTo(0, i * tileSize);
            ctx.lineTo(canvas.width, i * tileSize);
        }
        ctx.stroke(); // Draw the content
        const imgCache = new Image();
        imgCache.src = canvas.toDataURL("image/png");
        return imgCache;
    }
}
