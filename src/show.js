const { parser } = require("keep-a-changelog");
const fs = require("fs");

// Show and release and its changes
function show(version, options) {
  // Read changelog file
  const changelog = parser(fs.readFileSync(options.file, options.encoding));
  changelog.format = options.format;
  changelog.sortReleases();

  // Find release
  let release;
  switch (version) {
    case "latest":
      release = changelog.releases.find((release) =>
        release.date && release.version
      );
      break;
    case "unreleased":
      version = undefined;
    default:
      release = changelog.findRelease(version);
  }
  if (!release) {
    throw new Error(`release ${version} not found`);
  }

  // Print changes
  console.log(release.toString(changelog));
}

module.exports = { show };
