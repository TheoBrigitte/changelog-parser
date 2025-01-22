const { parser } = require("keep-a-changelog");
const fs = require("fs");

// List all releases in the changelog file
function list(options) {
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

module.exports = { list };
