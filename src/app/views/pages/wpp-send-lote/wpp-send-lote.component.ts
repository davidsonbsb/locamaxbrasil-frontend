import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { ClienteService } from '../../../core/services/cliente.service';
import { CrudService } from '../../../core/services/crud.service';
import { SwalService } from '../../../core/services/swal.service';

@Component({
  selector: 'app-wpp-send-lote',
  standalone: true,
  templateUrl: './wpp-send-lote.component.html',
  styleUrl: './wpp-send-lote.component.scss',
  imports: [
    CardModule,
        MatIcon,
        BorderDirective,
        RouterLink,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule
      ]
})
export class WppSendLoteComponent {

  crudService = inject(CrudService);
  clienteService = inject(ClienteService);
  formBuilder = inject(FormBuilder);
  swalService = inject(SwalService)

  servidores: any = [];

  form = this.formBuilder.group({
      status : ['',Validators.required],
      servidor_id : ['',Validators.required],
      msg : ['',Validators.required],
      app : null,
      data_inicio : null,
      data_fim : null,
  });

      apps: string[] = [
          'Clouddy',
          'DreamTV',
          'DupleCast',
          'Duplex',
          'LazerPlay',
          'Hibrido',
          'Multiplayer V1',
          'Multiplayer V2',
          'P2P',
          'Prime',
          'STB',
          'Smarters',
          'SSiptv',
          'TV Play',
          'Ultra Player',
          'Web',
          'XCIPTV',
          'XCloudTV'
    ];

  constructor() {
    this.init();
    this.form.get('servidor_id')!.valueChanges.subscribe(value => {
                //this.onServidorSelected(value);
              });
  }

  init() {
    this.getServidores();
  }

  getServidores() {
        this.crudService.index('servidores').subscribe( {
            next: servidores => {
                this.servidores = servidores;
            }
        })
  }

  salvar() {
    //console.log('this.form.value: ', this.form.value);
    this.clienteService.enviarMsgLote(this.form.value).subscribe( {
            next: retorno => {
              if (retorno) {
                this.swalService.swalToaster('success','','Disparo realizado com sucesso');
              } else {
                  this.swalService.swalToaster('error','','Erro ao realizar disparo');
              }
            }
        })
  }

  /* getServidorLogo(): string{
    const servidorId: any = this.form.value.servidor_id;
      return servidorId && this.servidores[servidorId -1] ? this.servidores[servidorId -1].logo : '/assets/images/no_pic.png';
  } */

}
