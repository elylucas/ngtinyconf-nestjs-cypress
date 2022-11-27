import { TestEnvOnlyGuard } from './test-env-only.guard';

describe('TestEnvOnlyGuard', () => {
  it('should be defined', () => {
    expect(new TestEnvOnlyGuard()).toBeDefined();
  });
});
