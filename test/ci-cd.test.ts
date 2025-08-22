import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

describe('CI/CD workflow configuration', () => {
  const workflowsDir = join(__dirname, '../.github/workflows');
  
  describe('GitHub Actions workflow files', () => {
    it('should have main CI workflow file', () => {
      const ciWorkflow = join(workflowsDir, 'ci.yml');
      expect(existsSync(ciWorkflow)).toBe(true);
    });

    it('should have npm publish workflow file', () => {
      const publishWorkflow = join(workflowsDir, 'publish.yml');
      expect(existsSync(publishWorkflow)).toBe(true);
    });
  });

  describe('CI workflow configuration', () => {
    let ciConfig: any;

    beforeAll(() => {
      const ciWorkflowPath = join(workflowsDir, 'ci.yml');
      if (existsSync(ciWorkflowPath)) {
        const content = readFileSync(ciWorkflowPath, 'utf-8');
        ciConfig = yaml.load(content);
      }
    });

    it('should trigger on push and pull request', () => {
      expect(ciConfig).toBeDefined();
      expect(ciConfig.on).toBeDefined();
      expect(ciConfig.on.push).toBeDefined();
      expect(ciConfig.on.pull_request).toBeDefined();
    });

    it('should test on multiple Node.js versions', () => {
      const testJob = ciConfig.jobs?.test;
      expect(testJob).toBeDefined();
      expect(testJob.strategy?.matrix?.['node-version']).toBeDefined();
      expect(testJob.strategy.matrix['node-version']).toContain(18);
      expect(testJob.strategy.matrix['node-version']).toContain(20);
    });

    it('should run all necessary build steps', () => {
      const testJob = ciConfig.jobs?.test;
      expect(testJob?.steps).toBeDefined();
      
      const stepCommands = testJob.steps.map((step: any) => step.run).filter(Boolean);
      
      // Should include essential steps
      expect(stepCommands.some((cmd: string) => cmd?.includes('npm ci'))).toBe(true);
      expect(stepCommands.some((cmd: string) => cmd?.includes('npm run build'))).toBe(true);
      expect(stepCommands.some((cmd: string) => cmd?.includes('npm test'))).toBe(true);
    });
  });

  describe('Publish workflow configuration', () => {
    let publishConfig: any;

    beforeAll(() => {
      const publishWorkflowPath = join(workflowsDir, 'publish.yml');
      if (existsSync(publishWorkflowPath)) {
        const content = readFileSync(publishWorkflowPath, 'utf-8');
        publishConfig = yaml.load(content);
      }
    });

    it('should trigger on version tags', () => {
      expect(publishConfig).toBeDefined();
      expect(publishConfig.on).toBeDefined();
      expect(publishConfig.on.push?.tags).toBeDefined();
      expect(publishConfig.on.push.tags).toContain('v*');
    });

    it('should include npm publish step', () => {
      const publishJob = publishConfig.jobs?.publish;
      expect(publishJob).toBeDefined();
      
      const stepCommands = publishJob.steps?.map((step: any) => step.run).filter(Boolean);
      expect(stepCommands.some((cmd: string) => cmd.includes('npm publish'))).toBe(true);
    });

    it('should use GitHub token for authentication', () => {
      const publishJob = publishConfig.jobs?.publish;
      expect(publishJob).toBeDefined();
      
      const hasGitHubToken = publishJob.steps?.some((step: any) => 
        step.env?.NODE_AUTH_TOKEN === '${{ secrets.GITHUB_TOKEN }}'
      );
      expect(hasGitHubToken).toBe(true);
    });
  });

  describe('Workflow security and best practices', () => {
    it('should use official GitHub actions', () => {
      const ciWorkflowPath = join(workflowsDir, 'ci.yml');
      if (existsSync(ciWorkflowPath)) {
        const content = readFileSync(ciWorkflowPath, 'utf-8');
        expect(content).toMatch(/actions\/checkout@v[34]/);
        expect(content).toMatch(/actions\/setup-node@v[34]/);
      }
    });

    it('should specify Node.js registry for npm operations', () => {
      const publishWorkflowPath = join(workflowsDir, 'publish.yml');
      if (existsSync(publishWorkflowPath)) {
        const content = readFileSync(publishWorkflowPath, 'utf-8');
        expect(content).toMatch(/registry-url.*npm\.pkg\.github\.com/);
      }
    });
  });
});