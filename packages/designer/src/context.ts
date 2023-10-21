import { createContext } from '@music163/tango-helpers';
import type { DndQuery } from './dnd';

export interface IDesignerContext<S = any> {
  /**
   * 沙箱查询实例
   */
  sandboxQuery: DndQuery;
  /**
   * 远程服务
   */
  remoteServices?: Record<string, S>;
}

const [DesignerProvider, useDesigner] = createContext<IDesignerContext>({
  name: 'DesignerContext',
});

export { DesignerProvider };

export const useSandboxQuery = () => {
  return useDesigner()?.sandboxQuery;
};

export const useRemoteServices = () => {
  return useDesigner()?.remoteServices;
};
