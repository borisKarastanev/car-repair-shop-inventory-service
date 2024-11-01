import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesMessageService } from './invoices-message.service';

describe('InvoicesMessageService', () => {
  let service: InvoicesMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoicesMessageService],
    }).compile();

    service = module.get<InvoicesMessageService>(InvoicesMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
