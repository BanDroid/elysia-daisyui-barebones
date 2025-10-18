{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  idx.workspace.onCreate = {
    bun-setup = "curl -fsSL https://bun.sh/install | bash && /home/user/.bun/bin/bun install";
    # files to open when the workspace is first opened.
    default.openFiles = [ "src/index.ts" ];
  };
  idx.extensions = [
    "esbenp.prettier-vscode"
    "dbcode.dbcode"
    "pkief.material-icon-theme"
    "prisma.prisma"
  ];
}