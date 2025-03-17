import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'ProductSpecs',
    async: false
})
export class ProductSpecs implements ValidatorConstraintInterface {
    acceptedSpecs = [
        'ram', 'processor', 'ssd', 'hdd', 'brand', 'model',
        'color', 'weight', 'dimensions', 'material',
        'capacity', 'power', 'voltage', 'warranty',
        'condition', 'chip', 'year', 'other_features',
      ];

    validate(specs: Record<string, string>): Promise<boolean> | boolean {
        const keys = Object.keys(specs)

        if(keys.length === 0) return true
        
        return keys.every((key) => this.acceptedSpecs.includes(key) && specs[key].trim() !== '')
    }

    defaultMessage(){
        return 'Product specs with be a valid object with supported specification'
    }
}