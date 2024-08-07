import { ChangeDetectionStrategy, Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardModule, FormModule, GridModule } from '@coreui/angular';
import { LancamentoComponent } from '../../financeiro/lancamento/lancamento.component';
import { CrudService } from './../../../../core/services/crud.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrl: './create-cliente.component.scss',
  standalone: true,
  imports: [
    FormModule,
    ReactiveFormsModule,
    CardModule,
    FormModule,
    GridModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    LancamentoComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClienteComponent implements OnChanges{

    formBuilder = inject(FormBuilder);
    crudService = inject(CrudService);

    nomeMinLength: number = 3;


    apps: string[] = [
        'Duplex',
        'DupleCast',
        'XCloud',
    ];

    planos: any = {
      'pop' : 'Pop',
      'Mega' : 'Mega',
      'Premium' : 'Premium',
    };

    servidores: string[] = [
        'Club',
        'PlayON',
        'Five',
        'Seven',
        'Warez',
    ];

    form = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(this.nomeMinLength)]],
        telefone : ['', [Validators.required]],
        dispositivo: [''],
        app: ['', [Validators.required]],
        app_id: [''],
        app_key: [''],
        app_vencimento: [''],
        plano: ['', [Validators.required]],
        vencimento: ['', [Validators.required]],
        valor: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        servidor_id: ['', [Validators.required]],
        banco_id: ['', [Validators.required]],
    })

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['valor']) {
        const prevValue = changes['valor'].previousValue;
        const currentValue = changes['valor'].currentValue;
        console.log(`valor changed from ${prevValue} to ${currentValue}`);
      }
    }

    submit(){

        let app_vencimento = this.form.value.app_vencimento;

        if (app_vencimento) {
            this.form.value.app_vencimento = format(app_vencimento, 'yyyy-MM-dd');
        } else {
            console.log('Data inválida');
        }

        let vencimento = this.form.value.vencimento;

        if (vencimento) {
            this.form.value.vencimento = format(vencimento, 'yyyy-MM-dd');
        } else {
            console.log('Data inválida');
        }

      this.crudService.store(this.form.value,'cliente').subscribe({
        next: response => {

          console.log('response: ', response);
        },
        error: error => {
          console.error('error: ', error);

        }
      })
    }


}
