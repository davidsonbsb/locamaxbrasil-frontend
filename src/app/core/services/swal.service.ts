import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class SwalService {

    optionsToaster: any = {
        timerProgressBar: true,
        showConfirmButton: false,
        position: 'top-end',
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
        icon: string = 'success',
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


    swalRenovacao (
      text : string,
        ){
        return Swal.fire({
            icon: 'success',
            title: 'Renovação',
            html: text,

            })
    }

    swalFire (
      text : string,
      status: boolean
    ){
      return Swal.fire({
        icon: 'warning',
        title: text,
        iconColor: "#c7513f",
        showDenyButton: status,
        showCancelButton: true,
        showConfirmButton: !status,
        confirmButtonText: 'Adicionar',
        confirmButtonColor: "#4ac73fff",
        denyButtonText: 'Remover',
      })

    }

}
