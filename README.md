# Changelog parser

A command-line tool to easily manage and manipulate changelog files, ensuring consistency with the [keep a changelog](https://keepachangelog.com) format.

## Features

- Format and parse: Validate and automatically format your changelog file.
- Initialize a new changelog file: Quickly set up a standardized changelog for your project.
- Add a new change to a release: Easily add a new change to your changelog.
- Add a new release: Cut a new release in your changelog.
- List all releases: Get a list of all releases in your changelog.
- Show all changes in a release: Display all changes in a specific release.
- Merge two or more changelog files: Combine multiple changelog files into one.

## Usage

Default parameters use the `CHANGELOG.md` file in the current directory, this can be changed with the `-f` flag.

### Format and parse

The `fmt` command parses and formats the changelog file to adhere to the keep a changelog format.

```shell
changelog-parser fmt
```

This command exits with a non-zero status code if the changelog format is invalid.

```shell
changelog-parser fmt --silent || echo "Invalid changelog format"
```

Changes can be written back to the file with the `--write` flag.

### Initialize a new changelog file

The `init` command initializes a new changelog file.

```shell
changelog-parser init
```

This command creates a new changelog file with the following content:

```shell
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2025-01-21

[Unreleased]: https://example.com/compare/v0.1.0...HEAD
[0.1.0]: https://example.com/releases/tag/v0.1.0
```

This example uses default values, but title, description, url, and initial release version can be configured.

### Add a new change to a release

The `add` command adds a new change to the changelog file.

```
changelog-parser add --type added "New feature"
changelog-parser add --type security "Fix security issue"
```

Those commands add the following content to the changelog file:

```shell
### Added

- New feature

### Security

- Fix security issue
```

### Add a new release

The `release` command adds a new release to the changelog file.

```shell
changelog-parser release 1.0.0
```

This command adds the following content to the changelog file:

```diff
--- CHANGELOG.md
+++ CHANGELOG.md
@@ -9,2 +9,4 @@

+## [1.0.0] - 2025-01-21

 ### Added
@@ -19,3 +21,4 @@

-[Unreleased]: https://example.com/compare/v0.1.0...HEAD
+[Unreleased]: https://example.com/compare/v1.0.0...HEAD
+[1.0.0]: https://example.com/compare/v0.1.0...v1.0.0
 [0.1.0]: https://example.com/releases/tag/v0.1.0
```

A date can be specified with the `--date` flag.

### List all releases

The `list` command lists all releases in the changelog file.

```shell
changelog-parser list
```

This command prints the following content:

```shell
1.0.0
0.1.0
```

### Show all changes in a release

The `show` command shows all changes in a release.

```shell
changelog-parser show 1.0.0
```

This command prints the following content:

```shell
## [1.0.0] - 2025-01-21

### Added

- New feature

### Security

- Fix security issue
```

### Merge two or more changelog files

The `merge` command merges two (or more) changelog files.

```shell
changelog-parser merge other/CHANGELOG.md
```

This command merges the content from `other/CHANGELOG.md` latest release into the current changelog file.

The source release to be merged can be specified with `other/CHANGELOG.md@2.0.0`.
The destination release version can be specified with `--version` flag.

Multiple changelog files can be merged by specifying multiple files.

## Credits

- https://github.com/oscarotero/keep-a-changelog
