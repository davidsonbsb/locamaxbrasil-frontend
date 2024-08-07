import { ClipboardModule } from '@angular/cdk/clipboard';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { format } from 'date-fns';
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
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterLinkActive,
        MatDatepickerModule
    ],
})
export class ShowFinanceiroComponent implements OnInit{

    crudService = inject(CrudService);
    swalService = inject(SwalService);
    route       = inject(ActivatedRoute);
    dataPipe    = inject(DatePipe);
    data        = inject(MAT_DIALOG_DATA);
    formBuilder = inject(FormBuilder);
    dialogRef = inject(MatDialogRef<any>);

    readonly: boolean = false;

    logoServidor: any = {
        1 : '/assets/images/club2.jpeg',
        2 : '/assets/images/five.jpeg',
        3 : '/assets/images/playon.jpeg',
        4 : '/assets/images/seven.jpeg',
      }

    financeiro: any = {};
    cliente: any = {};
    banco: any = {};
    id: number = 0;
    vencimento: string | null = '';

    form = this.formBuilder.group({
        valor : [{ value: '', disabled: true },Validators.required],
        nome_cliente : [{ value: '', disabled: true }],
        data : [{ value: '', disabled: true }],
    })

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
                console.log('this.financeiro: ', this.financeiro);
                this.cliente = financeiro.cliente;
                this.banco = financeiro.banco;
                this.vencimento = this.dataPipe.transform(financeiro.data, 'dd/MM/yyyy');
                this.setValueForms();
            }
        })
    }

    setValueForms() {
        this.form.setValue({
            valor : this.financeiro.valor,
            nome_cliente : this.cliente.nome,
            data : this.financeiro.data
        });
    }


    mudarStatus(){
        this.financeiro.status = !this.financeiro.status;
        this.crudService.updatePayment( this.data.id, 'financeiro').subscribe({
            next: response => {
                this.swalService.swalToaster('success','Pagamento','Status alterado com sucesso');
            },
            error: err => {
                console.error('Error updating status', err);
            this.swalService.swalToaster('error','Pagamento','Erro ao alterado status: '+err);
            }
        });
    }

    editar (){
        this.readonly = !this.readonly

        this.form.get('valor')?.enable();
        this.form.get('data')?.enable();
    }

    salvar() {
      let value = this.form.value.data;

        if (value) {
          this.form.value.data = format(value, 'yyyy-MM-dd');
        } else {
          console.log('Data inválida');
        }


        this.crudService.update(this.data.id,this.form.value,'financeiro').subscribe({
            next: response => {
                this.swalService.swalToaster('success','Lançamento','Lançamento alterado com sucesso');
                this.dialogRef.close();
            },
            error: err => {
                console.log('err: ', err);
            }
        })
    }

    excluir () {
        let value = this.form.value.data;

        if (value) {
          let data = format(value, 'yyyy-MM-dd');
          console.log(data);
        } else {
          console.log('Data inválida');
        }
    }

}
