// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { BooksModule } from './books/books.module';

// @Module({
//   imports: [BooksModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}



import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'booksdb',
      autoLoadEntities: true,
      synchronize: true, // auto-creates tables in dev — never use in production!
    }),
    BooksModule,
  ],
})
export class AppModule {}