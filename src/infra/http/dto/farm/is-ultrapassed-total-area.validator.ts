import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

interface FarmAreaProps {
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
}

export function IsUltrapassedTotalArea(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUltrapassedTotalArea',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: number, args: ValidationArguments) {
          const { arableArea, vegetationArea } = args.object as FarmAreaProps;

          const sum = arableArea + vegetationArea;
          return sum <= value;
        },
        defaultMessage(args: ValidationArguments) {
          const { arableArea, vegetationArea, totalArea } =
            args.object as FarmAreaProps;
          return `A soma da área agricultável da fazenda (${arableArea}) e área de vegetação (${vegetationArea}) não pode exceder a área total da fazenda (${totalArea}).`;
        },
      },
    });
  };
}
