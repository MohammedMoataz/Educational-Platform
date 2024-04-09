import { Test, TestingModule } from '@nestjs/testing';
import { CourseMaterialController } from './course_material.controller';

describe('CourseMaterialController', () => {
  let controller: CourseMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseMaterialController],
    }).compile();

    controller = module.get<CourseMaterialController>(CourseMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
