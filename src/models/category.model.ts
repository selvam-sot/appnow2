import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const CategorySchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true,
        unique: true 
    },
    description: { 
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'category.png'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model<ICategory & Document>('Category', CategorySchema);