# Next Gen Code Revolution

Welcome to Countrywide's next generation code-base. Here is where technology
bleeds from the swift katana that is its development team.

## Setup Instructions

Follow these instructions if depending on your role in the team.

- [Front-End Zen warrior](./FED-README.md)



## Building CWEL and Packaging Nuget

dotnet build Cwel\Cwel.csproj --configuration <Release|Debug> /p:PackageVersion=<Version(X.X.X)> /p:Version=<Version(X.X.X.X)> /p:PackageOutputPath=<Output Folder>

#### Example

`dotnet build Cwel\Cwel.csproj --configuration Release /p:PackageVersion=1.2.0 /p:Version=1.2.0.0 /p:PackageOutputPath=dist`