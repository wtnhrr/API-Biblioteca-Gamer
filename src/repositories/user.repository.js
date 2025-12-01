import User from '../models/user.model.js';

class UserRepository {
  static async findAll() {
    return await User.find().populate('biblioteca', 'titulo');;
  }

  static async findById(id) {
    return await User.findById(id).populate('biblioteca');
  }

  static async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  static async create(userData) {
    const novoUsuario = new User(userData);
    return await novoUsuario.save();
  }

  static async update(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { 
      new: true, 
      runValidators: true 
    }).populate('biblioteca');
  }

  static async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;