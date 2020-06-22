$solutionName = "trialexpirymessage"
$solutionFolder = ".\solution"
$solutionVersion = $([xml] $(Get-Content "$($solutionFolder)\Other\Solution.xml")).ImportExportXml.SolutionManifest.Version -replace "[.]", "_";

& .\scripts\ensure-tools.ps1
& .\scripts\pack-managed.ps1