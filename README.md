# whatsapp-clone

## 🚀 Run the Application locally with mongodb

#### Prerequisite

- Install node js doc [node](https://nodejs.org/en/download/package-manager)
- Install yarn / npm `npm install -g yarn`
- install docker / docker compose in your machine [how to install im windows recording](https://youtu.be/P5kuR4kAzWo?si=QdbX3AE4dzTlf8nl)

To run the application, follow these steps:

1. Starting mongoDb, mongo-express and minIO using docker-compose:
   ```bash
   cd local-setup
   docker compose up -d
   ```
   - mongoDb is database container
   - mongo-express is mongo client to connect mongodb in browser.
   - minIo container is lightweight S3 bucket server solution to store file and video
   
2. Backend server start on port 5000
   ```bash
   cd Backend
   yarn install
   yarn dev # server will start on nodemon mode
   ```

3. frontend server start on port 3000
   ```bash
   co frontend
   yarn install
   yarn start
   ```

<!-- for image build  -->

build image : docker build -t <filename>:<tagnumber> .

   
