let voorspel = document.querySelector("#voorspel")
let synth = window.speechSynthesis
let prediction = {}
let p = document.createElement("p");
const video = document.getElementById('video')
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    });
  }

voorspel.addEventListener("click", () => {
    userVideo()
    
})

function scan(){
    speak(prediction.label)
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

function userVideo(){
    classifier.classify(document.getElementById('video'), (err, results) => {
        prediction = results[0]
        console.log(prediction)
        p.innerText = prediction.label;
        document.getElementById("div2").appendChild(p);
        scan()
    });
}





