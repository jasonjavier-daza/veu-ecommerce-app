

# Vue E-commerce App

In this first version, the administrative part of the e-commerce site is being implemented. The main objective is to have an administration panel that allows you to manage all the information necessary for the store's operation.

The main features included are:

Product Management:
Create, edit, list, and delete products that will be available in the store.

Brand Management:
Manage the brands to which the products belong.

Category Management:
Organize products into categories for easier navigation.

User Management:
Control which users have access to the administrative panel.

These sections lay the foundation for the application, allowing for the subsequent implementation of the public part of the store, where customers can view and purchase products.

## Project Structure

```
vue-ecommerce-app
├── src
│   ├── assets                # Static assets like images and fonts
│   ├── components            # Vue components for various functionalities
│   ├── views                 # Views that use components to create pages
│   ├── router                # Vue Router configuration
│   ├── store                 # Vuex store for state management
│   ├── App.vue               # Root component
│   └── main.js               # Entry point of the application
├── tailwind.config.js        # Tailwind CSS configuration
├── package.json              # Project metadata and dependencies
├── README.md                 # Project documentation
└── vite.config.js            # Vite configuration
```

## Features

- **User Authentication**: Users can register and log in to their accounts.
- **Product Browsing**: Users can view a list of products and detailed information about each product.
- **User Profile Management**: Users can view and update their personal information and view order history.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/jasonjavier-daza/veu-ecommerce-app.git
   ```

2. Navigate to the project directory:
   ```
   cd vue-ecommerce-app
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Technologies Used

- Vue.js
- Vue Router
- Vuex
- Tailwind CSS
- flowbite-vue
- Vite

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.