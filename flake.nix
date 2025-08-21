{
  description = "blackbeetle-frontend dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        node = pkgs.nodejs-24_x;
      in {
        # expose a dev shell as expected by `nix develop`
        devShells = {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [ node git yarn ];
            shellHook = ''
              echo "Welcome to the blackbeetle-frontend dev shell!"
            '';
          };
        };
      }
    );
}
