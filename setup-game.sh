#!/bin/sh

# Function to display a warning message and exit
display_warning_and_exit() {
  echo "$1"
  exit 1
}

curl "http://localhost:5173/" -s  > /dev/null || display_warning_and_exit "WARNING: hace falta que el front esté corriendo!"
curl "http://127.0.0.1:8000" -s > /dev/null || display_warning_and_exit "WARNING: hace falta que el back esté corriendo!"

# If both curl commands succeed, continue with the rest of the script
# This will open a browser with N tabs, one for each player
# You can define amount of players in a constant on tests/
# The script will automatically log all players into the game
npx playwright test tests/ --headed
