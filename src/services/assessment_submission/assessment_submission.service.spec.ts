import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentSubmissionService } from './assessment_submission.service';

describe('AssessmentSubmissionService', () => {
  let service: AssessmentSubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssessmentSubmissionService],
    }).compile();

    service = module.get<AssessmentSubmissionService>(AssessmentSubmissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
