FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY . .
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENV PORT=5662
EXPOSE 5662
CMD ["npm", "start"]

