{
  description = "BlackBeetle Frontend - Nuxt 4 Application";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs@{ flake-parts, nixpkgs, devenv, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        devenv.flakeModule
      ];

      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];

      perSystem = { config, self', inputs', pkgs, system, ... }: {
        devenv.shells.default = {
          name = "blackbeetle-frontend";
          
          devenv.root =
            let
              devenvRootFileContent = builtins.readFile ./devenv.root;
            in
            pkgs.lib.mkIf (devenvRootFileContent != "") devenvRootFileContent;

          languages.javascript = {
            enable = true;
            package = pkgs.nodejs_22;
          };

          packages = with pkgs; [
            nodePackages.npm
            git
            lftp
          ];

          enterShell = ''
            echo "🪲 BlackBeetle Frontend Development Environment"
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            echo ""
            echo "Commands:"
            echo "  npm install    - Install dependencies"
            echo "  npm run dev    - Start development server"
            echo "  npm run build  - Build for production"
            echo ""
          '';

          scripts = {
            dev.exec = "npm run dev";
            build.exec = "npm run build";
            preview.exec = "npm run preview";
          };
        };
      };
    };
}
