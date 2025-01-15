import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { TokenSchema } from './token-schema';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('CurrentUser Decorator - User:', request.user); // Deve mostrar o payload completo
    return request.user as TokenSchema; // Certifique-se de retornar o payload completo
  },
);
