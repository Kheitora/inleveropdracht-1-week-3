let voorspel = document.querySelector("#voorspel")
let synth = window.speechSynthesis
let prediction = {}
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

image.addEventListener('load', () => userImageUploaded())
fileButton.addEventListener("change", (event) => loadFile(event))
voorspel.addEventListener("click", () => {
    speak(`De eerste voorspelling van de foto is een ` + prediction.label + `waarbij de accuracy ` + parseInt(prediction.confidence*100) + `% is`)
})

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

function userImageUploaded(){
    classifier.classify(document.getElementById('output'), (err, results) => {
        prediction = results[0]
    });
}

function loadFile(event) {
    image.src = URL.createObjectURL(event.target.files[0])
}




