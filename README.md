# calvinhacks2020

# What is Food Sleuth?

Food Sleuth is an ingredient analysis tool for modern food.

According to the U.S. Centers for Disease Control 6 in 10 American adults have some kind of chronic disease (like heart disease, and diabetes), and 4 in 10 Americans have more than one!

At the same time, more and more medical research is showing a causal link between these diseases and people’s diets.

It turns out that the saying “You are what you eat,” is literally true!

As a result, tens of millions of American consumers are trying to make healthier choices about what they eat every day. But here’s the problem: even after reading the ingredients on the labels, (you know, all those long unpronounceable chemical names) most consumers STILL don’t know what they’re eating! (or whether it’s healthy or not).

Even worse, many foods have natural-sounding ingredients (like canola oil, and cane sugar) that aren’t good for you either.

Food Sleuth will solve this problem by letting consumers know exactly what is in their food, and whether or not they should be eating it… or avoiding it!

Food Sleuth works by scanning the barcode (UPC Code) on the back of your food items, or, if a barcode is unreadable or not present, the logo and product name right off the package, in order to analyze the ingredients for you. You get an analysis of each ingredient that could be bad, and what category it falls under.

# Using Food Sleuth

You can visit our live demo at [Insert link here].

The first thing that you will be greeted with is a request to access your webcam! We use your webcam to scan UPC codes on food products, as well as using Machine Vision to read logos and product names.

Once you give permission, you will see a picture of what your camera is seeing on your screen. Go ahead and place a UPC code or product name as large as you can in the center of the picture. Then, tap or click on the picture, and our app gets to work! If it is a UPC code, we will attempt to scan it automatically. If your food's barcode code scanned successfully, then you will be greeted with the ingredient analysis, if it doesn't you will be prompted to analyze the picture for text, or try again, in order for Food Sleuth the determine your product.

Once we know the product, you will see the various categories that we analyze your food with. Each will have a number next to it. That number is the number of ingredients we flagged under that category, such as being an added sugar or being considered a toxin by the EU. You can click on any category to see which specific ingredients were flagged.

On the upper left, you can see a settings button. There you can adjust which categories we will analyze for you. Don't care if your food has nuts? We won't flag it.

To get back to the camera screen, click the camera button on the lower right, and start the process again.

# Building and Installing
First, clone or download the project to your local machine.

Then, move to `front-end`

> cd front-end

From there, you can use the following React commands to run the app locally.

## Available Scripts
In the project directory, you can run:

### npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

# Contributors:

[https://github.com/NathanDimmer/calvinhacks2020/blob/master/CONTRIBUTORS.md]
