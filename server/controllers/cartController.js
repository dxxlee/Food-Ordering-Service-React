const Cart = require("../models/cartModel");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "name price imageUrl"
    });

    if (!cart) {
      return res.json({ user: req.user.id, items: [] });
    }

    // const cartWithImages = {
    //   user: cart.user,
    //   items: cart.items.map(item => ({
    //     _id: item._id,
    //     product: item.product._id,
    //     name: item.product.name,
    //     price: item.product.price,
    //     amount: item.amount,
    //     imageUrl: item.product.imageUrl,
    //     desciption: item.product.desciption
    //   })),
    // };

    const cartWithImages = {
      user: cart.user,
      items: cart.items.map(item => ({
        _id: item._id,
        product: item.product,
        name: item.name,
        price: item.price,
        amount: item.amount,
        imageUrl: item.imageUrl,
        desciption: item.desciption
      })),
    };


    res.json(cartWithImages);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { productId, name, price, imageUrl, desciption } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product?.toString() === productId);

    if (existingItem) {
      existingItem.amount += 1;
    } else {
      cart.items.push({ product: productId, name, price, amount: 1, imageUrl, desciption });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    // Найти корзину пользователя и очистить её
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { items: [] } } // очищаем все элементы в корзине
    );
    res.json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
};


const decreaseProductQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex !== -1) {
      if (cart.items[itemIndex].amount > 1) {
        cart.items[itemIndex].amount -= 1;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error updating cart", error: err.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

const clearAllItemsFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Error clearing cart" });
  }
};

module.exports = {
  getCart,
  addProductToCart,
  clearCart,
  decreaseProductQuantity,
  removeItemFromCart,
  clearAllItemsFromCart
};
