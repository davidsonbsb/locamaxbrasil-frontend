import { ClipboardModule } from '@angular/cdk/clipboard';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { format, formatDate } from 'date-fns';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { DecimalPipeFormat } from '../../../../pipes/decimal.pipe';


@Component({
    selector: 'app-form-financeiro',
    templateUrl: './form-financeiro.component.html',
    styleUrl: './form-financeiro.component.scss',
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
        MatDatepickerModule,
        MatSelectModule,
        MatOptionModule,
    ],
})
export class FormFinanceiroComponent{

    crudService = inject(CrudService);
    swalService = inject(SwalService);
    route       = inject(ActivatedRoute);
    dataPipe    = inject(DatePipe);
    data        = inject(MAT_DIALOG_DATA);
    formBuilder = inject(FormBuilder);
    dialogRef = inject(MatDialogRef<any>);

    action: string = '';
    adicionar: boolean = false;
    isEditar: boolean = false;

    id: number = 0;
    financeiro: any = {};
    cliente: any = {};
    clientes: any = [];
    banco: any = {};
    bancos: any = [];
    servidores: any = [];
    vencimento: string | null = '';

    today = formatDate(new Date(), 'yyyy-MM-dd');

    form = this.formBuilder.group({
        cliente_id : ['',Validators.required],
        valor : ['',Validators.required],
        tipo : ['',Validators.required],
        banco_id : ['',Validators.required],
        data : [this.today],
        status : [false],
    })

    constructor() {
       this.action = this.data.action;
       this.init();
   }

    init() {

        if (this.action === 'visualizar') {
            for (const controlName in this.form.controls) {
                this.form.get(controlName)?.disable();
            }
        }

        if (this.action === 'visualizar' || this.action === 'editar') {
            this.id = this.data.id;
            this.getId();
            this.getDropDown();
        }

        if (this.action === 'adicionar'){
            this.adicionar = true;
            this.getDropDown();

        }
    }

    getId() {
        this.crudService.getById(this.data.id,'financeiro').subscribe({
            next: financeiro =>{
                this.financeiro = financeiro;
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
          cliente_id : this.cliente.id,
          data : this.financeiro.data,
          tipo : this.financeiro.tipo,
          banco_id : this.banco.id,
          status : this.financeiro.status,
        });
    }


    updateStatus(){
        this.financeiro.status = !this.financeiro.status;
        this.crudService.updateStatus( this.data.id, 'financeiro').subscribe({
            next: response => {
                this.swalService.swalToaster('success','Pagamento','Status alterado com sucesso');
            },
            error: err => {
                console.error('Error updating status', err);
            this.swalService.swalToaster('error','Pagamento','Erro ao alterado status: '+err);
            }
        });
    }

    editar(){
        this.action = 'editar';
        this.isEditar = true;
        for (const controlName in this.form.controls) {
            this.form.get(controlName)?.enable();
        }
    }

    salvar() {

        let value = this.form.value.data;

        if (value) {
          this.form.value.data = format(value, 'yyyy-MM-dd');
        } else {
          console.error('Data inválida');
        }

        if(this.action === 'adicionar'){
            this.crudService.store(this.form.value,'financeiro').subscribe({
                next: response =>{
                    this.swalService.swalToaster('success','','Lançamento adicionado com sucesso!');
                    this.dialogRef.close();
                },
                error: err => {
                    console.error(err.error.message);
                    this.swalService.swalToaster('error','','Erro ao adicionar cliente!');
                }
            })
        }

        if(this.action === 'editar'){
            this.crudService.update(this.data.id,this.form.value,'financeiro').subscribe({
                next: response => {
                    this.swalService.swalToaster('success','','Lançamento alterado com sucesso');
                    this.dialogRef.close();
                },
                error: err => {
                    console.log('err: ', err);
                }
            })
        }

    }

    excluir(id: number) {
        this.swalService.swalDeleteWarning().then(result => {
            if(result.isConfirmed){
                this.crudService.delete(id, 'financeiro').subscribe( {
                    next: response => {
                        this.swalService.swalToaster('success','','Lançamento excluido com sucesso!');
                        this.dialogRef.close();
                    },
                    error: err => {
                        console.error(err.error.message);
                        this.swalService.swalToaster('error','','Erro ao excluir lançamento!');

                    }
                })
            }
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    getServidores() {
        this.crudService.index('servidores').subscribe( {
            next: servidores => {
                this.servidores = servidores;
            }
        })
    }

    getDropDown() {
        this.crudService.getDropDown('clientes').subscribe( {
            next: clientes => {
                this.clientes = clientes;
            }
        })

        this.crudService.getDropDown('bancos').subscribe( {
            next: bancos => {
                this.bancos = bancos;
            }
        })
    }

}
