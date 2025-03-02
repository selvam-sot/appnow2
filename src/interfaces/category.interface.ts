export interface ICategory {
    _id: string;
    name: string;
    description: string;
    image?: string;
    isActive: boolean;
    isFavorite: boolean;
}