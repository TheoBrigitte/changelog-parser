import { Command, InvalidArgumentError } from "commander";
import { Release } from "keep-a-changelog";
import { add } from "./add.js";
import { fmt } from "./fmt.js";
import { init } from "./init.js";
import { list } from "./list.js";
import { merge } from "./merge.js";
import { release } from "./release.js";
import { show } from "./show.js";

export function cmd() {
  class rootCommand extends Command {
    createCommand(name) {
      const cmd = new Command(name);
      // Add global options
      cmd.option("-f, --file <file>", "Path to changelog file", "CHANGELOG.md");
      cmd.option("--format <format>", "Changelog format (markdownlint or compact)", "markdownlint");
      cmd.option("--encoding <encoding>", "Encoding format of the changelog file", "UTF-8");
      return cmd;
    }
  }

  const parseIntArg = (value) => {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      throw new InvalidArgumentError('Not a number.');
    }
    return parsedValue;
  }

  const program = new rootCommand();

  // Define the main program
  program
    .name("changelog-parser")
    .description("A command-line tool to parse and manipulate changelog files")
    .version("0.1.0")

  // Define commands
  const changeTypes = Array.from(new Release().changes.keys()).join(", ");
  program
    .command("add")
    .description("Add a new change to the changelog")
    .argument("<title>", "Change title")
    .argument("[description]", "Change description", "")
    .option("-t, --type <type>", `Change type (allowed values: ${changeTypes})`, "added")
    .option("-v, --version <version>", "Release version to add changes to (default: unreleased)")
    .action(add);

  program
    .command("fmt")
    .description("Format changelog file")
    .option("-w, --write", "Write formatted changelog back to file", false)
    .option("-s, --silent", "Do not output formatted changelog", false)
    .action(fmt);

  program
    .command("init")
    .description("Initialize a new changelog file")
    .option("--title <title>", "Changelog title", "Changelog")
    .option("--description <description>", "Changelog description")
    .option("--url <url>", "Changelog URL", "https://example.com")
    .option("--initial-version <initial-version>", "Initial release version. Set to '' to skip initial release creation, note that compare links section will not be initialized in this case", "0.1.0")
    .action(init);

  program
    .command("list")
    .description("List releases in the changelog")
    .action(list);

  program
    .command("show")
    .description("Show a release and its changes")
    .argument("<version>", "Release version, latest or unreleased")
    .action(show);

  program
    .command("merge")
    .summary("Merge changes from one or multiple changelog file(s)")
    .argument("<sources...>", "Source changelog file(s). Each source can contain a release version, latest or unreleased keyword to select the release to be merged.  e.g. source@1.0.0, if not specified latest is used")
    .option("-n, --number <number>", "Number of additional older release(s) to merge from source, use -1 for all", parseIntArg, 0)
    .option("-v, --version <version>", "Release version to merge into (default: unreleased)")
    .action(merge);

  program
    .command("release")
    .description("Release the unreleased changes")
    .argument("<version>", "Release version")
    .option("-d, --date <date>", "Release date", new Date())
    .action(release);

  return program;
}
