import { addItem, getAllItems, getItemById, setQuantity, deleteItemById } from '../module/stock.js';

export async function addStock(req, res) {
    const { name, quantity } = req.body;

    if (req.role !== 'adder') {
        return res.status(403).json({ message: "Only an adder can add items" });
    }

    const id = await addItem(name, quantity);
    res.status(201).json({ message: "Item added", id });
}

export async function getStock(req, res) {
    const items = await getAllItems();
    res.json(items);
}

export async function removeStock(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    if (req.role !== 'remover') {
        return res.status(403).json({ message: "Only a remover can remove items" });
    }

    const item = await getItemById(id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    if (amount > item.quantity) {
        return res.status(400).json({ message: "Not enough stock" });
    }

    const newQuantity = item.quantity - amount;
    let status = 'in stock';
    if (newQuantity === 0) {
        status = 'out of stock';
    }

    await setQuantity(id, newQuantity, status);
    res.json({ message: "Item removed", quantity: newQuantity, status });
}

export async function addQuantity(req, res) {
    const { id } = req.params;
    const { amount } = req.body;

    if (req.role !== 'adder') {
        return res.status(403).json({ message: "Only an adder can add items" });
    }

    const item = await getItemById(id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    const newQuantity = item.quantity + amount;

    await setQuantity(id, newQuantity, 'in stock');
    res.json({ message: "Quantity added", quantity: newQuantity, status: 'in stock' });
}

export async function deleteStock(req, res) {
    const { id } = req.params;

    if (req.role !== 'remover') {
        return res.status(403).json({ message: "Only a remover can delete items" });
    }

    const item = await getItemById(id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }

    await deleteItemById(id);
    res.json({ message: "Item deleted" });
}