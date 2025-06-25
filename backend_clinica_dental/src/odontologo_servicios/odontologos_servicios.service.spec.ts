import { Test, TestingModule } from '@nestjs/testing';
import { OdontologosServiciosService } from './odontologos_servicios.service';

describe('OdontologoServiciosService', () => {
  let service: OdontologosServiciosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdontologosServiciosService],
    }).compile();

    service = module.get<OdontologosServiciosService>(
      OdontologosServiciosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
