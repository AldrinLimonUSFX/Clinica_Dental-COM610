import { Test, TestingModule } from '@nestjs/testing';
import { OdontologosServiciosController } from './odontologos_servicios.controller';
import { OdontologosServiciosService } from './odontologos_servicios.service';

describe('OdontologoServiciosController', () => {
  let controller: OdontologosServiciosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdontologosServiciosController],
      providers: [OdontologosServiciosService],
    }).compile();

    controller = module.get<OdontologosServiciosController>(
      OdontologosServiciosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
