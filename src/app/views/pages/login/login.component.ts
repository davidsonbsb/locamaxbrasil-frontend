import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AuthService } from './../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardGroupComponent,
        TextColorDirective,
        CardComponent,
        CardBodyComponent,
        FormDirective,
        InputGroupComponent,
        InputGroupTextDirective,
        IconDirective,
        FormControlDirective,
        ButtonDirective,
        NgStyle
    ]
})
export class LoginComponent {

    loginForm: FormGroup = this.formBuilder.group({
        email: [''],
        password: ['']
    })

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    login() {

    let {email, password} = this.loginForm.value;

        this.authService.login(email, password).subscribe({
            next: response => {
                this.authService.setToken(response.token);
                this.router.navigate(['/home']);
            },
            error: err => {
                err.error
            }
        })
    }
}
