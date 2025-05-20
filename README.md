# AutoDeps

Automated GitHub workflow to detect and install project dependencies seamlessly. It scans your codebase, identifies required packages and libraries, and handles dependency installation effortlessly, streamlining your development setup and ensuring environment consistency across CI/CD pipelines and local builds.

## 🚀 Usage

```yaml
name: Install Dependencies
on: [push]
jobs:
  install-dependencies:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Dependencies
        uses: ./.github/actions/AutoDeps
        with:
          working-directory: './my-project'
          dry-run: false
```

## ⚙️ Inputs
- `working-directory` (optional): Directory to run the installation. Default is `.`.
- `dry-run` (optional): If true, lists dependencies without installing them. Default is `false`.

## 📦 Example Use Cases
- Automatically install npm dependencies for a project.
- Run in dry-run mode to list dependencies without installing.

## 💡 Author
Developed by Shubham Yadav.