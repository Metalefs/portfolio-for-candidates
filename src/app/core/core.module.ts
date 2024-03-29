import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { NoAuthGuard } from 'src/app/core/guard/no-auth.guard';
import { throwIfAlreadyLoaded } from 'src/app/core/guard/module-import.guard';

import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    NoAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
