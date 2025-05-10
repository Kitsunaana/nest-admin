import { DynamicModule, Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { AsyncOptions, Options, ProviderOptionsSymbol } from './provider.const';

@Module({})
export class ProviderModule {
  public static register(options: Options): DynamicModule {
    return {
      module: ProviderModule,
      exports: [ProviderService],
      providers: [
        ProviderService,
        {
          useValue: options.services,
          provide: ProviderOptionsSymbol
        }
      ]
    }
  }

  public static registerAsync(options: AsyncOptions): DynamicModule {
    return {
      module: ProviderModule,
      exports: [ProviderService],
      imports: options.imports,
      providers: [
        ProviderService,
        {
          useFactory: options.useFactory,
          provide: ProviderOptionsSymbol,
          inject: options.inject,
        }
      ]
    }
  }
}
