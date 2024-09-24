import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';


@Component({
    selector: 'app-index-client',
    templateUrl: './index-cliente.component.html',
    styleUrl: './index-cliente.component.scss',
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
        NgClass,
        MatSlideToggleModule
    ]
})
export class IndexClienteComponent implements OnInit, AfterViewInit{

    crudService = inject(CrudService);
    dataPipe    = inject(DatePipe);
    dialog      = inject(MatDialog);
    swalService = inject(SwalService);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    //displayedColumns: string[] = ['id','nome', 'telefone', 'dispositivo'];
    dataSource = new MatTableDataSource<any>([]);
    servidores: any = [];
    clienteAtivos: boolean = true;

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
            columnDef: 'status',
            header: 'Status',
            cell: (element: any) => `${element.status}`,
        },

    ];

    displayedColumns = this.columns.map(c => c.columnDef);

    ngOnInit(): void {
        this.index();
        this.getServidores();
        this.clienteAtivos = localStorage.getItem('clientesAtivos') == 'true' ? true : false
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    index(){
        let filtro = { 'ativos' : localStorage.getItem('clientesAtivos') == 'true' ? true : false };
        this.crudService.index('clientes', filtro).subscribe({
            next: clientes => {
                this.dataSource.data = clientes.map((cliente: any) => ({
                    vencimentoFormat: this.dataPipe.transform(cliente.vencimento, 'dd/MM/yyyy'),            ...cliente
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

    checkVencimento (vencimento: string) {
        //const [dia, mes, ano] = vencimento.split('/').map(Number);
        //const data = new Date(ano, mes - 1, dia);
        const data = new Date(vencimento);
        const today = new Date();
        const week = new Date(new Date().setDate(new Date().getDate() + 1));

        if(data <= today){
          return 'expirado'
        }

        if (data >= today && data <= week){
          return 'expirando'
        }

        return 'caiu'
    }

    checkVencimentoApp (id: string): any {
        const item = this.dataSource.data.find(item => item.id === id);

        if (item.app_vencimento) {
            const app_vencimento = item.app_vencimento;
            const [ano, mes, dia] = app_vencimento.split('-').map(Number);
            const data = new Date(ano, mes - 1, dia);
            const today = new Date();
            const week = new Date(new Date().setDate(new Date().getDate() + 7));

            if(data <= today){
              return 'expirado'
            }

            if (data >= today && data <= week){
              return 'expirando'
            }

            return ''
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

    getClienteAtivos() {
        this.clienteAtivos = !this.clienteAtivos;
        localStorage['clientesAtivos'] = this.clienteAtivos;
        this.index();
    }

    adicionar() {
        const dialogRef = this.dialog.open(FormClienteComponent, {
            //panelClass: 'dialog',
            height: '590px',
            width: '800px',
            data: { action : "adicionar" }
        });

        dialogRef.updatePosition({top: '120px'});

        dialogRef.afterClosed().subscribe(result => {
        this.index();

        });
    }

    openFormDialog(id: number) {
        const dialogRef = this.dialog.open(FormClienteComponent, {
            //panelClass: 'dialog',
            height: '590px',
            width: '800px',
            data: { action : "visualizar", id : id }
        });
        dialogRef.updatePosition({top: '120px'});

        dialogRef.afterClosed().subscribe(result => {
            this.index();
        });
    }

    updateStatus(id: number){

        const item = this.dataSource.data.find(item => item.id === id);

        if (item) {
            item.status = item.status === 1 ? 0 : 1;
            this.crudService.updateStatus( id, 'cliente').subscribe({
                next: response => {
                this.swalService.swalToaster('success','','Status alterado com sucesso');
                },
                error: err => {
                console.error('Error updating status', err);
                this.swalService.swalToaster('error','','Erro ao alterado status: '+err);
                }
            });
        } else {
            console.error('Item não encontrado!');
        }

    }
}
