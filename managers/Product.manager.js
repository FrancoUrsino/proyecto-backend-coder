import Product from "../models/product.model.js";

class ProductManager {
  async getProducts(options = {}) {
    const { limit = 3, page = 1, sort, query, category, minPrice, maxPrice, available } = options;

    const filter = {};

    if (query) {
      filter.title = new RegExp(query, "i");
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (available === "true") {
      filter.stock = { $gt: 0 };
    }
    return await Product.paginate(filter, {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      lean: true
    });
  }

  async getFilteredProducts(options = {}) {
    const { query, sort, category, minPrice, maxPrice, available } = options;
    const filter = {};
    if (query) filter.title = new RegExp(query, "i");
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (available === "true") filter.stock = { $gt: 0 };
    const sortOption = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    return await Product.find(filter).sort(sortOption).lean();
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id).lean();
    } catch (error) {
      console.error("Error obteniendo producto por ID:", error);
      return null;
    }
  }

  async addProduct(product) {
    return await Product.create(product);
  }

  async updateProduct(id, updatedFields) {
    return await Product.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductManager;
