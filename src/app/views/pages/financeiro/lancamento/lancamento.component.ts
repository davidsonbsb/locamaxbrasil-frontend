import { DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
    position: number;
    date: string;
    value: number;
}

const ELEMENT_DATA: any[] = [
  {position: 1, date: 'Hydrogen', value: 1.0079, },
  {position: 2, date: 'Helium', value: 4.0026, },
  {position: 3, date: 'Lithium', value: 6.941, },
  {position: 4, date: 'Beryllium', value: 9.0122,},
];

@Component({
    selector: 'app-lancamento',
    templateUrl: './lancamento.component.html',
    styleUrl: './lancamento.component.scss',
    standalone: true,
    providers: [DatePipe],
    imports: [
        MatButtonModule,
        MatTableModule
    ],
})
export class LancamentoComponent {

    @Input() plano: number = 0;

    @ViewChild(MatTable) table: MatTable<any> | any;

    displayedColumns: string[] = ['position', 'date', 'value'];

    lancamentos: any = [{
      'position' : 1,
      'date' : new Date(),
      'value' : 35
    }];

    dataSource = [... this.lancamentos];

    constructor(private datePipe: DatePipe) {}

    formatDate(date: Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy')!;
    }

    addData() {
      let ultimoLancamento = this.lancamentos[this.lancamentos.length - 1];
      console.log('ultimoLancamento: ', ultimoLancamento);
      let novoLancamento = { ...ultimoLancamento, date: new Date(ultimoLancamento.date.getTime()) };
      novoLancamento.date.setMonth(novoLancamento.date.getMonth() + 1);
      novoLancamento.position++;
      this.lancamentos.push(novoLancamento);
      this.dataSource.push(novoLancamento);
      //console.log('novoLancamento: ', novoLancamento);
      this.table.renderRows();
    }

    removeData() {
      this.dataSource.pop();
      this.table.renderRows();
    }

    showData() {
      console.log(this.plano);
    }

}
