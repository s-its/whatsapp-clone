# whatsapp-clone

## 🚀 Run the Application locally with mongodb

To run the application, follow these steps:

1. Starting mongoDb and mongo-express using docker-compose:
   ```bash
   cd local-setup
   docker compose up -d    
   # list of servicess 
   1 . mongodb server
   2  . mongo express / it is use for conecting mongodb via web/browser
   3. mine.io / it is use for local s3 bucket  
   
2. download and install yarn module 
   ```bash
   cd Backend
   npm install -g yarn
   yarn install
   yarn dev # server will start on nodemon mode


   
