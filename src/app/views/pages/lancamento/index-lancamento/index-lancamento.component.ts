import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule, FormModule } from '@coreui/angular';
import { format, formatDate } from 'date-fns';
import { DecimalPipeFormat } from "../../../../pipes/decimal.pipe";
import { CrudService } from './../../../../core/services/crud.service';
import { SwalService } from './../../../../core/services/swal.service';
import { FormLancamentoComponent } from './../../lancamento/form-lancamento/form-lancamento.component';


@Component({
    selector: 'app-index-lancamento',
    templateUrl: './index-lancamento.component.html',
    styleUrl: './index-lancamento.component.scss',
    providers: [DatePipe],
    standalone: true,
    imports: [
        CardModule,
        MatIconModule,
        MatFormFieldModule,
        FormModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        DecimalPipeFormat,
        NgClass,
        MatDatepickerModule,
        MatButtonToggleModule
    ],
})
export class IndexLancamentoComponent implements OnInit{

    crudService     = inject(CrudService);
    dialog          = inject(MatDialog);
    dataPipe        = inject(DatePipe);
    swalService     = inject(SwalService);
    formBuilder     = inject(FormBuilder);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    change: EventEmitter<MatButtonToggleChange> = new EventEmitter<MatButtonToggleChange>();


    filtroLancamentos = new FormControl('');

    dataSource = new MatTableDataSource<any>([]);
    servidores: any = [];
    lancamentosAtivos: boolean = true;

    columns = [
        {
            columnDef: 'tipo',
            header: 'Tipo',
            cell: (element: any) => `${element.tipo}`,
        },
        {
            columnDef: 'cliente',
            header: 'Cliente',
            cell: (element: any) => `${element.cliente_nome}`,
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
            cell: (element: any) => `${element.banco_nome}`,
        },
        {
            columnDef: 'status',
            header: 'Status',
            cell: (element: any) => `${element.status}`,
        }
    ];

    displayedColumns = this.columns.map(c => c.columnDef);

    date = new Date();
    first = formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd');
    last = formatDate(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0), 'yyyy-MM-dd');

    form = this.formBuilder.group({
        data_inicio : [this.first],
        data_fim : [this.last],
        status : [false]
    })

    onToggleChange(event: MatButtonToggleChange) {

      this.form.value.status = event.value;
      console.log('onToggleChange: ', this.form.value);

      //this.change.emit(event);
      this.index();
    }

    ngOnInit(): void {
        this.index();
        this.getServidores();
        this.lancamentosAtivos = localStorage.getItem('lancamentosAtivos') == 'true' ? true : false

    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    index(){

        let data_inicio = this.form.value.data_inicio;
        let data_fim = this.form.value.data_fim;

        if (data_inicio) {
            data_inicio = format(data_inicio, 'yyyy-MM-dd');
        } else {
            console.error('Data inválida');
        }

        if (data_fim) {
            data_fim = format(data_fim, 'yyyy-MM-dd');
        } else {
            console.error('Data inválida');
        }

        const formValue = {
            ...this.form.value,
            data_inicio,
            data_fim
        };

        this.crudService.index('lancamentos',this.form.value).subscribe({
            next: lancamentos => {

                this.dataSource.data = lancamentos.map((lancamento: any) => ({
                  //nSequencial: lancamentos.from++,
                  vencimento: this.dataPipe.transform(lancamento.data, 'dd/MM/yyyy'),
                  cliente_nome: lancamento.cliente.nome,
                  banco_nome: lancamento.banco.nome,
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
            if(!item.status){
              this.renovacao(item);
            }

            item.status = item.status === 1 ? 0 : 1;
            this.crudService.updateStatus( id, 'lancamento').subscribe({
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


    getLancamentosAtivos() {
      this.lancamentosAtivos = !this.lancamentosAtivos;
      localStorage['lancamentosAtivos'] = this.lancamentosAtivos;
      this.form.value.status = this.lancamentosAtivos ? true : false;
      this.index();
    }

    openFormDialog(id: number) {
        const dialogRef = this.dialog.open(FormLancamentoComponent, {
        panelClass: 'dialog',
        height: '500px',
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
        const dialogRef = this.dialog.open(FormLancamentoComponent, {
            //panelClass: 'dialog',
            height: '500px',
            width: '600px',
            data: { action : "adicionar" }
        });

        dialogRef.updatePosition({top: '120px'});

        dialogRef.afterClosed().subscribe(result => {
        this.index();

        });
    }

    renovacao(item: any) {

      //{"cliente_id":162,"valor":"2","tipo":"Recebimento","banco_id":2,"data":"2024-09-23","status":false,"observacao":""}

      delete item.id;
      delete item.updated_at;
      delete item.created_at;

      const data = new Date(item.data);
      data.setMonth(data.getMonth() + 1);
      data.setDate(data.getDate() + 1);

      item.data = format(data, 'yyyy-MM-dd');

      this.crudService.store(item,'lancamento').subscribe({
        next: response =>{
          console.log('response: ', response);
            this.swalService.swalToaster('success','','Lançamento adicionado com sucesso!');
        },
        error: err => {
            console.error(err.error.message);
            this.swalService.swalToaster('error','','Erro ao adicionar cliente!');
        }
      })
    }


}
