var currentModel;

var modelList = [
    "clipboardIPC",
    "autotunePID"
]

function init() {
    let i = 0
    for (i = 0; i < modelList.length; i++) {
        document.getElementById(modelList[i]).onclick = function () {
            displayModel(document.getElementById(this.id + "-model"))
        }
        document.getElementsByClassName("close")[i].onclick = function(){
            currentModel.style.display = "none";
        }
    }
}

function displayModel(_modal) {
    currentModel = _modal
    _modal.style.display = "block";
}

// disable close model by click on window feature
window.onclick = function(event) {
  if (event.target == currentModel) {
    currentModel.style.display = "none";
  }
}

window.onload = function () {
    init();
}