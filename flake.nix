{
  description = "iDIoT";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

      in rec {
        devShell = pkgs.mkShell {
          name = "iDIoT";
          packages = with pkgs; [
            go_1_20
            nodejs
            docker
            earthly
          ];
        };
      });

}
