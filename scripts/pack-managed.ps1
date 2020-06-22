Tools/CoreTools/SolutionPackager.exe `
    /action: Pack `
    /zipfile: ".\build\$($solutionName)_$($solutionVersion)_managed.zip" `
    /folder: $solutionFolder `
    /errorlevel: Warning `
    /nologo `
    /map: "$($solutionFolder)\map.xml"`
    /PackageType: Managed

Write-Host "Packed managed solution: $($solutionName) ($($solutionVersion))"