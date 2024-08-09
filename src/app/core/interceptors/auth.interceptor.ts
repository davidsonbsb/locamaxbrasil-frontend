import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  //const authToken = '3|v1owZ4G0G6mJH1qY5hV44BKfkZxQ3P5Uv1BhrxyNd36d8918'; // Substitua pelo seu token ou obtenha-o de um serviço de autenticação
  const authToken = localStorage.getItem('token'); // Substitua pelo seu token ou obtenha-o de um serviço de autenticação

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(clonedRequest);

  //return next(req);
};
