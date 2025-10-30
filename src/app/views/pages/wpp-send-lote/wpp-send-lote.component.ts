import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { BorderDirective, CardModule } from '@coreui/angular';
import { ClienteService } from '../../../core/services/cliente.service';
import { CrudService } from '../../../core/services/crud.service';

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
        MatSelectModule
  ]
})
export class WppSendLoteComponent {

  crudService = inject(CrudService);
  clienteService = inject(ClienteService);
  formBuilder = inject(FormBuilder);

  servidores: any = [];

  form = this.formBuilder.group({
      status : null,
      servidor_id : null,
      msg : null,
  });

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
              console.log('retorno: ', retorno);
            }
        })
  }

  /* getServidorLogo(): string{
    const servidorId: any = this.form.value.servidor_id;
      return servidorId && this.servidores[servidorId -1] ? this.servidores[servidorId -1].logo : '/assets/images/no_pic.png';
  } */

}
