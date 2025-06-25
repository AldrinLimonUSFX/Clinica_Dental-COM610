import { Test, TestingModule } from '@nestjs/testing';
import { OdontologosController } from './odontologos.controller';
import { OdontologosService } from './odontologos.service';

describe('OdontologosController', () => {
  let controller: OdontologosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OdontologosController],
      providers: [OdontologosService],
    }).compile();

    controller = module.get<OdontologosController>(OdontologosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
