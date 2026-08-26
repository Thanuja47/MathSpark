
# Remove informal emojis from all app and component files (PowerShell v2 compatible)
$files = Get-ChildItem -Path "app","components" -Recurse -Include "*.js" | Where-Object { !$_.FullName.Contains("node_modules") }

$replacements = @(
  @{ Old = "🚀 Enroll";   New = "Enroll" },
  @{ Old = "🚀 ";         New = "" },
  @{ Old = "🎉";          New = "✅" },
  @{ Old = "🔄 Resend";   New = "Resend" },
  @{ Old = " 🎉";         New = "" },
  @{ Old = " 🚀";         New = "" },
  @{ Old = "🏆 ";         New = "" },
  @{ Old = " 🏆";         New = "" }
)

foreach ($file in $files) {
  $lines = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  $changed = $false
  foreach ($r in $replacements) {
    if ($lines.Contains($r.Old)) {
      $lines = $lines.Replace($r.Old, $r.New)
      $changed = $true
      Write-Host "  [$($r.Old)] -> [$($r.New)] in $($file.Name)"
    }
  }
  if ($changed) {
    [System.IO.File]::WriteAllText($file.FullName, $lines, [System.Text.Encoding]::UTF8)
    Write-Host "UPDATED: $($file.Name)"
  }
}

Write-Host "`nDone!"
