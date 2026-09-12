import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { format } from 'date-fns';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';
import { ClienteService } from './../../../../core/services/cliente.service';


@Component({
    selector: 'app-index-client',
    templateUrl: './index-cliente.component.html',
    styleUrl: './index-cliente.component.scss',
    providers: [DatePipe],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
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

    crudService     = inject(CrudService);
    clienteService  = inject(ClienteService);
    dataPipe        = inject(DatePipe);
    dialog          = inject(MatDialog);
    swalService     = inject(SwalService);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    //displayedColumns: string[] = ['id','nome', 'telefone', 'dispositivo'];
    dataSource = new MatTableDataSource<any>([]);
    servidores: any = [];
    clienteAtivos: boolean = true;
    renovandoIds: Set<number> = new Set();

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
            columnDef: 'banco_id',
            header: 'Banco',
            cell: (element: any) => `${element.ultimo_lancamento.banco.nome}`,
        },
        {
            columnDef: 'grupo_fut',
            header: 'Futebol',
            cell: (element: any) => `${element.grupo_fut}`,
        },
        {
            columnDef: 'grupo_vod',
            header: 'Vods',
            cell: (element: any) => `${element.grupo_vod}`,
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
        {
          columnDef: 'wpp',
          header: 'Notificação',
          cell: (element: any) => `${element.notificacao_wpp}`,
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
                    vencimentoFormat: this.dataPipe.transform(cliente.vencimento, 'dd/MM/yyyy'),...cliente
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

    renovarCliente(id: number){
      const item = this.dataSource.data.find(item => item.id === id);

      if (item) {

          if (this.renovandoIds.has(id)) {
            return;
          }

          this.renovandoIds.add(id);

          this.clienteService.renovar( id ).subscribe({
              next: response => {
                //const vencimento = this.dataPipe.transform(response.vencimento, 'dd/MM/yyyy')
                this.renovandoIds.delete(id);
                this.swalService.swalRenovacao(response.msg.replace(/\n/g, '<br>'));
                this.index();
              },
              error: err => {
              this.renovandoIds.delete(id);
              console.error('Error updating status', err);
              this.swalService.swalToaster('error','','Erro ao renovar cliente: '+err);
              }
          });
      } else {
          console.error('Item não encontrado!');
      }
    }

    isRenovando(id: number): boolean {
      return this.renovandoIds.has(id);
    }

    enviarNotificacao(id: number){

      this.clienteService.enviarNotificacao( id ).subscribe({
              next: response => {
                this.swalService.swalToaster('success','','Notificação enviada com Sucesso!');
                this.index();
              },
              error: err => {
                console.error('Error updating status', err);
                this.swalService.swalToaster('error','','Erro ao renovar cliente: '+err);
              }
          });

    }

    updateGrupo(id: number, grupo: string, status: boolean){

      this.swalService.swalFire('Deseja alterar cliente do Grupo?', status).then(result => {

        if (result.isConfirmed){
          this.clienteService.addGrupo( id , grupo ).subscribe({
              next: response => {
                this.swalService.swalToaster('success','','Cliente adicionado com Sucesso!');
                this.index();
              },
              error: err => {
                console.error('Error updating status', err);
                this.swalService.swalToaster('error','','Erro ao renovar cliente: '+err);
                this.index();
              }
          });
        }

        if (result.isDenied){
          this.clienteService.removeGrupo( id , grupo ).subscribe({
              next: response => {
                this.swalService.swalToaster('success','','Cliente removido com Sucesso!');
                this.index();
              },
              error: err => {
                console.error('Error updating status', err);
                this.swalService.swalToaster('error','','Erro ao renovar cliente: '+err);
                this.index();
              }
          });
        }

      })
    }

    criaLancamento(item: any) {

          delete item.id;
          delete item.updated_at;
          delete item.created_at;

          const data = new Date(item.data);
          data.setMonth(data.getMonth() + 1);
          data.setDate(data.getDate() + 1);

          item.data = format(data, 'yyyy-MM-dd');

          this.crudService.store(item,'lancamento').subscribe({
            next: response =>{
                this.swalService.swalToaster('success','','Lançamento adicionado com sucesso!');
            },
            error: err => {
                console.error(err.error.message);
                this.swalService.swalToaster('error','','Erro ao adicionar cliente!');
            }
          })
        }

}
