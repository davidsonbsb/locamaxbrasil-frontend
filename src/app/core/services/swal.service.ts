import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwalService {

    optionsToaster: any = {
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'bottom-end',
        toast: true,
        timer: 4000
    }

    swalDeleteWarning (){
        return Swal.fire({
        icon: 'warning',
        title: 'Deseja realmente excluir?',
        text: 'Esta ação não poderá ser desfeita!',
        iconColor: "#c7513f",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        confirmButtonColor: "#c7513f"
        })
    }

    swalNoData (){
        return Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Falha ao recuperar dados!',
        iconColor: "#c7513f",
        confirmButtonColor: "#c7513f"
        })
    }

    swalToaster (
        icon: string = 'success' || 'error' || 'warning',
        title: string,
        text : string,
    ){
        return Swal.fire({
        icon: icon,
        title: title,
        text: text,
        ...this.optionsToaster
        });
    }

}
