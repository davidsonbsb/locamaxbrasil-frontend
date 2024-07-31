import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { DecimalPipeFormat } from "../../../../pipes/decimal.pipe";
import { ShowFinanceiroComponent } from './../show-financeiro/show-financeiro.component';


@Component({
    selector: 'app-index-financeiro',
    templateUrl: './index-financeiro.component.html',
    styleUrl: './index-financeiro.component.scss',
    providers: [DatePipe],
    standalone: true,
    imports: [
      CardModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatDialogModule,
      DecimalPipeFormat,
      NgClass
  ],
})
export class IndexFinanceiroComponent implements OnInit{

    crudService = inject(CrudService);
    dialog      = inject(MatDialog);
    dataPipe    = inject(DatePipe);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource = new MatTableDataSource<any>([]);

    columns = [
        {
            columnDef: 'id',
            header: '#',
            cell: (element: any) => `${element.id}`,
        },
        {
            columnDef: 'tipo',
            header: 'Tipo',
            cell: (element: any) => `${element.tipo}`,
        },
        {
            columnDef: 'cliente',
            header: 'Cliente',
            cell: (element: any) => `${element.cliente.nome}`,
        },
        {
            columnDef: 'servidor',
            header: 'Servidor',
            cell: (element: any) => `${element.cliente.servidor_id}`,
        },
        {
            columnDef: 'data',
            header: 'Data',
            cell: (element: any) => `${element.vencimento}`,
        },
        {
            columnDef: 'valor',
            header: 'Valor',
            cell: (element: any) => `${element.valor}`,
        },
        {
            columnDef: 'banco',
            header: 'Banco',
            cell: (element: any) => `${element.banco.nome}`,
        },
        {
            columnDef: 'status',
            header: 'Status',
            cell: (element: any) => `${element.status}`,
        }
    ];

    displayedColumns = this.columns.map(c => c.columnDef);

    logoServidor: any = {
      1 : '/assets/images/club2.jpeg',
      2 : '/assets/images/five.jpeg',
      3 : '/assets/images/playon.jpeg',
      4 : '/assets/images/seven.jpeg',
    }

    ngOnInit(): void {
        this.index();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    index(){

      let dataObject: any= {};

      /* this.crudService.index('financeiro').pipe(
        map(response => {
          // Transforma a      resposta em um objeto mapeado pelo id
          const dataObject = {};
          response.forEach(item => {
            dataObject[item.id] = item;
          });
          return dataObject;
        })
      ).subscribe({
        next: dataObject => {
          this.dataSource.data = dataObject;
        }
      }); */

        this.crudService.index('financeiro').subscribe({
            next: lancamentos => {

                this.dataSource.data = lancamentos.map((lancamento: any) => ({
                  nSequencial: lancamentos.from++,
                  vencimento: this.dataPipe.transform(lancamento.data, 'dd/MM/yyyy'),
                  ...lancamento
                }));

            }

        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        //console.log(`Ordenado por ${sortState.direction}`);
      } else {
        //console.log(`Ordenado limpa`);;
      }
    }

    mudarStatus(id: number){

      const item = this.dataSource.data.find(item => item.id === id);

      if (item) {
        // Altere o status do item (aqui estou alternando entre 1 e 0 como exemplo)
        item.status = item.status === 1 ? 0 : 1;
        console.log('Status updated successfully');

        // Chame o serviço para atualizar o status no servidor, se necessário
        this.crudService.updatePayment( id, 'financeiro').subscribe({
          next: response => {
            console.log('Status updated successfully', response);
          },
          error: err => {
            console.error('Error updating status', err);
          }
        });
      } else {
        console.error('Item not found');
      }
    }

    openShowDialog(id: number) {
      const dialogRef = this.dialog.open(ShowFinanceiroComponent, {
        panelClass: 'dialog',
        height: '400px',
        width: '600px',
        data: {id: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);

      });
    }

    checkVencimento (vencimento: string) {
      const [dia, mes, ano] = vencimento.split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);
      const today = new Date();

      return data > today ? false : true;
    }


}
