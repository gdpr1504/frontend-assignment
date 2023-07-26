# Frontend Task Essentially AI

# Documentation:

## Steps to Implement Server Code:

1. Open app.js inside server folder.
2. Add axios.get method inside the app.post('/api/fetchStockData') 
3. For the above step we need api key which we can get from https://polygon.io/dashboard
4. Declare the api key in .env folder and access it in app.js file using process.env.key_name
5. Get stocksymbol and date from client side using req.body.
6. Pass the data to the axios.get method and access the required data from the response.
8. Install the required packages.
7. Make sure you run node app.js before running client side.

## Steps to Implement Client Code:

1. Inside Client folder,install Required packages using npm install.
2. In App.js, create a form which takes user input for stock symbol and date.
3. On submit, call the api using axios.post method.
4. When data is resulted store it in an usestate.
5. Display the data using the useState variable.
6. Added Loader.
7. Added Related CSS required for the code in App.css and import it.

## Steps to Run This Application

1. In one terminal, run the below commands:
   a. cd server
   b. node app.js
3. In another terminal, run the below commands:
   a. cd client
   b. npm start

## Optional tasks
1. Imagine this is a real world scenario which thousands of users use to get the historic data of a stock for a particular day, how would this product change in order to improve the UX.
   - By displaying graph view for the requested stock symbol based on period selected
2. What new features would you add in this product to increase it's utility for the end user.
   - Add period wise selection i.e week,month,year view of an stock symbol