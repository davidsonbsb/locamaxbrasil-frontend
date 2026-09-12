import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, FormModule, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        ContainerComponent,
        RowComponent,
        ColComponent,
        TextColorDirective,
        CardComponent,
        CardBodyComponent,
        FormDirective,
        InputGroupComponent,
        InputGroupTextDirective,
        IconDirective,
        FormControlDirective,
        ButtonDirective,
        FormModule,
        ReactiveFormsModule
    ]
})
export class RegisterComponent {

    authService = inject(AuthService);
    formBuilder = inject(FormBuilder);
    router      = inject(Router);

    registerForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
        password: ['', [Validators.required]],
        password_confirmation: ['', [Validators.required]]
    })

    register() {

        let {name, email, password, password_confirmation} = this.registerForm.value;

            this.authService.register(name, email, password, password_confirmation).subscribe({
                next: response => {
                    this.authService.setToken(response.token);
                    this.router.navigate(['/login']);
                },
                error: err => {
                    err.error
                }
            })
        }

}
