import { parser } from "keep-a-changelog";
import fs from "fs";

// List all releases in the changelog file
export function list(options) {
  // Read changelog file
  const changelog = parser(fs.readFileSync(options.file, options.encoding));
  changelog.sortReleases();

  const releases = changelog.releases.filter((release) =>
    release.date && release.version
  )

  for (const release of releases) {
    console.log(release.version?.toString());
  }
}
