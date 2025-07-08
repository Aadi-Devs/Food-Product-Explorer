const BASE_URL = 'https://world.openfoodfacts.org';

export const api = {
  // code for getting products with pagination
  async getProducts(page = 1, pageSize = 20) {
    try {
      const response = await fetch(
        `${BASE_URL}/cgi/search.pl?action=process&json=true&page=${page}&page_size=${pageSize}&sort_by=unique_scans_n`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Code for searching products by name
  async searchProducts(searchTerm, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&json=true&page=${page}&page_size=20`
      );
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Code fot getting product by barcode
  async getProductByBarcode(barcode) {
    try {
      const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`);
      const data = await response.json();
      
      if (data.status === 1 && data.product) {
        return data.product;
      }
      return null;
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
      throw error;
    }
  },

  // code for getting products by category
  async getProductsByCategory(category, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${encodeURIComponent(category)}.json?page=${page}&page_size=20`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // code for getting categories - now only returns 3 categories
  async getCategories() {
    return [
      'beverages',
      'dairy',
      'snacks'
    ];
  }
};