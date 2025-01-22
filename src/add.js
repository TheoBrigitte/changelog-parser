import { parser, Release, Change } from "keep-a-changelog";
import fs from "fs";

// Add a new change to the changelog
export function add(title, description, options) {
  // Parse changelog file
  const changelog = parser(fs.readFileSync(options.file, options.encoding));
  changelog.format = options.format;

  // Find release
  let release = changelog.findRelease(options.version);
  if (!release && !options.version) {
    // Create new unreleased section
    release = new Release();
    changelog.addRelease(release);
  }

  // Add new change to unreleased changes
  const newChange = new Change(title, description);
  release.addChange(options.type, newChange);

  // Save changes to file
  fs.writeFileSync(options.file, changelog.toString());
}
