import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dto/createTemplate.dto';
import { Template } from './template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templatesRepository: Repository<Template>,
  ) {}

  async create(data: CreateTemplateDto) {
    return await this.templatesRepository.save(data);
  }

  async read(id: number) {
    return await this.templatesRepository.findOne({ where: { id: id } });
  }
}
