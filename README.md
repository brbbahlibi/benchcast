benchcast
======
A simple android app and chromecast receiver that you can use to benchmark the performance of chromecast device.

Folders
======
* android - the android app to control the game, just a skeleton at the moment.
* CastCompanionLibrary - see the section below, a library for interacting with Chromecast
* receiver - custom chromecast receiver html, javascript, image and sound files

Receiver
======
The receiver folder is in fact a git submodule representing the custom chromecast receiever.
The hole repo for the receiver is: https://github.com/Mackenzie-Serres/benchcast-receiver

I update the version of benchcast-receiver used here to a stable version marked with a tag on the
gh-pages branch of that repo.

The gh-pages branch of that repo is the version that is hosted on github, see https://pages.github.com/
for an explanation of how to use them.

Cloning with git submodules
======
The android app uses a git submodule for the CastCompanionLibrary, which I forked from the official one on github,
and added some config files to.

This was to make it easier to track the original, and have a git controlled version of this library that I could
share among multiple Chomecast apps if needed.

When you clone the project initially you will get an empty directory for CastCompanionLibrary.

You must run two commands:
- "git submodule init" to initialize your local configuration file
- "git submodule update" to fetch all the data from that project and check out the appropriate commit listed in your superproject:

Then you should be able to open the project (android folder) in IntelliJ and build.
