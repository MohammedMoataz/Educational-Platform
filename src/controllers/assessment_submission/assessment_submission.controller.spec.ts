import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentSubmissionController } from './assessment_submission.controller';

describe('AssessmentSubmissionController', () => {
  let controller: AssessmentSubmissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentSubmissionController],
    }).compile();

    controller = module.get<AssessmentSubmissionController>(AssessmentSubmissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
