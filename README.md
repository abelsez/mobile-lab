# mobile-lab — phone is the orchestrator, cloud is the muscle

The phone (Termux) holds the credentials, the notes and the decision loop. Anything that needs
RAM, root, a JVM, or a second device runs here instead.

| job | where | why |
|---|---|---|
| full `jadx` decompile of an APK | GitHub Actions `decompile.yml` | needs ~4 GB heap; phone has 3.7 GB total |
| `androguard` string/xref sweeps, `apktool d -s`, dex→smali dumps | Actions, same workflow | CPU + disk |
| runtime Android PoC (adb: broadcasts, logcat, content query) | Actions `emulator.yml` | no second device available |
| PoC pages, callback endpoints, redirectors | Netlify (`netlify/functions/callback.js`) | stable HTTPS URL that logs hits |

## Trigger from the phone

```bash
~/bin/gh-lab decompile <apk-url>        # waits, downloads artifacts to ~/targets/<name>/ci
~/bin/gh-lab dynamic <apk-url> <script> # script = adb commands, run inside the emulator
```

## Known limit
GitHub's ARM runners have no nested virtualisation, so the emulator runs **x86_64** only. An
arm64-only APK (e.g. a phone-signed standalone build) cannot be installed there — grab the
x86_64 split/variant of the app, or keep the arm64 build for the phone.
