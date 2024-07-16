import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  const authToken = '1|CLtuyfnhLpy7iIbfl4H2xIBVRbs4hieX55Zb4Icnb86f0732'; // Substitua pelo seu token ou obtenha-o de um serviço de autenticação

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(clonedRequest);

  //return next(req);
};
