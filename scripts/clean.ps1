$cleanDirectories = @(
    "build",
    "dist",
    "Tools"
)

foreach ($folder in $cleanDirectories) {
    if (Test-Path $folder) {
        Remove-Item $folder -Recurse
        Write-Host "Cleaned " $folder
    }
}

Write-Host "Cleaned project"