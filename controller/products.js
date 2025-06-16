import Product  from "../models/productmodels.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error });
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error });
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: error });
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price ,id } = req.body;
    
    if (!id || !name || !description || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error });
  }
}

export const deleteProduct = async (req,res) =>{
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}