import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { DecimalPipeFormat } from "../../../../pipes/decimal.pipe";
import { FormFinanceiroComponent } from './../form-financeiro/form-financeiro.component';


@Component({
    selector: 'app-index-financeiro',
    templateUrl: './index-financeiro.component.html',
    styleUrl: './index-financeiro.component.scss',
    providers: [DatePipe],
    standalone: true,
    imports: [
        CardModule,
        MatIconModule,
        //MatFormFieldModule,
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

    crudService     = inject(CrudService);
    dialog          = inject(MatDialog);
    dataPipe        = inject(DatePipe);
    swalService     = inject(SwalService);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    dataSource = new MatTableDataSource<any>([]);
    servidores: any = [];

    columns = [
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

    ngOnInit(): void {
        this.index();
        this.getServidores();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    index(){
        this.crudService.index('financeiros').subscribe({
            next: lancamentos => {

                this.dataSource.data = lancamentos.map((lancamento: any) => ({
                    nSequencial: lancamentos.from++,
                    vencimento: this.dataPipe.transform(lancamento.data, 'dd/MM/yyyy'),
                    ...lancamento
                }));
            },
            error: err => {
                console.error('err: ', err);
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

    updateStatus(id: number){
        const item = this.dataSource.data.find(item => item.id === id);
        if (item) {
            item.status = item.status === 1 ? 0 : 1;
            this.crudService.updateStatus( id, 'financeiro').subscribe({
                next: response => {
                this.swalService.swalToaster('success','Pagamento','Status alterado com sucesso');
                },
                error: err => {
                console.error('Error updating status', err);
                this.swalService.swalToaster('error','Pagamento','Erro ao alterado status: '+err);
                }
            });
        } else {
            console.error('Item não encontrado!');
        }

    }

    getServidorLogo(id: any): string {
        return id && this.servidores[id -1] ? this.servidores[id -1].logo : '/assets/images/no_pic.png';
    }

    getServidores() {
        this.crudService.index('servidores').subscribe( {
            next: servidores => {
                this.servidores = servidores;
            }
        })
    }

    openFormDialog(id: number) {
        const dialogRef = this.dialog.open(FormFinanceiroComponent, {
        panelClass: 'dialog',
        height: '450px',
        width: '600px',
        data: { action : "visualizar", id : id }
        });

        dialogRef.afterClosed().subscribe(result => {
        this.index();

        });
    }

    checkVencimento (vencimento: string) {
        const [dia, mes, ano] = vencimento.split('/').map(Number);
        const data = new Date(ano, mes - 1, dia);
        const today = new Date();

        return data > today ? false : true;
    }

    adicionar() {
        const dialogRef = this.dialog.open(FormFinanceiroComponent, {
            //panelClass: 'dialog',
            height: '450px',
            width: '600px',
            data: { action : "adicionar" }
        });

        dialogRef.updatePosition({top: '120px'});

        dialogRef.afterClosed().subscribe(result => {
        this.index();

        });
    }


}
