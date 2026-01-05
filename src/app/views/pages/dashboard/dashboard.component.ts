import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { Chart } from 'chart.js';
import { ClienteService } from './../../../core/services/cliente.service';
import { LancamentoService } from './../../../core/services/lancamento.service';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    standalone: true,
    imports: [
        ChartjsModule,
        CardModule,
        MatIcon
        ]
})
export class DashboardComponent implements OnInit {

    clienteService = inject(ClienteService);
    lancamentoService = inject(LancamentoService);

    totais = {};

    data = {
      labels: ['Club', 'Five', 'PlayON', 'Warez'],
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: [40, 20, 80, 10]
        }]
    };

    private coresPorBanco: { [banco: string]: string } = {
      'Inter': '#ff9900',
      'Mercado Pago': '#0678d6',
      'Cripto': '#CC092F',
      'Débora': '#ec009d',
      'Pic Pay': '#23944e',
      'Nubank': '#6a2677',
      'Sophie': '#ce6dce',
    };

    getCorBanco(banco: string): string {
      return this.coresPorBanco[banco] ?? '#999999'; // fallback
    }

    gerarCorAleatoria() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    ngOnInit(): void {
        this.getTotalClientes();
        this.getTotalClientesApps();
        this.getTotalClientesStatus();
        this.getTotalLancamentos();
        this.getTotalLancamentosDia();
    }

    getTotalClientes() {
        this.clienteService.clientesTotal().subscribe({
            next: response => {
                this.totais = response;

                const cores = this.gerarCoresAleatorias(response.label.length);
                const ctx = document.getElementById('chartTotal') as HTMLCanvasElement;
                new Chart(ctx, {
                    type: 'pie',
                    data: {
                    labels: response.label,
                    datasets: [{
                        data: response.data,
                        backgroundColor: cores,
                    }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Clientes Totais'
                            }
                        }
                    }
                });

            }
        })
    }

    getTotalClientesApps() {
        this.clienteService.clientesTotalApps().subscribe({
            next: response => {

                const cores = this.gerarCoresAleatorias(response.label.length);
                const ctx = document.getElementById('chartTotalApps') as HTMLCanvasElement;
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: response.label,
                    datasets: [{
                        label: 'Totais',
                        data: response.data,
                        backgroundColor: cores,
                    }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Aplicativos Totais'
                            }
                        }
                    }
                });

            }
        })
    }

    getTotalLancamentosDia() {
      this.lancamentoService.getTotalLancamentosDia(1).subscribe({
        next: response => {
          const ctx = document.getElementById('chartTotalLancamentosDia') as HTMLCanvasElement;

          // Transformar datasets do backend no formato Chart.js
          const datasets = Object.keys(response.datasets).map(banco => ({
            label: banco,
            data: response.datasets[banco],
            backgroundColor: this.getCorBanco(banco) + 'CC',
            borderWidth: 1
          }));

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: response.labels,
              datasets: datasets
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Totais por dia'
                },
                tooltip: {
                  callbacks: {
                      label: function(context) {
                          return context.dataset.label + ': R$ ' +
                              Number(context.raw).toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2
                              });
                      }
                  }
              }
              }
            }
          });
          }
      });

    }

    getTotalLancamentos() {
      this.lancamentoService.getTotalLancamentos(1).subscribe({
        next: response => {
          const ctx = document.getElementById('chartTotalLancamentos') as HTMLCanvasElement;

          // Transformar datasets do backend no formato Chart.js
          const datasets = Object.keys(response.datasets).map(banco => ({
            label: banco,
            data: response.datasets[banco],
            backgroundColor: this.getCorBanco(banco) + 'CC',
            borderWidth: 1
          }));

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: response.labels,
              datasets: datasets
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { stacked: true },
                y: { stacked: true }
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Totais por Banco'
                },
                tooltip: {
                  callbacks: {
                      label: function(context) {
                          return context.dataset.label + ': R$ ' +
                              Number(context.raw).toLocaleString('pt-BR', {
                                  minimumFractionDigits: 2
                              });
                      }
                  }
              }
              }
            }
          });
          }
      });
    }

    /* getTotalClientesApps() {
        this.clienteService.clientesTotalApps().subscribe({
            next: response => {

                const cores = this.gerarCoresAleatorias(response.label.length);
                const ctx = document.getElementById('chartTotalApps') as HTMLCanvasElement;
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: response.label,
                    datasets: [{
                        label: 'Totais',
                        data: response.data,
                        backgroundColor: cores,
                    }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Aplicativos Totais'
                            }
                        }
                    }
                });

            }
        })
    } */

    getTotalClientesStatus() {
        this.clienteService.clientesTotalStatus().subscribe({
            next: response => {

                const cores = this.gerarCoresAleatorias(response.label.length);
                const ctx = document.getElementById('chartTotalStatus') as HTMLCanvasElement;
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                    labels: response.label,
                    datasets: [{
                        label: 'Totais',
                        data: response.data,
                        backgroundColor: cores,
                    }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Clients Status Totais'
                            },
                        }
                    }
                });
            }
        })
    }

    gerarCoresAleatorias(quantidade: number) {

        const cores = [];

        for (let i = 0; i < quantidade; i++) {
            const corAleatoria = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
            cores.push(corAleatoria);
        }

        return cores;
    }

}
