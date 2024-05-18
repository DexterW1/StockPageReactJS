# Stock Market Platform

Welcome to the Stock Market Platform! This project is a dynamic and user-friendly application designed to provide near real-time information and tools for tracking various stock market indices and individual stocks. It features live updates on NASDAQ, S&P 500, Dow Jones indices, market news, trending symbols, and comprehensive functionalities for stock analysis and monitoring.

## Features

- **Market Indices:** Real-time tracking and display of NASDAQ, S&P 500, and Dow Jones indices.
- **Live Market News:** Up-to-date news from the financial world, keeping users informed about the latest market trends.
- **Trending Symbols:** Monitor trending symbols to stay on top of the rapidly changing market.
- **Comprehensive Stock Search:** Explore and search for stocks, access OHLCV (Open, High, Low, Close, Volume) data, and view detailed information about individual stocks.
- **Custom Watchlists:** Users can create and manage personalized watchlists, keeping track of stocks of interest.

## Technologies Used

- **Front End:** Developed using React, providing a dynamic and responsive user interface.
- **Back End:** Powered by Node.js, ensuring smooth communication and handling of requests.
- **API Integration:** Utilizing two diverse APIs to aggregate and display real-time market data, news, and stock information.
  
## Key Functionalities

- **Data Persistence:** The platform ensures seamless data persistence, safeguarding user information even upon tab closure.
- **User-Friendly Interface:** A clean and intuitive design to enhance the user experience and accessibility.

## Installation and Usage

To run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the `client` and `server` directories and install dependencies using `npm install`.
3. Navigate to 'client/src/components/(TopBar.js and MainContent.js)' change the const url to 'http://localhost:5003/'
4. Create a .env file in the root of `server` directory and add API_KEY = (finnhub api key) https://finnhub.io/
5. Start the backend server using `npm start` in the backend directory.
6. Start the frontend server using `npm start` in the frontend directory.

## Live Demo

This project is hosted on Vercel. You can access the live version at [Stock Market Platform - Live Demo](https://stock-page-client.vercel.app/).

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the API providers who made this project possible.
