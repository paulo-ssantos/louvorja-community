import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { ToolsModule } from './modules/tools/tools.module';
import { DeveloperModule } from './modules/developer/developer.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    CollectionsModule,
    ToolsModule,
    DeveloperModule,
    UsersModule,
  ],
})
export class AppModule {}
