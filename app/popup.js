import { generateTerraformCode } from "./monitor-converter.js";
import { generateDashboardTerraformCode } from "./dashboard-converter.js";

function onClick() {
  var resourceName = document.getElementById("resourceName").value;
  var datadogJson = document.getElementById("datadogJson").value;

  try {
    if (!resourceName) {
      const regex = /(\W|\s)/ig;
      resourceName =  
        `dashboard_${new Date().toISOString().replaceAll(regex, "_")}`;

      console.log(`Using default resource name: ${resourceName}`);
      document.getElementById("resourceName").value = resourceName;
    }

    if (!datadogJson) {
      updateStatusMessage("No Datadog JSON given", true);
      return;
    };

    var terraformCode;
    let parsedJson = JSON.parse(datadogJson);

    if (parsedJson.hasOwnProperty("name")) {
      terraformCode = generateTerraformCode(resourceName, parsedJson);
    } else {
      terraformCode = generateDashboardTerraformCode(resourceName, parsedJson);
    }

    addDomElementsForResult(terraformCode);
    copyResultToClipboard();
    updateStatusMessage("Copied to clipboard!", false);
    
  } catch (e) {
    updateStatusMessage(e, true);
  }
}

function addDomElementsForResult(terraformAlarmCode) {
  var resultTextArea = document.createElement("textarea");
  resultTextArea.id = "result";
  resultTextArea.textContent = terraformAlarmCode;

  var outputWrapperDiv = document.getElementById("outputWrapper");
  outputWrapperDiv.appendChild(resultTextArea);
  outputWrapperDiv.classList.add("active");
}

function copyResultToClipboard() {
  var copyText = document.getElementById("result");
  copyText.select();

  if (!navigator.clipboard) {
    document.execCommand("copy");
  } else{
      navigator.clipboard.writeText(copyText).then(
        s => {
          console.log(`Copied to clipboard`);
        })
        .catch(e => {
          console.error(`Copied to clipboard failed ${e}`);
        });
  }    
}

function updateStatusMessage(message, isError) {
  var newMessageText = isError ? "❗️" + message : "🎉" + message;
  var statusMessageElement = document.getElementById("statusMessage");
  statusMessageElement.textContent = newMessageText;
  document.getElementById("convertButton").style.marginBottom = "0";
  if (isError) {
    statusMessageElement.style.color = "red";
  }
}

document.getElementById("convertButton").addEventListener("click", onClick);
