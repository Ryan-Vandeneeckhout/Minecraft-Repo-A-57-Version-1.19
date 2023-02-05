const nbt = require("prismarine-nbt");
const { Buffer } = require("buffer");

let DownloadContent;

const worker = new Worker("./portable.js");
worker.onmessage = (e) => {
  if (e.data.type == "progress") {
    revealProgress(e.data.message);
  } else if (e.data.type == "result") {
    downloadFunction(e.data.data);
    DownloadContent = e.data.data;
    console.log(e.data.data);
    downloadFile();
  } else {
    console.log("Invalid message from Worker: ", e);
  }
};

function downloadFile() {
  const downloadButton = document.getElementById("downloadCompletedFile");
  const blob = new Blob([DownloadContent], {
    type: "plain/text",
  });
  const fileUrl = URL.createObjectURL(blob);
  downloadButton.setAttribute("href", fileUrl);
  downloadButton.setAttribute("download", "Completed File.txt");
}

function revealProgress(message) {
  document.getElementById("output-logs").value += message + "\n";
  document.getElementById("output-logs").scrollTop = document.getElementById(
    "output-logs"
  ).scrollHeight;
}

var structure = {};

var importedData = "";

var currentFile = "";
function parseImportedData(file) {
  currentFile = file;
  if (file.name.endsWith(".json")) {
    structure = JSON.parse(importedData);
    document.getElementById("upload").style.display = "none";
    document.getElementById("download").style.display = "flex";
  } else {
    nbt.parse(Buffer.from(importedData)).then(function (data) {
      structure = data.parsed;
      unparsedStructure = data.metadata.buffer;
      //console.log(data);

      document.getElementById("upload").style.display = "none";
    });
  }
}

function exportFunction() {
  worker.postMessage({
    tiles: document.getElementById("tiles").checked,
    blockstates: document.getElementById("blockstates").checked,
    entities: document.getElementById("entities").checked,
    structure: structure,
  });
  document.querySelector("#download-btn").style.display = "none";
}

function downloadFunction(data) {
  var files = [];
  var filename = currentFile.name.replaceAll(".mcstructure", "");
  if (data.split("\n").length > 9000) {
    var lines = data.split("\n");

    var loops = 1;
    while (lines.length > 1 && loops < 25) {
      files.push(
        new File(
          [lines.splice(0, 9000).join("\n")],
          filename + loops + ".mcfunction"
        )
      );
      loops++;
    }
  } else {
    files = [new File([data], filename + ".mcfunction")];
  }

  for (let downloadable of files) {
    if (window.bridge && window.bridge.connected) {
      revealProgress("Downloading file to bridge. ...");
      exportFile(
        downloadable,
        downloadable.name,
        window.bridge.openedPath
          .replace("structures", "functions")
          .replaceAll(".mcstructure", ".mcfunction")
      );
    } else {
      revealProgress("File Ready for Download");
      document.querySelector("#downloadCompletedFile").style.display = "block";
      exportFile(downloadable);
    }
  }

  document.querySelector("#download-btn").style.display = "none";
}

function download() {
  Array.from(document.getElementsByClassName("parameters-tab")).forEach(
    (el) => {
      el.style.display = "none";
    }
  );
  Array.from(document.getElementsByClassName("logs-tab")).forEach((el) => {
    el.style.display = "block";
  });

  exportFunction(
    document.getElementById("tiles").checked,
    document.getElementById("blockstates").checked,
    document.getElementById("entities").checked
  );
}

function AssignDownloadButton() {
  console.log("Button Loaded");
  const projectInputElement = document.getElementById("download-btn");
  projectInputElement.addEventListener("click", download);
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
  const DownloadButton = document.getElementById("download-btn");
  if (DownloadButton) {
    AssignDownloadButton(DownloadButton);
    mutationInstance.disconnect();
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
