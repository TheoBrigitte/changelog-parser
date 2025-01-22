import { Changelog, Release } from "keep-a-changelog";
import fs from "fs";

// Initialize a new changelog file
export function init(options) {
  // Create a new changelog
  const changelog = new Changelog(options.title, options.description);
  changelog.format = options.format
  changelog.url = options.url;

  // Add initial release
  if (options.initialVersion) {
    // Add initial release to enforce compare links section initialization.
    changelog.addRelease(new Release(options.initialVersion, new Date()));
  }
  // Add unreleased changes
  changelog.addRelease(new Release());

  fs.writeFileSync(options.file, changelog.toString(), { encoding: options.encoding });
}
