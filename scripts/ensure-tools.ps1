if (!(Test-Path .\Tools\CoreTools)) {
    Write-Host "Tools downloading..."
    & .\scripts\get-tools.ps1
    Write-Host "Tools downloaded"
}
else {
    Write-Host "Found tools"
}