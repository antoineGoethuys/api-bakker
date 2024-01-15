# Project Name

## Description

This is a RESTful API for a local bakery. Customers can use this API to view available products, place orders, and leave comments.

## Installation

1. Clone this repository to your local machine.
2. Run `npm install` to install all project dependencies.
3. Run `npm install -g nodemon` to install nodemon globally, if not already installed.

## Usage

To start the server, run `nnodemon`. The API will then be accessible at `http://localhost:8080`.

### Endpoints

- `GET /products`: Returns all available products.
- `POST /orders`: Allows customers to place an order. The request body should include the customer's details (name, address, etc.), the ordered products, and the total amount of the order.
- `POST /comments`: Allows customers to leave a comment. The request body should include the customer's details and the text of the comment.

## Data Models

- `Product`: Represents a product available for sale. Each product has a name, a description, a price, and an image.
- `Order`: Represents an order placed by a customer. Each order includes the customer's details, the ordered products, and the total amount of the order.
- `Client`: Represents a customer who can place orders and leave comments.

## Development

To contribute to this project, please follow these steps:

1. Fork this repository and clone your fork to your local machine.
2. Create a new branch for your feature or bug fix.
3. Make your changes in your branch.
4. Submit a pull request to the `main` branch of this repository.

## Resources Used

- [YouTube Playlist](https://www.youtube.com/playlist?list=PL8Azg5184hTAg-HoFByqlA43EmyREWCge)
- GitHub Copilot
- ChatGPT

## Author

[Your GitHub Username](https://github.com/yourusername)

## License

This project is licensed under the MIT License.
