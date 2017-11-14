# Galen Framework ReadMe

## Useful Links

- http://galenframework.com/docs/getting-started-configuration/
- http://galenframework.com/docs/reference-working-in-command-line/
- http://galenframework.com/docs/reference-galen-spec-language-guide/

## Installation Instructions (Windows)

1. Ensure Java 1.8 or greater is installed
2. Run `npm install galenframework-cli chromedriver geckodriver -g` from an elevated command prompt (admin rights)
3. Add `C:\Program Files\nodejs\node_modules\galenframework-cli\bin\` to your PATH Environment variable (`System Properties -> Advanced -> Environment Variables -> Path -> Edit -> New` in Windows 10)
4. Test path has been added successfully by running `galen --version` from a command prompt

## Example Commands

npm run galen -- check galen/tests/cwel-grid.gspec --url http://localhost:3000/playground/sandbox/grid --size 1280x800 --htmlreport galen/reports
