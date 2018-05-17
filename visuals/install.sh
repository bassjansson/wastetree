#!/bin/bash

# Install and Link OpenSSL
if [[ $1 != "linux" && $1 != "macosx" ]]
then
echo "Please enter a valid platform name as first argument. Available platforms:"
echo "- linux"
echo "- macosx"
exit
fi

if [[ $1 == "linux" ]]
then
echo "Installing and linking OpenSSL for Linux..."
sudo apt install libssl-dev
export CPPFLAGS=-I/usr/include/openssl
export LDFLAGS=-L/usr/lib/openssl
fi

if [[ $1 == "macosx" ]]
then
echo "Installing and linking OpenSSL for MacOSX..."
brew install openssl
export PATH="/usr/local/opt/openssl/bin:$PATH"
export CPPFLAGS=-I/usr/local/opt/openssl/include
export LDFLAGS=-L/usr/local/opt/openssl/lib
fi

# Install Dependencies
npm install --unsafe-perm=true

# Rebuild Dependencies for Electron
./node_modules/.bin/electron-rebuild

# TODO: This install/build script doesn't work anymore on MacOSX 10.13.3 (High Sierra)
# Tried different version of node, electron & the other libraries, still doesn't work
# According to the logs it seems to be an issue with 'uws', a dependencie of socket.io
# Strange thing is, my previous builds do work, something got updated and broke it
# A possible solution found is to replace socket.io with an older version or delete uws
