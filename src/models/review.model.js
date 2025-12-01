import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  game: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Game', 
    required: true 
  },
  nota: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comentario: { 
    type: String, 
    required: true, 
    maxlength: 500 
  }
}, { timestamps: true });

reviewSchema.index({ usuario: 1, game: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;