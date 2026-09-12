import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatColumnDef } from '@angular/material/table';
import { CardModule, FormModule } from '@coreui/angular';

@Component({
  selector: 'app-extrato',
  standalone: true,
  templateUrl: './extrato.component.html',
  styleUrl: './extrato.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardModule,
    FormModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDateRangePicker,
    MatDateRangeInput,
    MatColumnDef
  ]
})
export class ExtratoComponent {

   columns = [
        {
            columnDef: 'nome',
            header: 'Nome',
            cell: (element: any) => `${element.nome}`,
        },
        {
            columnDef: 'servidor_id',
            header: 'Servidor',
            cell: (element: any) => `${element.servidor_id}`,
        },
        {
            columnDef: 'vencimento',
            header: 'Vencimento',
            cell: (element: any) => `${element.vencimentoFormat}`,
        },
        {
            columnDef: 'app',
            header: 'Aplicativo',
            cell: (element: any) => `${element.app}`,
        },
        {
          columnDef: 'url',
          header: 'DNS',
          cell: (element: any) => `${element.url}`,
        },
        {
            columnDef: 'status',
            header: 'Status',
            cell: (element: any) => `${element.status}`,
        },
        {
          columnDef: 'renovar',
          header: 'Renovar',
          cell: (element: any) => `${element.status}`,
      },

    ];

}
