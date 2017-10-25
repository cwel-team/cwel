$AssemblyInfoPath = "Cwel\Properties\AssemblyInfo.cs";

Import-Module Cwo.Build

function Help {
    "Create a release branch and bump the version number`n"
    ".\release.ps1 [VersionNumber] [BranchName]`n"
    "   [VersionNumber]     The version number to set, for example: 1.1.0"
    "   [BranchName]        The Branch Name for the release, for example: release/release-12`n"
}

if ($args -ne $null) {
    $Version = $args[0]
    $BranchName = $args[1]
    if (($Version -eq '/?') -or ($Version -notmatch "[0-9]+(\.([0-9]+|\*)){1,3}")) {
        Help
        exit 1;
    }
} else {
    Help
    exit 1;
}

Create-Release $Version $BranchName $AssemblyInfoPath