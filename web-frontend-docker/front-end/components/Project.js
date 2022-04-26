import React from 'react'

export const Project = () => {
    return(
<div class="pt-16 bg-white overflow-hidden">
  <div class="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
  </div>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-7xl mx-auto">
      <h1>
        <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-sky-700 sm:text-4xl">Twitter Trends - Overview</span>
      </h1>
      <p class="mt-8 text-xl text-gray-500 leading-8 text-center">Ever want to know what was trending in time a couple weeks ago and what was said over twitter during that time frame? Twitter Trends allows you to do just that. Twitter Trends was created over a couple weeks as a project for our 5493 Computer Science Graduate Class. Our database was spun up via a Postgres Docker Container early April 2022 to begin aggregating data. It uses Twitter's API to see what's trending every thirty minutes, then collecting the most popular tweets using the Python library Twint. Running this as often as we do allows us to collect close to 20 megabytes per run. This eventually, is called by the user on our frontend website via a table.</p>
    </div>
    <div class="bg-white overflow-hidden">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
      <div>
        <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-sky-700 sm:text-4xl">Project Architecture</h3>
      </div>
    </div>
    <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
      <div class="lg:row-start-1 lg:col-start-2">
        <div class="text-base mx-auto max-w-prose lg:max-w-none">
          <figure>
            <div class="aspect-w-12 aspect-h-7 lg:aspect-none">
              <img class="rounded-lg shadow-lg object-cover object-center" src="../diagram.png" alt="" width="1252" height="795"/>
            </div>
          </figure>
        </div>
      </div>
      <div class="mt-8 lg:mt-0">
        <div class="text-base max-w-prose mx-auto lg:max-w-none">
          <p class="text-lg text-gray-500">Our environment contains a content distribution network, virtual firewall, and 4 Docker containers in two Ubuntu servers. These Docker containers are a Flask Python API endpoint, a Postgres Docker container, a ReactJS NextJS container, and a Python container that reaches out to Twitter's API v2 endpoint and then passes the trending topics in each state over to Twint for the Tweet scraping. The CDN is run through Cloudflare, which handles DNS, TLS 1.3 encryption, bot protection, DDoS protection and masks our servers public IP addresses. Our virtual firewall in Digital Ocean's environment only allows connections from Cloudflare and connectivity between the two Ubuntu Servers.</p>
        </div>
        <div class="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
          <p>When a user logs onto twittertrends.app, Cloudflare establishes a secure connection and the ReactJS container returns the user experience. Simultaneously, it makes user requests to the Flask API server at api.twittertrends.app. This populates the trend table, tweet tables, and the database statistics at the bottom of the page. </p>
        </div>
      </div>
    </div>
    <div>
        <h3 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight lg:pt-6 text-sky-700 sm:text-4xl">Database and Scraping</h3>
      </div>
    <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none">
        <p>Every thirty minutes via a cronjob, our Tweet scraper container reaches out to the official Twitter API and collects the current top ten trends from each state and the United States as a whole. Once collected, it populates a "trends table" within the Postgres database living in a Docker container. This data gets re-used in Twint. Twint or Twitter Intelligence Tool is a Python library that can scrape Twitter's website outside of Twitter's official API.</p>
        <p>The reason we use Twint is because Twitter's API only allows for 900 calls every 15 minutes whereas we need to make close to 55,000 calls every thirty minutes. Twint gets the current trends from our Postgres database and begins scraping for the top 100 most popular tweets based on the trend and the locality of where its trending. We collect 100 tweets per trend: with 10 trends per state by 50 states, that's 50,000 tweets. This then gets inserted back into the Postgres database in a table called "tweets table". Each run allows for close to 20 megabytes of data. These tweets and trends are then called by the user via the ReactJS frontend in our Flask API.  </p>
</div>
</div>
</div>
  </div>
</div>
    )
}
