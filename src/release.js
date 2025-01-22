const { parser, Release } = require("keep-a-changelog");
const fs = require("fs");

// Release a new version
function release(version, options) {
  const changelog = parser(fs.readFileSync(options.file, options.encoding));
  changelog.format = options.format;

  const exists = changelog.findRelease(version);
  if (exists) {
    throw new Error(`release ${version} already exists`);
  }

  const unreleased = changelog.findRelease();
  if (!unreleased) {
    throw new Error(`no unreleased changes`);
  }

  unreleased.setDate(options.date);
  unreleased.setVersion(version);

  changelog.addRelease(new Release());

  fs.writeFileSync(options.file, changelog.toString());
}

module.exports = { release };
