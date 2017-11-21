# Galen Framework


## Useful Links

- http://galenframework.com/docs/getting-started-configuration/
- http://galenframework.com/docs/reference-working-in-command-line/
- http://galenframework.com/docs/reference-galen-spec-language-guide/


## Installation Instructions (Windows)

- Ensure [Java 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) or greater is installed


## Example Commands

### Run the complete suite

Open command prompt in Cwel project root, then run one of the following commands.

``` cmd
gulp cwel-test-run-visual
```

#### Optional Parameters

- `--open-report`: Opens the generated html report in the browser automatically after the tests have finished.

### Run an individual test

Open command prompt in Cwel root

``` cmd
npm run galen -- check Cwel/Src/Test/visual/specs/cwel-grid.gspec --url http://docs.cwel.local/playground/sandbox/grid --size 1280x800 --htmlreport Cwel/.tmp/Test/visual/reports/html
```

#### Parameters

- `--url`: URL against which to run tests.
- `--size`: Viewport size in which to run tests.
- `--htmlreport`: Location in which to dump the html report.

#### Optional Parameters

- `--testngreport`: Location in which to dump the ngtest report.
