img = "" ;
object = [] ;
status = "" ;

function setup() {
    canvas = createCanvas(300,350) ;
    canvas.center() ;
    video = createCapture(VIDEO) ;
    video.hide() ;
    objectdetection = ml5.objectDetector('cocossd',modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Object" ;
}

function modelLoaded() {
    console.log("Model loaded") ;
    status = true ;
    objectdetection.detect(video , gotResults) ;
}

function preload() {
    img = loadImage("dog_cat.jpg") ;
}

function gotResults(error , results) {
    if (error) {
        console.error(error) ;
    }
    else{
        console.log(results) ;
        object = results ;
    }
}

function draw() {
    image(video,0,0,300,380) ;
    if(status !="") {
        objectdetection.detect(video , gotResults) ;
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detector" ;
            
            fill("#FF0000") ; 
            percent = floor(object[i].confidence*100) ;
            text(object[i].label + " " + percent + "%" , object[i].x + 15 , object[i].y + 15) ;
            noFill() ;
            stroke("#FF0000") ;
            rect(object[i].x , object[i].y , object[i].width , object[i].height) ;
        }
    } 
    
}