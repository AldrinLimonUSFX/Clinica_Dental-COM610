import { Test, TestingModule } from '@nestjs/testing';
import { OdontologosService } from './odontologos.service';

describe('OdontologosService', () => {
  let service: OdontologosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdontologosService],
    }).compile();

    service = module.get<OdontologosService>(OdontologosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
