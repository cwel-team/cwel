# Front-End Build Instructions

## Dependencies

- [Node v8.9.0](https://nodejs.org/en/download/)
- [Chocolatey](https://chocolatey.org)
- [Nuget CLI](https://chocolatey.org/packages/NuGet.CommandLine)

**Note:** If using Node Version Manager for Windows (NVM4W), ensure you have at least v1.1.6 to avoid "The filename or extension is too long" errors. See [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases) for the latest release.

### Node

Install Node using their installer, obtainable from their [downloads page](https://nodejs.org/en/download/).

### Chocolatey

Install Chocolatey by running the command below in a shell with administrative permissions.

```
C:/> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

### NuGet

Install NuGet's command line script using Chocolatey:

```
C:/> choco install nuget.commandline
```

## Build Project

- git clone https://cwidestuessy@bitbucket.org/onlinemarketingdev/wrpepiserver.git
- npm install
- nuget restore
- gulp build
- gulp build-csharp

## Create Cwomponent

Cwomponents are Components, Patterns, or Services that are used to build CWEL components or patterns. Services are Angular services.

- gulp create
  - _follow instructions on screen_
- gulp watch

## Update NuGet Package

**Note:** This is for pre 0.1.0 versions only whilst the magical auto-builder thingy gets made.
1. Open `Cwel/Cwel.nuspec` and bump the version number (`<version>0.0.X</version>`)
2. Create package (run `nuget pack cwel.nuspec` from `Cwel/`)
3. Push package to local NuGet server (run `nuget push Cwel.0.0.X.nupkg -source http://omc-tfs-301/packages/nuget -apikey key` from `Cwel/`) ensuring that the version number is bumped inline with Step 1
4. Open up project in Visual Studio, right-click the solution (e.g. `Cwo.Corporate.Web`) and select `Manage NuGet Packages...`
5. Click `Updates` and update the package
6. Rebuild solution
7. Commit and push changes to reflect version bump

All front-end cwomponent files are found in `Cwomponents/{type}/{name}` directory. JavaScript is in a `.es` file, and CSS is in a `.scss` file.

**Note:** All view models for components or patterns are found in the `Cwo.Core/ComponentViewModels` or `Cwo.Core/PatternViewModels` directories, respectively. To build these you can run `gulp build-csharp`.
