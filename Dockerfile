FROM node

WORKDIR /app

COPY package*.json ./
COPY . .

# COPY prisma ./prisma/


RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]