Here’s a `README.md` for your bid management system:

```md
# Bid Management System

The **Bid Management System** is a MERN stack-based project that allows administrators to create products (property or vehicles) and manage bidding activities. Users can place bids on products, and the system tracks these bids to determine winners.

## Features

- **User Management**: Register, login.
- **Product Management**: Admins can create and list products (property or vehicle), with photo uploads.
- **Bidding System**: Users can place bids on products, with validation ensuring bids are higher than the starting price.
- **Bid Tracking**: Products are associated with bids through product references, rather than storing bids in the product schema.
- **Web Sockets**: User and admin will receive live notification when a new product is created and when a new bid is placed
- **API Endpoints**: RESTful API to manage users, products, and bids.

## Technologies Used

- **Frontend**: React.js ,chakra ui
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Image Upload**: Multer for handling product image uploads
- **Environment Variables**: Managed by dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aakashindoriya/cimetbid
   cd cimetbid/server

   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add the following variables:

   ```env
   PORT=8080
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:8080`.

## API Endpoints

### User Routes

- `POST /user/signup`: Register a new user.
- `POST /user/login`: User login.

### Product Routes

- `POST /product/create`: Create a new product (with image upload).
- `GET /product`: Fetch all products.
- `GET /product/:id`: Fetch a single product by ID.
- `PUT /product/bid-confirm`: confirm a bid on the product mark product sold
- `PUT /product/:id` : Update an existing product
- `Delete /product/:id` : Delete a product
### Bid Routes

- `POST /bid//:productId`: Place a bid on a product.
- `GET /bid/my-bids`: Fetch all bids placed by a user.
- `Delete /bid//:bidId`:Delete a bid by a user 
- 


## How Bids Are Handled

- Bids are stored in a separate **Bid** schema.
- Each bid references the `productId` of the product it belongs to.

## Folder Structure

```
|-- config/
    |-- connect.js          # MongoDB connection file
|-- models/
    |-- product.model.js    # Mongoose schema for products
    |-- bid.model.js        # Mongoose schema for bids
    |-- user.model.js       # Mongoose schema for users
|-- routes/
    |-- user.route.js       # Routes for user management
    |-- product.route.js    # Routes for product management
    |-- bid.route.js        # Routes for bid management
|-- index.js                # Main entry point for the application
|-- .env                    # Environment variables
|-- .gitignore              # Ignored files
|-- package.json            # Dependencies and scripts
```

