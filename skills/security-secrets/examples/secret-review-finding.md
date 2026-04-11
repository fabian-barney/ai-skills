# Example Secret Review Finding

High - `.github/workflows/release.yml`: the current change inlines a bearer
token in workflow configuration, which risks secret exposure in source control
and CI logs. Move the value to the platform secret store, remove the tracked
secret from the file, and rotate the exposed token before merge.
