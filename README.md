# D365 - Trial Expiry Message
Solution to show the expiry date in the header of a trial environment.

![Banner image](src/banner.png)


## Overview
The solution piggybacks on the `msdyn_LoadNPSSurvey.js` file that is loaded on every page.

This ensures the trial expiry message code will also run on every page.


## Removal
Uninstalling the managed solution will remove the message and revert `msdyn_LoadNPSSurvey.js` back to the previous state.


## Building the solution
- Open a powershell window at the root of the project directory
- Run `.\scripts\build.ps1` to build the solution


## Cleaning the solution
- Open a powershell window at the root of the project directory
- Run `.\scripts\clean.ps1` to clean all build files
