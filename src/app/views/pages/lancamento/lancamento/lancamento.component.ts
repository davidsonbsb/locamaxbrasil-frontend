import { DatePipe } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BorderDirective, CardModule } from '@coreui/angular';
import { LancamentoService } from '../../../../core/services/lancamento.service';
import { IndexLancamentoComponent } from './../index-lancamento/index-lancamento.component';

type Lancamento = {
  id: number;
  tipo: string;
  data: string;
  valor: string;
  status: number;
};

@Component({
    selector: 'app-lancamento',
    templateUrl: './lancamento.component.html',
    styleUrl: './lancamento.component.scss',
    standalone: true,
    providers: [DatePipe],
    imports: [
        MatButtonModule,
        MatTableModule,
        CardModule,
        BorderDirective,
        FormsModule,
        ReactiveFormsModule,
        MatIcon,
        MatFormFieldModule,
        MatInputModule,
        MatLabel,
        MatCardModule
    ],
})
export class LancamentoComponent extends IndexLancamentoComponent{

    lancamentoService = inject(LancamentoService);
    data              = inject<any>(MAT_DIALOG_DATA);
    dialogRef         = inject(MatDialogRef<any>);

    @Input() plano: number = 0;

    @ViewChild(MatTable) table: MatTable<any> | any;

    override displayedColumns: string[] = ['data', 'valor' , 'status', 'acao'];


    lancamentos: any = [{
      'position' : 1,
      'date' : new Date(),
      'value' : 35
    }];

    planos: Array<any> = [
      { 'pop' : "Pop" },
      { 'mega' : "Mega" },
      { 'premium' : "Premium" }
    ];

    id: number = 0;
    cliente: any = {}
    lancamentosCliente: any = {}
    dataSource2: Lancamento[] = [];

    form2 = this.formBuilder.group({
        nome : ['',Validators.required],
        telefone : ['',Validators.required],
        valor : ['',Validators.required],
        plano : ['',Validators.required],
        //vencimento : [this.dateLancamento ,Validators.required],
        usuario : ['',Validators.required],
        servidor_id : ['',Validators.required],
        url: [''],
        dispositivo : ['',Validators.required],
        banco_id : [''],
        app : ['',Validators.required],
        app_id : [''],
        app_key : [''],
        app_vencimento : [''],
        observacao : [''],
    })

    constructor(private datePipe: DatePipe) {
      super();
      this.init();


    }

    init() {
      this.getId(this.data.cliente_id);
    }

    getId(id: number) {
      this.crudService.getById(id,'cliente').subscribe({
          next: cliente =>{
              this.cliente = cliente;
              this.setValueForms();
              this.getLancamentos();
          }
      })
  }

  nomePlano(planoInput: string) {
    const plano = this.planos.find(plano => plano.hasOwnProperty(planoInput));
    if (plano) {
      return plano[planoInput];
    }
  }

  teste(teste: any){
    console.log('teste: ', teste);

  }

  setValueForms() {
    this.form2.setValue({
        nome : this.cliente.nome,
        telefone : this.cliente.telefone,
        //vencimento : this.cliente.vencimento,
        valor : this.cliente.valor,
        plano : this.cliente.plano,
        banco_id : '',
        usuario : this.cliente.usuario,
        url : this.cliente.url,
        servidor_id : this.cliente.servidor.id,
        dispositivo : this.cliente.dispositivo,
        app : this.cliente.app,
        app_id : this.cliente.app_id,
        app_key : this.cliente.app_key,
        app_vencimento : this.cliente.app_vencimento,
        observacao : this.cliente.observacao,
    });
  }

  getLancamentos() {
      this.lancamentoService.lancamentosCliente(this.cliente.id).subscribe({
        next: lancamentosCliente =>{
            this.lancamentosCliente = lancamentosCliente;
            this.dataSource2 = lancamentosCliente;
            console.log('lancamentosCliente: ', lancamentosCliente);

        }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  override updateStatus(id: number){

    const item = this.dataSource2.find(item => item.id == id);

    if (item) {
        if(!item.status){
          this.renovacao(item);
        }

        item.status = item.status === 1 ? 0 : 1;
        this.crudService.updateStatus( id, 'lancamento').subscribe({
            next: response => {
              this.getLancamentos();
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

      excluir(id: number) {
        this.swalService.swalDeleteWarning().then(result => {
            if(result.isConfirmed){
                this.crudService.delete(id, 'lancamento').subscribe( {
                    next: response => {
                      this.getLancamentos();
                      this.swalService.swalToaster('success','','Lançamento excluido com sucesso!');
                    },
                    error: err => {
                        console.error(err.error.message);
                        this.swalService.swalToaster('error','','Erro ao excluir lançamento!');

                    }
                })
            }
        });
      }

    formatDate(date: Date): string {
      return this.datePipe.transform(date, 'dd/MM/yyyy')!;
    }

}
