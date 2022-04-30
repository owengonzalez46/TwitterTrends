FROM node:14

WORKDIR /usr/src/app/front-end

COPY package*.json ./

RUN npm install

RUN npm install -D tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/forms@latest @tailwindcss/typography

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

#CMD ["npm", "run", "build"]

#CMD ["npm", "run", "start"]