import { ClipboardModule } from '@angular/cdk/clipboard';
import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { formatDate } from 'date-fns';
import { CrudService } from 'src/app/core/services/crud.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { LancamentoComponent } from '../../lancamento/lancamento/lancamento.component';

@Component({
    selector: 'app-form-cliente',
    templateUrl: './form-cliente.component.html',
    styleUrl: './form-cliente.component.scss',
    providers: [DatePipe],
    standalone: true,
    imports: [
        CardModule,
        MatIcon,
        BorderDirective,
        ClipboardModule,
        RouterLink,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule
    ]
})
export class FormClienteComponent {

    crudService = inject(CrudService)
    swalService = inject(SwalService)
    formBuilder = inject(FormBuilder);
    router      = inject(Router);
    route       = inject(ActivatedRoute);
    dialogRef   = inject(MatDialogRef<any>);
    data        = inject<any>(MAT_DIALOG_DATA);
    dataPipe    = inject(DatePipe);
    dialog          = inject(MatDialog);

    action: string = '';
    adicionar: boolean = false;
    isEditar: boolean = false;

    id: number = 0;
    cliente: any = {}
    servidores: any = []
    bancos: any = []
    urls: string[] = [];

    apps: string[] = [
          'Clouddy',
          'DreamTV',
          'DupleCast',
          'Duplex',
          'LazerPlay',
          'Multiplayer V1',
          'Multiplayer V2',
          'P2P',
          'Prime',
          'STB',
          'Smarters',
          'TV Play',
          'Web',
          'XCIPTV',
          'XCloudTV'
    ];

    planos: Array<any> = [
        { "id" : 'pop' , "desc" : "Pop" },
        { "id" : 'mega', "desc" : "Mega" },
        { "id" : 'premium', "desc" : "Premium" }
    ];

    date = new Date();
    dateLancamento = formatDate(new Date(this.date.setMonth(this.date.getMonth() +1)), 'yyyy-MM-dd');

    form = this.formBuilder.group({
        nome : ['',Validators.required],
        telefone : ['',Validators.required],
        valor : ['',Validators.required],
        plano : ['',Validators.required],
        vencimento : [this.dateLancamento ,Validators.required],
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
        notificacao_wpp : [''],
    })

    constructor() {
         //Recupera os parâmetros da rota.
         /* this.route.url.subscribe(segments => {
            this.action = segments[0]?.path;
            console.log('this.action: ', this.action);
            this.id = Number(segments[1]?.path);
            console.log('this.id: ', this.id);
            this.init();
        }); */

        this.action = this.data.action;
        this.init();

        this.form.get('servidor_id')!.valueChanges.subscribe(value => {
          //this.onServidorSelected(value);
        });
    }

    onServidorSelected(id: any) {
      const item = this.servidores.find((item: { id: any; }) => item.id === id);

      if (item) {
        this.urls = [
          item.url_1,
          item.url_2,
          item.url_3,
        ];
        this.form.get('url')!.enable();
      }

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
        }

        if (this.action === 'adicionar'){
            this.adicionar = true;
            this.getServidores();
            this.getBancos();
        }
    }

    getId() {
        this.crudService.getById(this.id,'cliente').subscribe({
            next: cliente =>{
                this.cliente = cliente;
                this.setValueForms();
                this.getServidores();
                this.getBancos();
            }
        })
    }


    setValueForms() {
        this.form.setValue({
            nome : this.cliente.nome,
            telefone : this.cliente.telefone,
            vencimento : this.cliente.vencimento,
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
            notificacao_wpp : this.cliente.notificacao_wpp,
        });
    }

    onCopy(success: boolean){
        if (success) {
            this.swalService.swalToaster('success','','Valor copiado com sucesso');
        } else {
            this.swalService.swalToaster('error','','Erro ao copiar valor');
        }
    }

    getServidorLogo(): string{
        const servidorId: any = this.form.value.servidor_id;
        return servidorId && this.servidores[servidorId -1] ? this.servidores[servidorId -1].logo : '/assets/images/no_pic.png';
    }

    editar(){
        this.action = 'editar';
        this.isEditar = true;
        for (const controlName in this.form.controls) {
            this.form.get(controlName)?.enable();
        }
    }

    salvar(){
        this.form.value.vencimento = this.dataPipe.transform(this.form.value.vencimento, 'yyyy-MM-dd');
        this.form.value.app_vencimento = this.dataPipe.transform(this.form.value.app_vencimento, 'yyyy-MM-dd');

        if(this.action === 'adicionar'){
            this.crudService.store(this.form.value,'cliente').subscribe({
                next: response =>{
                    this.swalService.swalToaster('success','','Cliente adicionado com sucesso!');
                    this.dialogRef.close();
                },
                error: err => {
                    console.error(err.error.message);
                    this.swalService.swalToaster('error','','Erro ao adicionar cliente!');
                }
            })
        }

        if(this.action === 'editar'){
            this.crudService.update(this.id,this.form.value,'cliente').subscribe({
                next: response =>{
                    this.swalService.swalToaster('success','','Cliente adicionado com sucesso!');
                    this.dialogRef.close();
                },
                error: err => {
                    console.error(err.error.message);
                    this.swalService.swalToaster('error','','Erro ao atualizar cliente!');
                }
            })
        }
    }

    excluir(id: number) {
        this.swalService.swalDeleteWarning().then(result => {
            if(result.isConfirmed){
                this.crudService.delete(id, 'cliente').subscribe( {
                    next: response => {
                        this.swalService.swalToaster('success','','Cliente excluido com sucesso!');
                        this.dialogRef.close();
                    },
                    error: err => {
                        console.error(err.error.message);
                        this.swalService.swalToaster('error','','Erro ao excluir cliente!');

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

    getBancos() {
        this.crudService.index('bancos').subscribe( {
            next: bancos => {
                this.bancos = bancos;

            }
        })
    }

    modalLancamentos(id: number) {
      this.dialogRef.close();
      const dialogRef = this.dialog.open(LancamentoComponent, {
          //panelClass: 'dialog',
          height: '590px',
          width: '900px',
          data: { cliente_id : id }
      });

      dialogRef.updatePosition({top: '120px'});

  }


}
