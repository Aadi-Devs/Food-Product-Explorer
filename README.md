🍽️ Food Product Explorer

A responsive web application that allows users to search, filter, and view detailed information about food products using the OpenFoodFacts API. Built using ReactJS and TailwindCSS.

📌 Features

🔍 Homepage

Displays a list of food products fetched from the OpenFoodFacts API

Shows key product information:

✅ Product Name

🖼️ Image

🗂️ Category

🧾 Ingredients (if available)

🧪 Nutrition Grade (A to E)

Includes pagination using infinite scroll or load more

🔎 Search Functionality

Users can search for food products by name

Filters product list based on the search query

Dynamic and real-time filtering

📦 Barcode Search

Users can search for a product by entering its barcode

Displays detailed product info based on valid barcode

Uses API:https://world.openfoodfacts.org/api/v0/product/{barcode}.json

📂 Category Filter

Dropdown or sidebar allows users to filter products by category (e.g., dairy, beverages, snacks)

Categories fetched dynamically using:https://world.openfoodfacts.org/categories.jsonand products by:https://world.openfoodfacts.org/category/{category}.json

🔃 Sort Functionality

Allows sorting of products by:

Name: A-Z / Z-A

Nutrition Grade: Ascending / Descending

📄 Product Detail Page

On clicking a product, the user is taken to a detailed page with:

Product image

Full list of ingredients

Nutritional values:

Energy, Fat, Carbs, Proteins, Sugar, etc.

Labels: Vegan, Gluten-Free, Palm Oil Free (if available)

📱 Responsive Design

Fully mobile and desktop friendly using TailwindCSS

Ensures seamless browsing experience across devices

🧰 Tech Stack

Technology

Description

ReactJS

Frontend library for UI building

TailwindCSS

Utility-first CSS framework

OpenFoodFacts

Free food product database/API

React Router

For page navigation

Axios/Fetch

For making HTTP requests

React Context (optional)

For global state like filters

🔗 API References

Feature

Endpoint Example

Products by category

https://world.openfoodfacts.org/category/beverages.json

Search by name

https://world.openfoodfacts.org/cgi/search.pl?search_terms=milk&json=true

Product by barcode

https://world.openfoodfacts.org/api/v0/product/737628064502.json
