import executors from "./executors.js";

export default [
  {
    name: ["search", "s"],
    description: "Searches Google for the given query",
    execute: executors.search,
  },
  {
    name: ["ls"],
    description: "Lists available shortcuts",
    execute: executors.ls,
  },
  {
    name: ["help"],
    description: "Lists available commands",
    execute: executors.help,
  },
  {
    name: ["clear"],
    description: "Clears the output history",
    execute: executors.clear,
  },
  {
    name: ["weather"],
    description: "Displays the weather forecast",
    execute: executors.weather,
  },
  {
    name: ["*"], // Catch-all command
    description: "Search Google (type anything)",
    execute: (args, fullCommand) => executors.search([fullCommand, ...args]),
  }
];