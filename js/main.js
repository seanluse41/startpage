import commands from "./commands.js";
import executors from "./executors.js";
import { error, render } from "./helpers.js";
import shortcuts from "./shortcuts.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

// Add click handler for terminal area
terminal.addEventListener("click", (e) => {
  // Only focus input if we didn't click a link or the input itself
  if (!e.target.classList.contains("shortcut") && e.target !== input) {
    input.focus();
  }
});


function processUrl(url) {
  // If it's a local IP address, add http:// 
  if (url.match(/^[\d.]+:\d+$/)) {
      return `http://${url}`;
  }
  // If it already has a protocol, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
  }
  // Add https:// for all other URLs
  return `https://${url}`;
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const userInput = input.value.trim().split(" ");
    const command = userInput[0].toLowerCase();
    const options = userInput.slice(1);
    render(`<span class="red">$&nbsp;</span>${input.value}`);
    try {
      const commandDetails = commands.find((c) =>
        c.name.map((n) => n.toLowerCase()).includes(command)
      );
      if (commandDetails) {
        if (command === "help") commandDetails.execute(commands);
        else commandDetails.execute(options);
      } else {
        const shortcutDetails = shortcuts
          .flatMap((c) => Object.entries(c.items))
          .find(([i]) => i.toLowerCase().startsWith(command));
        if (shortcutDetails) {
          console.log(shortcutDetails);
          const processedUrl = processUrl(shortcutDetails[1]);
          render(`Redirecting to ${shortcutDetails[0]}...`);
          window.location.href = processedUrl;
        } else {
          // If no command or shortcut found, search for the entire input
          executors.search([command, ...options]);
        }
      }
    } catch (e) {
      error("red", "JS Error", e.message);
    }
    input.value = "";
  }
});

window.addEventListener("load", () => {
  executors.ls();
  let filenames = ["purple-flower.jpg", "purplelily.jpg", "purple-dune.jpg", "purple-mountains.jpg"];
  let root = document.getElementsByTagName("html")[0];
  root.style.backgroundImage = `url("./backgrounds/${filenames[Math.floor(Math.random() * filenames.length)]
    }")`;
  root.style.backgroundSize = "cover";
  root.style.backgroundPosition = "center";
});