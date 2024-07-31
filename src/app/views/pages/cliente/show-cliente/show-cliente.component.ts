import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { DecimalPipeFormat } from 'src/app/pipes/decimal.pipe';
import { LancamentoComponent } from '../../financeiro/lancamento/lancamento.component';
import { CrudService } from './../../../../core/services/crud.service';
import { SwalService } from './../../../../core/services/swal.service';


@Component({
    selector: 'app-show-cliente',
    standalone: true,
    templateUrl: './show-cliente.component.html',
    styleUrl: './show-cliente.component.scss',
    imports: [
        CardModule,
        BorderDirective,
        MatIconModule,
        ClipboardModule,
        RouterLink,
        LancamentoComponent,
        DecimalPipeFormat
    ],
})
export class ShowClienteComponent implements OnInit{

    crudService = inject(CrudService)
    swalService = inject(SwalService)

    cliente: any = {}
    servidor: any = {}

    ngOnInit(): void {
        this.getId();
    }

    getId() {
        this.crudService.getById(1,'cliente').subscribe({
            next: cliente =>{
                this.cliente = cliente;
                this.servidor = cliente.servidor
            }
        })
    }

	onCopy(success: boolean) {
		if (success) {
			  this.swalService.swalToaster('success','Copia','Valor copiado com sucesso');
		} else {
			  this.swalService.swalToaster('error','Copia','Erro ao copiar valor');
		}
	}
}
