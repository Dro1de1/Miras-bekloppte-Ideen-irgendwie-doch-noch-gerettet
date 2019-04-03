// async function getMedia(pc) {
//     let stream = null;
  
//     try {
//       stream = await navigator.mediaDevices.getUserMedia(constraints);
//       /* use the stream */
//     } catch(err) {
//       /* handle the error */
//     }
//   }

var text = null;

// grab our canvas
window.onload = function() {

    // text = document.getElementById("texts");
    // console.log(text);
    // texts = document.getElementById("textsa");
    // textsa = document.getElementById("textsas");
    // check1 = document.getElementById("check1");
    // check2 = document.getElementById("check2");
}

// monkeypatch Web Audio
window.AudioContext = window.AudioContext || window.webkitAudioContext;

// grab an audio context
audioContext = new AudioContext();
console.log(audioContext);

// monkeypatch getUserMedia
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

// ask for an audio input
if (navigator.getUserMedia) {
   navigator.getUserMedia({ audio: true},
    gotStream, didntGetStream);
} else {
   console.log("getUserMedia not supported");
}


function didntGetStream(stream) {
    console.log("Keinen Stream bekommen");
    console.log(stream);
}
var mediaStreamSource=null;
function gotStream(stream) {
    console.log(stream);
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    console.log(mediaStreamSource);
    
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
    drawLoop();
}
var counter = 0; counter2 = 0;
var checkerCounter = 0;
var counterTime = 0;
var zwischenZeit = 250; //in Millisekunden
var voiceLevel = 0.01 // 0.01 
var boxNr = 0;
var anzahlBoxen = 10;
function drawLoop( time ) {
    // text.innerHTML = meter.volume;
    if (meter.volume > voiceLevel) {
        counter++;
        // texts.innerHTML = counter;
    }
    var dif=time - counterTime;
    if (checkerCounter < counter  &&  dif > zwischenZeit){
        
        //nur wenn eine welle ausgegeben wurde
        counterTime = time;
        checkerCounter = counter;
        counter2++;
        wave();
        console.log("Welle")
        // check1.innerHTML = counterTime;
        // check2.innerHTML = counter2;
        
        
    }
    // textsas.innerHTML = time;
    rafID = window.requestAnimationFrame( drawLoop );
}
function wave() {
    var tope = (zwischenZeit);
    document.getElementsByClassName("grenn")[0].getElementsByClassName("container")[boxNr].id="backCircle";
    setTimeout(function(){ document.getElementsByClassName("grenn")[0].getElementsByClassName("container")[boxNr].id="" }, tope);
    var x = (anzahlBoxen-1)
    if (boxNr < x) {
        boxNr++;
    } else if (boxNr>=x) {
        boxNr = 0;
    }
    return null
}