import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepo: Repository<Book>,
  ) {}

  findAll() {
    return this.booksRepo.find();
  }

  async findOne(id: number) {
    const book = await this.booksRepo.findOneBy({ id });
    if (!book) throw new NotFoundException(`Book #${id} not found`);
    return book;
  }

  create(dto: CreateBookDto) {
    const book = this.booksRepo.create(dto);
    return this.booksRepo.save(book);
  }

  async update(id: number, dto: Partial<CreateBookDto>) {
    await this.findOne(id); // throws if not found
    await this.booksRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.booksRepo.delete(id);
    return { deleted: true };
  }
}