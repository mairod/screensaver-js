echo "Building Web"
cd ./Sources
npm run build
cd ..
echo "Exporting OSX Screen saver"
cp -R ./Sources/build/ ./OSX/Web.saver/Contents/Resources/
echo "Exporting Windows Screen saver"
cp -R ./Sources/build/ ./Windows/screen.nw/
