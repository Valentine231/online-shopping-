
export default function handler(req, res) {
    res.status(200).json({ products: [{ id: 1, name: "Product 1" }, { id: 2, name: "Product 2" }] });
  }
  