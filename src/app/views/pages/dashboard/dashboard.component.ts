import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { Chart } from 'chart.js';
import { ClienteService } from './../../../core/services/cliente.service';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    standalone: true,
    //imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
    imports: [
        ChartjsModule,
        CardModule
        ]
})
export class DashboardComponent implements OnInit {

    clienteService = inject(ClienteService);

    totais = {};

    data = {
    labels: ['Club', 'Five', 'PlayON', 'Warez'],
    datasets: [{
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10]
    }]
    };

    ngOnInit(): void {
        this.getTotalClientes();
        this.getTotalClientesApps();
        this.getTotalClientesStatus();
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
    }

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
                            }
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
