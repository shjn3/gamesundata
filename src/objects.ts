import { canvasWidth,status_duck,status_jump,status_run,ArrowDown,ArrowUp,Space } from "./config";

let img_btnStart= new Image();
let sprites = new Image();
img_btnStart.src='./image/Scenes/PlayButton.png';
sprites.src='./image/assets/sprite.png';

export class Start{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    constructor(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        this.ctx=ctx;
        this.canvas=canvas;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.drawImage(img_btnStart,this.canvas.width/2-50,this.canvas.height/2-50,100,100);
        this.ctx.drawImage(sprites,75,0,100,110,15,307,60,70);
    }
}

export class Ground{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    sX:number;
    sY:number;
    cX:number;
    cY:number;
    sW:number;
    sH:number;
    cW:number;
    cH:number;
    vX:number;
    constructor(cX:number,cY:number,ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        this.ctx=ctx;
        this.canvas=canvas;
        this.sX=0;
        this.sY=100;
        this.sW=2400;
        this.sH=30;
        this.cX=cX;
        this.cY=cY;
        this.cW=canvasWidth*2;
        this.cH=30;
        this.vX = -2;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.drawImage(sprites,this.sX,this.sY,this.sW,this.sH,this.cX,this.cY,this.cW,this.cH);
    }
}


export class Cloud{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    sX:number;
    sY:number;
    cX:number;
    cY:number;
    sW:number;
    sH:number;
    cW:number;
    cH:number;
    vX:number;
    constructor(cX:number,cY:number,ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        this.ctx=ctx;
        this.canvas=canvas;
        this.sX=165;
        this.sY=0;
        this.sW=100;
        this.sH=30;
        this.cX=cX;
        this.cY=cY;
        this.cW=200;
        this.cH=60;
        this.vX = -1;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.drawImage(sprites,this.sX,this.sY,this.sW,this.sH,this.cX,this.cY,this.cW,this.cH);

       
    }
}
interface fpsPlayer{
    run:number;
    jump:number;
    duck:number;
}


export class Player{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    status:number;
    sX:number;
    sY:number;
    sW:number;
    sH:number;
    cX:number;
    cY:number;
    cW:number;
    cH:number;
    msPerSecond:fpsPlayer;
    frames_run:Array<number>;
    frames_jump:Array<number>;
    frames_duck:Array<number>;
    timer:number;
    isDrop:boolean;
    jumpVelocity:number;
    gravity:number;
    constructor( ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        this.ctx=ctx;
        this.canvas=canvas;
        this.status=status_run;

        this.sX=1511;
        this.sY=0;
        this.sW=95;
        this.sH=110;
        this.cX=15;
        this.cY=315;
        this.cW=60;
        this.cH=70;

        this.msPerSecond={run:1000/60,jump:1000/60,duck:1000/60}
        this.frames_run=[1511,1599];
        this.frames_jump=[1335];
        this.frames_duck=[1862,1982];
        this.timer=0;
        this.isDrop=false;
        this.jumpVelocity=-65;
        this.gravity=0.5;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.drawImage(sprites,this.sX,this.sY,this.sW,this.sH,this.cX,this.cY,this.cW,this.cH); 
        this.ctx.drawImage(sprites,260,this.sY,90,70,300,281,70,50);  
         
    }
    setPositionDuck(){
        this.sW=120;
        this.sH=90;
        this.cW=70;
        this.cH=58;
    }
    setPositionOther(){
        this.sH=110;
        this.sW=95;
        this.cW=60;
        this.cH=70;
    }
    update(){
        this.timer++;
        //check status run
        if(this.status===status_run){
            if(this.timer>=this.msPerSecond.run){
                this.setPositionOther();
                this.sX= this.sX===this.frames_run[0]?this.frames_run[1]:this.frames_run[0];
                this.timer =0;
            }
        }
        //check status duck
        if(this.status===status_duck){
            if(this.timer>=this.msPerSecond.duck){
                this.setPositionDuck();
                this.sX= this.sX===this.frames_duck[0]?this.frames_duck[1]:this.frames_duck[0];
                this.timer = 0;
            }
        }
        //check status jump
        if(this.status===status_jump){
            this.sX=this.frames_jump[0];
            if(!this.isDrop){
                if(this.cY<=250)
                    this.isDrop=true;
                this.cY-=3;
            }
            else{
                if(this.cY>=315){
                    this.cY=315;
                    this.status=status_run;
                    this.isDrop=false;
                    this.timer=0;
                }
                this.cY+=3
            
            }
        }
        
    }
}


interface arrNumber{
    name:string;
    sX:number;
    cX:number;
}
export class Score{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    cX:number;
    cY:number;
    value:number;
    isMaxScore:boolean;
    arrNumber:Array<arrNumber>

    constructor(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,cX:number,cY:number,isMaxScore:boolean){
        this.ctx=ctx;
        this.canvas=canvas;
        this.cX=cX;
        this.cY=cY;
        this.value=0;
        this.isMaxScore=isMaxScore;
        this.arrNumber=[
            {
                name:'0',
                sX:952,
                cX:cX
            },   {
                name:'0',
                sX:952,
                cX:cX+17
            },   {
                name:'0',
                sX:952,
                cX:cX+34
            },   {
                name:'0',
                sX:952,
                cX:cX+51
            },   {
                name:'0',
                sX:952,
                cX:cX+68
            }
        ]
    }
    draw(){
        this.arrNumber.forEach((_e)=>{
            this.ctx.drawImage(sprites,_e.sX,0,20,25,_e.cX,this.cY,15,15)
        })
        if(this.isMaxScore){
            this.ctx.drawImage(sprites,1152,0,40,25,this.cX-40,this.cY,30,15)
        }
    }
    update(delta:number){
        if(delta<200){
            this.value+=Math.round(delta/34);
        }
        let splitValue = this.value.toString().split('');
        let lengthSplit = splitValue.length
        for(let i = 5-(lengthSplit);i<5;i++){

            //console.log('abc');
            if(this.arrNumber[i].name!==splitValue[-5+(i+lengthSplit)]){
                this.arrNumber[i].name = splitValue[i+1-lengthSplit]
                this.arrNumber[i].sX=952+20*parseInt(splitValue[-5+(i+lengthSplit)]);
                //this.arrNumber[i].sX=952+20
                
            }
        }
    }
}

interface vector{
    x:number;
    y:number;
}
 abstract class Obstacles{
    ctx:CanvasRenderingContext2D;
    canvas:HTMLCanvasElement;
    sX:number;
    sY:number;
    sW:number;
    sH:number;
    cX:number;
    cY:number;
    cW:number;
    cH:number;
    constructor(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement){
        this.ctx=ctx;
        this.canvas=canvas;
        this.sX=0;
        this.sY=0;
        this.sW=0;
        this.sH=0;
        this.cX=0;
        this.cY=0;
        this.cW=0;
        this.cH=0;
    }
}
let arrCactus={
    large:{
        one:{
            cY:290,
            cW:40,
            cH:80,
            sY:0,
            sW:40,
            sH:80,
            sX:[650,750,700,800]
        },
        three:{
            cY:290,
            cW:100,
            cH:80,
            sY:0,
            sW:100,
            sH:90,
            sX:[850]
        }
    },
    small:{
        cY:310,
            cW:35,
            cH:60,
            sY:0,
            sW:34,
            sH:70,
            sX:[616,582,548,514,478,446]
    }
}

let arrBird={
    cY:281,
    cW:70,
    cH:50,

    sY:0,
    sW:90,
    sH:70,
    sX:[350,260]
}
export abstract class Cactus extends Obstacles{

    constructor(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement) {
        super(ctx,canvas);
        
    }
    

}

