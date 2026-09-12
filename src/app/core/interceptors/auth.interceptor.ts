import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  //const authToken = '3|v1owZ4G0G6mJH1qY5hV44BKfkZxQ3P5Uv1BhrxyNd36d8918'; // Substitua pelo seu token ou obtenha-o de um serviço de autenticação
  const authToken = localStorage.getItem('token'); // Substitua pelo seu token ou obtenha-o de um serviço de autenticação

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  //return next(clonedRequest);

  return next(clonedRequest).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Redireciona o usuário para a página de login ou trata o erro de autenticação
        console.error('Token expirado ou inválido. Redirecionando para login...');
        window.location.href = '#/login'; 
      }
      return throwError(error); // Retorna o erro para ser tratado onde a requisição foi feita
    })
  );
};
