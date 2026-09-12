import { NgClass } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-novidades',
  standalone: true,
  templateUrl: './novidades.component.html',
  styleUrl: './novidades.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgClass
]
})
export class NovidadesComponent {

/*   eventos = [
  {
    data: new Date(2025, 6, 10),
    titulo: 'Meu Nome não é Johnny',
    descricao: 'João Guilherme Estrella (Selton Mello) nasceu em uma família de classe média do Rio de Janeiro. Filho de um diretor do extinto Banco Nacional, ele cresceu no Jardim Botânico e frequentou os melhores colégios, tendo amigos entre as famílias mais influentes da cidade. Carismático e popular, João viveu intensamente os anos 80 e 90. Neste período ele conheceu o universo das drogas, mesmo sem jamais pisar numa favela. Logo tornou-se o maior vendedor de drogas do Rio de Janeiro, sendo preso em 1995. A partir de então passou a frenquentar o cotidiano do sistema carcerário brasileiro.',
    capa: 'http://mplayerpro.club/images/cJotGbGU4pdERpowLQiN2IOLlDv_big.jpg'
  },
  {
    data: new Date(2025, 6, 11),
    titulo: 'Oppenheimer',
    descricao: 'A história do criador da bomba atômica.',
    capa: 'http://mplayerpro.club/images/cJotGbGU4pdERpowLQiN2IOLlDv_big.jpg'
  },
  // adicione mais eventos...
]; */

eventos = [


    {
        "nome": "Uma Floresta Misteriosa",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/lRYfzeaFTNkyWl2TOfPVk0m5ndA.jpg",
        "grupo": "Filmes | Lancamentos",
        "tipo": "movie"
    },
    {
        "nome": "Uma Floresta Misteriosa",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/lRYfzeaFTNkyWl2TOfPVk0m5ndA.jpg",
        "grupo": "Filmes | Terror",
        "tipo": "movie"
    },
    {
        "nome": "Uma Floresta Misteriosa [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/lRYfzeaFTNkyWl2TOfPVk0m5ndA.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Procura-se",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5S10EC500Gy0jSP2RJsiVNLamrP.jpg",
        "grupo": "Filmes | Lancamentos",
        "tipo": "movie"
    },
    {
        "nome": "Procura-se",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5S10EC500Gy0jSP2RJsiVNLamrP.jpg",
        "grupo": "Filmes | Nacionais",
        "tipo": "movie"
    },
    {
        "nome": "Procura-se [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/5S10EC500Gy0jSP2RJsiVNLamrP.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "O Faixa Preta",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/tdXSgI3jxRbZOoBWxvpnMjkRfBV.jpg",
        "grupo": "Filmes | Lancamentos",
        "tipo": "movie"
    },
    {
        "nome": "O Faixa Preta",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/tdXSgI3jxRbZOoBWxvpnMjkRfBV.jpg",
        "grupo": "Filmes | Nacionais",
        "tipo": "movie"
    },
    {
        "nome": "O Faixa Preta [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/tdXSgI3jxRbZOoBWxvpnMjkRfBV.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Karatê Kid: Lendas [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gnuSSOVBVWlKL8dFEGKRoOiiKTS.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Desastre Total: O Verdadeiro Projeto X",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1btqv0ZOkgyWvS8CwxXm0AokljQ.jpg",
        "grupo": "Filmes | Lancamentos",
        "tipo": "movie"
    },
    {
        "nome": "Desastre Total: O Verdadeiro Projeto X",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1btqv0ZOkgyWvS8CwxXm0AokljQ.jpg",
        "grupo": "Documentarios",
        "tipo": "movie"
    },
    {
        "nome": "Desastre Total: O Verdadeiro Projeto X [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1btqv0ZOkgyWvS8CwxXm0AokljQ.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Na Quebrada",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1jnrh8RielfYUjozMF0XsBBwTeE.jpg",
        "grupo": "Filmes | Drama",
        "tipo": "movie"
    },
    {
        "nome": "+ Velozes + Furiosos [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mx0CB8H78PQu0g9YUWG47hdi93S.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Los Bandoleros [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/oAV6YTJKrhCQatv3pwqRblcMa0u.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "A Justiceira",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/q9xUGMmjtVw53fMA68aJyb7nLMR.jpg",
        "grupo": "Filmes | Drama",
        "tipo": "movie"
    },
    {
        "nome": "A Justiceira [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/q9xUGMmjtVw53fMA68aJyb7nLMR.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "(A) Fronteira",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/2BcojtQzpBlFvpMQZ7tMIRGSlz7.jpg",
        "grupo": "Filmes | Terror",
        "tipo": "movie"
    },
    {
        "nome": "Tracers: Nos Limites",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/yGedOHE4uy4onbvTp8xsIVd41Hx.jpg",
        "grupo": "Filmes | Acao",
        "tipo": "movie"
    },
    {
        "nome": "Tracers: Nos Limites [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/yGedOHE4uy4onbvTp8xsIVd41Hx.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Perseguição Radical",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gQXkJmlv9PhNLFK5HELT2MUW51k.jpg",
        "grupo": "Filmes | Acao",
        "tipo": "movie"
    },
    {
        "nome": "Perseguição Radical [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/gQXkJmlv9PhNLFK5HELT2MUW51k.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Outland: Comando Titânio",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/cakuWAQEvFPaXl5MjH5JjKPQOKg.jpg",
        "grupo": "Filmes | Ficcao",
        "tipo": "movie"
    },
    {
        "nome": "Outland: Comando Titânio [L]",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/cakuWAQEvFPaXl5MjH5JjKPQOKg.jpg",
        "grupo": "Filmes | Legendados",
        "tipo": "movie"
    },
    {
        "nome": "Os Sobreviventes",
        "logo": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/Amq83pZPEFKhWIAsbtQk5CTYq2N.jpg",
        "grupo": "Filmes | Ficcao",
        "tipo": "movie"
    }
  ]

}
