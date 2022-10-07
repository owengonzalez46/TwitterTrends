<p align="center">
  <a href="https://twittertrends.owengonzalez.com">
    <img src="https://twittertrends.owengonzalez.com/logo.png" height="128">
    <h1 align="center">TwitterTrends</h1>
  </a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/next">
    <img alt="" src="https://img.shields.io/npm/v/next.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Python version" href="https://www.python.org">
    <img alt="" src="https://img.shields.io/badge/python-v3.6+-blue.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

## About
Twitter Trends is a project created for our 5493 Computer Science Graduate Class. It allows a user to aggregate data from Twitter using Twitter's API and Twint and then display it to a user frontend in a tabular format.

## How It Works
Every thirty minutes via a cronjob, our Tweet scraper container reaches out to the official Twitter API and collects the current top ten trends from each state and the United States as a whole. Once collected, it populates a "trends table" within the Postgres database living in a Docker container. This data gets re-used in Twint. Twint or Twitter Intelligence Tool is a Python library that can scrape Twitter's website outside of Twitter's official API.

The reason we use Twint is because Twitter's API only allows for 900 calls every 15 minutes whereas we need to make close to 55,000 calls every thirty minutes. Twint gets the current trends from our Postgres database and begins scraping for the top 100 most popular tweets based on the trend and the locality of where its trending. We collect 100 tweets per trend: with 10 trends per state by 50 states, that's 50,000 tweets. This then gets inserted back into the Postgres database in a table called "tweets table". Each run allows for close to 20 megabytes of data.

The webfront end is written in ReactJS/NextJS which compiles HTML and CSS components. This allows us to write a piece of the webpage once, then call it in different pages without re-writing code. A good example of this is the navigation bar, the database statistics, and the footer. Within the Javascript, we make the calls over to the Flask server which is in charge of returning data.

The Flask server is an API endpoint that we use to return the data collected in the Postgres database to the user. The endpoints that are publicly available through GETs are:

## Flask API Calls
`/database-size` - Returns the size of the database in a KB/MB/GB/TB readable format.

`/trends-count` - Returns the number of trends in the database.

`/tweets-count` - Returns the number of tweets in the database.

`/get-time`     - Returns the last time that the scraping was run successfully.

`/current-top-trends` - Returns the top trends of the United States in the current hour.

`/top-trends` - Returns the top trends based off of a specified date, time, AND state.

`/top-tweets` - Returns the top tweets based off of a specified dateTime, state, AND trendName.

## Getting Started
Remove all instances throughout the project of twittertrends.app and convert them to either localhost or the endpoint DNS that you will be using.

### Postgres Database
Inside the `postgres-docker` directory you will find a `docker-compose.yaml`. Here you will need to modify what ports your database container you will be running under and the `POSTGRES_USER` and `POSTGRES_PASSWORD`. Keep this as you will be modifying python scripts soon. To bring up the docker container you must have `docker-compose` installed. Issue `docker-compose up -d` to start the docker container in a daemonized process. Connect to your database and make two tables called `trends` and `tables` using the following queries:

- `CREATE TABLE trends(
  uuid VARCHAR(255),
  datestamp DATETIME,
  state VARCHAR(255),
  trendNumber INT,
  trendName VARCHAR(255),
  PRIMARY KEY(uuid)
);`
- `CREATE TABLE tweets(
  uuid VARCHAR(255),
  datestamp DATETIME,
  state VARCHAR(255),
  trendName VARCHAR(255),
  tweetNumber INT,
  username VARCHAR(255),
  tweet TEXT,
  tweetLink TEXT,
  PRIMARY KEY(uuid)
);`

To protect your data on the database, you should create a service account to be accessed from the Flask API endpoints. This isn't necessary as you can use the administrative account created in the `docker-compose.yaml` although it MAY be possible for someone to either `DROP ` or `TRUNCATE` your tables. This account can be created via the following queries:
- `CREATE LOGIN accountgoeshere WITH PASSWORD = 'passwordgoeshere'; USE schemagoeshere; CREATE USER accountgoeshere FOR LOGIN accountgoeshere;`
- `GRANT SELECT TO accountgoeshere`

### Twitter Scraping Scripts
Inside the `twitter-scraper` directory, you will only need to modify the `databaseManagement.py` script. The `databaseConnection` variable makes a psycopg2 call which creates a connector to the Postgres database. Here you will need to modify the `host` if you aren't running the database and the scraper on the same host, `port`, `user` and `password` if you have modified those in the `postgres-docker docker-compose.yaml` file. You may also need to change your `database` name depending on what you named the database.   

As we are using linux for this build, we setup a crontab to run our scraping python program. The crontab we used was `0,30 * * * * cd /twitter-scraper && python3 main.py`. This kicks off the `main.py` at 0 minutes and 30 minutes of every hour adding up to 48 runs per hour.

In `keys.py`, you will need to change the 4 variables there to the keys that were generated from your Twitter Developer account. Note: For this to work properly, you will need to have an Elevated Twitter account as you will need the extra API calls.

`sendingEmails.py` is a python script that uses Send Grid to send notifications of failures to your mobile phone/email address. For this to work properly, you will need to sign up for a Send Grid API account and then populate the `sendGridClient`, `from_email`, `subject`, and the `to_email`.

### Flask API Endpoint
Inside the `twitter-trends-backend` directory, modify the `databaseManagement.py` similarly to how we modified the  `databaseConnection` variable in the Twitter Scraping Scripts portion of the README. You may have to modify the `host` if you aren't running the database and the scraper on the same host, `port`, `user` and `password`. The `user` and `password` will be the administrative password if you didn't create a service account.

### ReactJS Frontend
The ReactJS portion of the project is fairly easy. Inside the `docker-compose.yaml` you may either need to change the port that it runs on as the Flask API endpoint `port80` or do as we did and run it on a separate host. We used Cloudflare in our production enviroment to route traffic between the website and the Flask API as they are both on port 80. Lastly, you will need to modify the components of `ServerStats.js `, `TrendTable.js`, and `TwitterTable.js`. The modifications that go in here are the `api.twittertrends.app` where they will need to be modified to either `localhost` or to your API's DNS endpoint.  

## Authors

- Diana Dimitriu ([@dimitriu96](https://twitter.com/dimitriu96))
- Owen Gonzalez ([@owengonzalez46](https://twitter.com/owengonzalez46))
