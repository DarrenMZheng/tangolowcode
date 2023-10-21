import { createEngine, Workspace } from '../src';

describe('engine', () => {
  it('engine init', () => {
    const engine = createEngine({
      workspace: new Workspace({
        entry: '/src/index.js',
      }),
    });
    expect(engine.workspace.entry).toEqual('/src/index.js');
  });

  it('engine init without required files', () => {
    const engine = createEngine({
      workspace: new Workspace({
        entry: '/src/index.js',
        files: [
          {
            filename: '/src/index.js',
            code: 'console.log("hello")',
          },
          {
            filename: '/package.json',
            code: JSON.stringify({ name: 'sample' }),
          },
        ],
      }),
    });
    expect(engine.workspace.activeViewModule).toBeUndefined();
    expect(engine.workspace.routeModule).toBeUndefined();
  });
});
