import { stockFactory } from '../../../classes/StockModel';

describe('stockFactory', () => {
    const foodStock = stockFactory('food', {
        name: 'meta-o-mata',
        description: '',
        stockAmount: 5,
        costPerPackage: 9923.84,
        caloriesPerPackage: 4,
    });

    const waterStock = stockFactory('water', {
        name: 'waterismo',
        description: 'Delicious and sweet',
        stockAmount: 5,
        costPerPackage: 3.84,
        millilitrePerPackage: 1200,
    });

    const medicineStock = stockFactory('medicine', {
        name: 'Paracetamol',
        description: 'For fever',
        stockAmount: 5,
        costPerPackage: 1.84,
    });

    const weaponStock = stockFactory('weapon', {
        name: 'AR-15',
        description: '',
        stockAmount: 5,
        costPerPackage: 1200.99,
    });

    test('food', () => {
        expect(foodStock).toEqual({
            'caloriesPerPackage': 4,
            'costPerPackage': 9923.84,
            'description': '',
            'name': 'meta-o-mata',
            'stockAmount': 5,
            'stockCategory': 'food'
        });
    });

    test('water', () => {
        expect(waterStock).toEqual({
            'millilitrePerPackage': 1200,
            'costPerPackage': 3.84,
            'description': 'Delicious and sweet',
            'name': 'waterismo',
            'stockAmount': 5,
            'stockCategory': 'water'
        });
    });

    test('medicine', () => {
        expect(medicineStock).toEqual({
            'costPerPackage': 1.84,
            'description': 'For fever',
            'name': 'Paracetamol',
            'stockAmount': 5,
            'stockCategory': 'medicine'
        });
    });

    test('weapon', () => {
        expect(weaponStock).toEqual({
            'costPerPackage': 1200.99,
            'description': '',
            'name': 'AR-15',
            'stockAmount': 5,
            'stockCategory': 'weapon'
        });
    });
});
