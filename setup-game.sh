#!/bin/sh

# This will open a browser with 4 tabs, one for each player
# the script will automatically log all players into the game
npx playwright test tests/ --headed
