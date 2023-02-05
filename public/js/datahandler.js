function importFile(file, projectVariable, readertype, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    window[projectVariable] = e.target.result;
    callback(file);
  };

  switch (readertype) {
    case "arraybuffer":
      reader.readAsArrayBuffer(file);
      break;
    case "dataurl":
      reader.readAsDataURL(file);
      break;
    case "binarystring":
      reader.readAsBinaryString(file);
      break;
    case "arraybuffer/text":
      console.log(file);
      if (file.length != 0) {
      }
      if (file.name.endsWith(".json")) {
        reader.readAsText(file);
        console.log("text");
      } else {
        reader.readAsArrayBuffer(file);
        console.log("ab");
      }
      document.querySelector("#upload").style.display = "none";
      document.getElementById("output-logs").value +=
        "Upload Successful!" + "\n";
      document.querySelector("#download-btn").style.display = "flex";

      break;
    default:
      reader.readAsText(file);
  }
}

function exportFile(file, name, custombridgepath) {
  //The user is attempting to save the file.
  if (window.iapi && window.bridge.openedFile && window.bridge.connected) {
    //Bridge. is connected. Intercept the file and send it to bridge. instead of downloading it to your computer
    file.arrayBuffer().then((buff) => {
      let filearray = new Uint8Array(buff);
      let bridgepath = custombridgepath || window.bridge.openedFile;
      iapi
        .trigger("fs.writeFile", { filePath: bridgepath, data: filearray })
        .then(function () {
          snackbar("File has been saved to bridge.");
        });
    });
  }
}
function handleSomeDiv() {
  const projectInputElement = document.getElementById("dataFileInput");

  //Set the filereader type to "text" by default
  var readertype = "text";
  //Change the filereader type if the <input> element contains a "readertype" attribute
  if (projectInputElement.hasAttribute("readertype")) {
    readertype = projectInputElement.getAttribute("readertype");
  }

  //Add the event listener to the input element
  projectInputElement.addEventListener("change", function () {
    importFile(this.files[0], "importedData", readertype, parseImportedData);
  });
  console.log("Upload Button Loaded");
}

const observer2 = new MutationObserver(function (mutations, mutationInstance) {
  const someDiv = document.getElementById("dataFileInput");
  if (someDiv) {
    handleSomeDiv(someDiv);
    mutationInstance.disconnect();
  }
});

observer2.observe(document, {
  childList: true,
  subtree: true,
});

function changeExportButton() {
  if (document.querySelector(".export-button")) {
    for (let ebutton of document.querySelectorAll(".export-button")) {
      ebutton.innerHTML = "Save to Bridge.";
    }
  }

  //Structure Editor
  if (document.querySelector(".export-type")) {
    document.querySelector(".export-type").style.display = "none";
  }
}

if (window.parent != window) {
  //Connect to bridge.
  var bridgescript = document.createElement("script");
  bridgescript.type = "module";
  bridgescript.src = "/js/bridge-connect.js";
  bridgescript.defer = true;
  bridgescript.id = "-bridge-connect";
  document.head.appendChild(bridgescript);
}
