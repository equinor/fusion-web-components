# fdev setup

## Prerequisites

Install fdev as a .NET global tool:

```bash
dotnet tool install --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools
```

Update to latest:

```bash
dotnet tool update --global --add-source "https://statoil-proview.pkgs.visualstudio.com/Fusion%20-%20Packages/_packaging/Fusion-Public/nuget/v3/index.json" fusion-devtools
```

Authenticate before first use:

```bash
fdev login
```
