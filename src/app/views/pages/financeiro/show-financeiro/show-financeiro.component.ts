import { ClipboardModule } from '@angular/cdk/clipboard';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { DecimalPipeFormat } from './../../../../pipes/decimal.pipe';


@Component({
    selector: 'app-show-financeiro',
    templateUrl: './show-financeiro.component.html',
    styleUrl: './show-financeiro.component.scss',
    providers: [DatePipe],
    standalone: true,
    imports: [
        CardModule,
        MatIcon,
        BorderDirective,
        ClipboardModule,
        NgClass,
        DatePipe,
        DecimalPipeFormat,
        MatDialogModule
    ],
})
export class ShowFinanceiroComponent implements OnInit{

    crudService = inject(CrudService);
    swalService = inject(SwalService);
    route       = inject(ActivatedRoute);
    dataPipe    = inject(DatePipe);
    data        = inject(MAT_DIALOG_DATA);


    financeiro: any = {};
    cliente: any = {};
    banco: any = {};
    id: number = 0;
    vencimento: string | null = '';

    ngOnInit(): void {
        this.route.url.subscribe(segments => {
            this.id = Number(segments[1]?.path);
            console.log('this.id: ', this.id);
        });
        this.getId();
    }

    getId() {
        this.crudService.getById(this.data.id,'financeiro').subscribe({
            next: financeiro =>{
                this.financeiro = financeiro;
                this.cliente = financeiro.cliente;
                this.banco = financeiro.banco;
                this.vencimento = this.dataPipe.transform(financeiro.data, 'dd/MM/yyyy');
            }
        })
    }


}
