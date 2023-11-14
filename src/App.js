import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Tomato Paste",
    price: 4,
    selected: false,
  },
  {
    id: 2,
    name: "Soy Milk",
    price: 8,
    selected: false,
  },
  {
    id: 3,
    name: "Coconut",
    price: 7,
    selected: false,
  },
  {
    id: 4,
    name: "Carrot",
    price: 1,
    selected: false,
  },
  {
    id: 5,
    name: "Cupcake",
    price: 2,
    selected: false,
  },
];

function App() {
  const [showAddItem, setShowAddItem] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [selectedItems, setSelectedItems] = useState([]);

  function handleSelect(product) {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, selected: !p.selected } : p
    );

    setProducts(updatedProducts);

    const selectedTrueItems = updatedProducts.filter((p) => p.selected);
    setSelectedItems(selectedTrueItems.map((p) => p.price));
  }

  function handleShowAddForm() {
    setShowAddItem((showAddItem) => !showAddItem);
  }

  function handleAddProduct(product) {
    setProducts((products) => [...products, product]);
    setShowAddItem(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ProductList products={products} onSelect={handleSelect}></ProductList>

        {showAddItem && <AddItemForm onSetProducts={handleAddProduct} />}

        <Button onClick={handleShowAddForm}>
          {showAddItem ? "Close" : "Add Item"}
        </Button>
      </div>
      <BillCalculator selectedItems={selectedItems} />
    </div>
  );
}

function ProductList({ products, onSelect }) {
  return (
    <ul>
      {products.map((product) => (
        <Item product={product} key={product.id} onSelect={onSelect} />
      ))}
    </ul>
  );
}

function Item({ product, onSelect }) {
  const isSelected = product.selected;

  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
        <div>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
        <div>
          <Button onClick={() => onSelect(product)}>
            {product.selected ? "Remove" : "Select"}
          </Button>
        </div>
      </li>
    </div>
  );
}

function AddItemForm({ onSetProducts }) {
  const [name, setName] = useState("");
  const [priceOne, setPriceOne] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !amount || !priceOne) return;

    const id = crypto.randomUUID();

    const newProduct = {
      name,
      price: amount * priceOne,
      id: id,
      selected: false,
    };
    onSetProducts(newProduct);
  }

  return (
    <div>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🍅 Name</label>
        <input
          type="text"
          placeholder="tomato"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>❷ Amount</label>
        <input
          type="text"
          placeholder="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <label>💰 Price</label>
        <input
          type="text"
          placeholder="20"
          value={priceOne}
          onChange={(e) => setPriceOne(Number(e.target.value))}
        />
        <Button>Add</Button>
      </form>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function BillCalculator({ selectedItems }) {
  let bill = selectedItems.reduce((acc, curValue) => acc + curValue, 0);

  const [balance, setBalance] = useState("");

  function handleCalculate(e) {
    e.preventDefault();
    const total = balance - bill;

    if (total > 0) {
      setBalance(0);
      bill = 0;
      return alert(`You have £${total} left on your balance to spend.`);
    }
    if (total < 0)
      return alert(
        `You don't have enough money. Delete items worth of £${Math.abs(
          total
        )}.`
      );
    if (total === 0) return alert("All good! You can now place your shopping.");
  }

  return (
    <form className="form-split-bill" onSubmit={handleCalculate}>
      <h2>Calculate Your Bill</h2>

      <label>💰Bill value</label>
      <input type="text" disabled value={bill} />

      <label>🤑Your Balance</label>
      <input
        type="text"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
      />

      <Button>Calculate</Button>
    </form>
  );
}

export default App;
