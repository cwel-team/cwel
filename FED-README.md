# Front-End Build Instructions

## Dependencies

- [Node v6.11.3](https://nodejs.org/en/download/)
- [Chocolatey](https://chocolatey.org)
- [Nuget CLI](https://chocolatey.org/packages/NuGet.CommandLine)

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

Cwomponents are Components, Patterns, or Services that are used to build CWEL
components or patterns. Services are Angular services.

- gulp create
  - _follow instructions on screen_
- gulp watch

All front-end cwomponent files are found in `Cwomponents/{type}/{name}`
directory. JavaScript is in a `.es` file, and CSS is in a `.scss` file.

**Note:** All view models for components or patterns are found in the
`Cwo.Core/ComponentViewModels` or `Cwo.Core/PatternViewModels` directories,
respectively. To build these you can run `gulp build-csharp`.
