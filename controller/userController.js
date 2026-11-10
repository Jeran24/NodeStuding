import { addUser, getAllUsers, updateUserById, deleteUserById } from '../module/user.js';

export async function createUser(req, res) {
    const { name, email } = req.body;
    const id = await addUser(name, email);
    res.json({ id });
}

export async function getUsers(req, res) {
    const users = await getAllUsers();
    res.json(users);
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    await updateUserById(id, name, email);
    res.json({ message: "User updated" });
}

export async function deleteUser(req, res) {
    const { id } = req.params;
    await deleteUserById(id);
    res.json({ message: "User deleted" });
}