import Order from "../controller/order.js";
import PDFDocument from "pdfkit"

export const createOrder = async (req, res) => {
  try {
    const { productId, quantity, customerName, customerNumber, address, status } = req.body;
    if (!productId || !quantity || !customerName || !customerNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({ productId, quantity, customerName, customerNumber, address, status: status || 'Pending' });
    await newOrder.save();


    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=order_${newOrder._id}.pdf`);


    doc.pipe(res);

    doc.fontSize(20).text('Order Confirmation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${newOrder._id}`);
    doc.text(`Product ID: ${newOrder.productId}`);
    doc.text(`Quantity: ${newOrder.quantity}`);
    doc.text(`Customer Name: ${newOrder.customerName}`);
    doc.text(`Customer Number: ${newOrder.customerNumber}`);
    doc.text(`Address: ${newOrder.address}`);
    doc.text(`Status: ${newOrder.status}`);
    doc.text(`Order Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.text('Thank you for your order!', { align: 'center' });


    doc.end();

  } catch (error) {
    console.error("Error creating order or generating PDF:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('productId');
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: error.message });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.body;
        const order = await Order.findById(id).populate('productId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    }
    catch (error) {
        console.error("Error fetching order by ID:", error);
        res.status(500).json({ message: error.message });
    }   
}

export const updateOrderStaus = async (req,res) =>{
    try {
        const { id, status } = req.body;
        if (!id || !status) {
            return res.status(400).json({ message: "ID and status are required" });
        }
        const updatedOrder = await Order.findByIdAndUpdate(id,  { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }       
        res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: error.message });
    }
}

export const cancelOrder = async (req, res) => {
    try{
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.cancelled = true;
        await order.save();
        res.status(200).json({ message: "Order cancelled successfully", order });
    }
    catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: error.message });
    }
}