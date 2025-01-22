import { parser } from "keep-a-changelog";
import fs from "fs";

// Format changelog file
export function fmt(options) {
  // Parse changelog file
  const changelog = parser(fs.readFileSync(options.file, options.encoding));
  changelog.format = options.format;

  if (options.write) {
    // Write parsed changelog back to file
    fs.writeFileSync(options.file, changelog.toString());
    return;
  }

  if (options.silent) {
    return;
  }

  console.log(changelog.toString());
}
