import { Category } from "@/types/category";

// TODO: Este objeto deberia acceder a la API o al FileManager y realizar las operaciones
class CategoryService {
    findAll(): Category[] {
        console.log("No implementado");
        return [];
    }

    create(category: Category): void {
        console.log("No implementado");
    }

    update(id: number): void {
        console.log("No implementado");
    }

    delete(id: number): void {
        console.log("No implementado");
    }
}

export default new CategoryService();