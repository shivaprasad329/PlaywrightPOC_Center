﻿# PlaywrightPOC_Center
----------------------

Configure globalSetup and globalTeardown

Step -1 : Create the New Folder Called "config" with in the "Project Structure"
Step -2 : Create the "global-setup.js" file under the "Config" Folder
Step- 3 : Add the code in a "Playwright.config.js"
           globalSetup: require.resolve("./config/global-setup.js"),
           globalTeardown: "./config/global-teardown.js",
 
