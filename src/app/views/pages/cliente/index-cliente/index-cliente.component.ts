import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CardModule } from '@coreui/angular';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
    selector: 'app-index-client',
    templateUrl: './index-cliente.component.html',
    styleUrl: './index-cliente.component.scss',
    standalone: true,
    imports: [
        CardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule
    ]
})
export class IndexClienteComponent implements OnInit, AfterViewInit{

    crudService = inject(CrudService);

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    //displayedColumns: string[] = ['id','nome', 'telefone', 'dispositivo'];
    dataSource = new MatTableDataSource<any>([]);

    columns = [
        {
            columnDef: 'id',
            header: '#',
            cell: (element: any) => `${element.id}`,
        },
        {
            columnDef: 'nome',
            header: 'Nome',
            cell: (element: any) => `${element.nome}`,
        },
        {
            columnDef: 'servidor_id',
            header: 'Servidor',
            cell: (element: any) => `${element.servidor.nome}`,
        },
        {
            columnDef: 'vencimento',
            header: 'Vencimento',
            cell: (element: any) => `${element.vencimento}`,
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
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    index(){
      this.crudService.index('clientes').subscribe({
        next: response => {
          this.dataSource.data = response;
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
}
