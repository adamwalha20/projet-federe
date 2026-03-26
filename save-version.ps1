param (
    [Parameter(Mandatory=$false)]
    [string]$Message
)

# Ensure we are in a git repository
if (-not (Test-Path .git)) {
    Write-Error "Error: This script must be run from the root of a Git repository."
    exit 1
}

# Get message if not provided
if (-not $Message) {
    $Message = Read-Host "Enter a log message for this version"
}

if (-not $Message) {
    Write-Warning "No message provided. Aborting."
    exit 1
}

# 1. Update package.json version
Write-Host "Incrementing version in package.json..."
$packageJsonPath = "package.json"
$package = Get-Content $packageJsonPath | ConvertFrom-Json
$currentVersion = $package.version
$versionParts = $currentVersion.Split('.')
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]

# Increment patch version
$patch++
$newVersion = "$major.$minor.$patch"
$package.version = $newVersion
$package | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath

Write-Host "Version updated from $currentVersion to $newVersion"

# 2. Update CHANGELOG.md
Write-Host "Updating CHANGELOG.md..."
$changelogPath = "CHANGELOG.md"
$date = Get-Date -Format "yyyy-MM-dd"
$newEntry = @"

## [$newVersion] - $date
### Changed
- $Message
"@

Add-Content -Path $changelogPath -Value $newEntry

# 3. Git Operations
Write-Host "Committing and pushing changes..."
git add .
git commit -m "v${newVersion}: $Message"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Git commit failed."
    exit 1
}

git push
if ($LASTEXITCODE -ne 0) {
    Write-Error "Git push failed."
    exit 1
}

git tag -a "v${newVersion}" -m "$Message"
git push origin "v${newVersion}"

Write-Host "Successfully saved version $newVersion and pushed to GitHub."
