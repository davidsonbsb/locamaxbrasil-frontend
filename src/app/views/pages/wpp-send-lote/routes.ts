import { Routes } from '@angular/router';
import { WppSendLoteComponent } from '../wpp-send-lote/wpp-send-lote.component';

export const routes: Routes = [
    {
        path: '',
        component: WppSendLoteComponent,
        data: {
        title: $localize`WhatsApp Msg Lote / WhatsApp Msg Lote`
        }
    },
    {
      path: 'novidades',
      component: WppSendLoteComponent,
      data: {
          title: $localize`WhatsApp Msg Lote `
      }
    }
];
