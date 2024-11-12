export default [
  {
    name: ["search", "s"],
    description: "Searches Google for the given query",
    execute: executor.search,
  },
  {
    name: ["ls"],
    description: "Lists available shortcuts",
    execute: executor.ls,
  },
  {
    name: ["help"],
    description: "Lists available commands",
    execute: executor.help,
  },
  {
    name: ["clear"],
    description: "Clears the output history",
    execute: executor.clear,
  },
  {
    name: ["weather"],
    description: "Displays the weather forecast",
    execute: executor.weather,
  },
  {
    name: ["*"],  // Catch-all command
    description: "Search Google (type anything)",
    execute: (args, fullCommand) => executor.search([fullCommand, ...args]),
  }
];