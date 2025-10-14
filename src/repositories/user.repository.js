import db from '../database/db.js';
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
    
    static findAll() {
        return db.data.users;
    }

    static findById(id) {
        return db.data.users.find(u => u.id === id);
    }
    
    static findByEmail(email) {
        return db.data.users.find(u => u.email === email);
    }

    static async create(userData) {
        const novoUsuario = {
            id: uuidv4(),
            ...userData
        };
        db.data.users.push(novoUsuario);
        await db.write();
        return novoUsuario;
    }

    static async update(id, userData) {
        const index = db.data.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        
        db.data.users[index] = { id, ...userData };
        await db.write();
        return db.data.users[index];
    }

    static async delete(id) {
        db.data.users = db.data.users.filter(u => u.id !== id);
        await db.write();
    }
}

export default UserRepository;