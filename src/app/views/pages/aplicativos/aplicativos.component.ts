import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { FormClienteComponent } from '../cliente/form-cliente/form-cliente.component';
import { ClienteService } from './../../../core/services/cliente.service';
import { CrudService } from './../../../core/services/crud.service';


@Component({
  selector: 'app-aplicativos',
  templateUrl: './aplicativos.component.html',
  styleUrl: './aplicativos.component.scss',
  providers: [DatePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CardModule,
    MatFormFieldModule,
    MatTableModule,
    MatIcon,
    NgClass,
    MatPaginator,
    MatSortModule,
    MatInputModule
  ],
})
export class AplicativosComponent implements OnInit{

  crudService     = inject(CrudService);
  clienteService  = inject(ClienteService);
  dialog          = inject(MatDialog);
  dataPipe        = inject(DatePipe);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);
  servidores: any = [];

  columns = [
      {
          columnDef: 'nome',
          header: 'Nome Cliente',
          cell: (element: any) => `${element.nome}`,
      },
      {
          columnDef: 'servidor_id',
          header: 'Servidor',
          cell: (element: any) => `${element.servidor_id}`,
      },
      {
          columnDef: 'app',
          header: 'Aplicativo',
          cell: (element: any) => `${element.app}`,
      },
      {
        columnDef: 'app_vencimento',
        header: 'Vencimento',
        cell: (element: any) => `${element.vencimentoFormat}`,
      },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.clienteService.clientesApps().subscribe({
        next: clientes => {
          this.dataSource.data = clientes
            //.filter((cliente: any) => cliente.app_vencimento !== null)
            .map((cliente: any) => ({
              vencimentoFormat: this.dataPipe.transform(cliente.app_vencimento, 'dd/MM/yyyy'),
              ...cliente
            }));
        }
    })
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

  }

  checkVencimento() {

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

  getServidores() {
    this.crudService.index('servidores').subscribe( {
        next: servidores => {
            this.servidores = servidores;
        }
    })
  }

  getServidorLogo(id: any): string {
    return id && this.servidores[id -1] ? this.servidores[id -1].logo : '/assets/images/no_pic.png';
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

}
