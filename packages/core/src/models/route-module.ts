import { action, computed, makeObservable, observable, toJS } from 'mobx';
import {
  traverseRouteFile,
  addRouteToRouteFile,
  removeRouteFromRouteFile,
  updateRouteToRouteFile,
} from '../helpers';
import { IRouteData, IFileConfig } from '../types';
import { IWorkspace } from './interfaces';
import { TangoModule } from './module';

/**
 * 路由配置模块
 */
export class TangoRouteModule extends TangoModule {
  _routes: IRouteData[];

  get routes() {
    return toJS(this._routes);
  }

  constructor(workspace: IWorkspace, props: IFileConfig) {
    super(workspace, props, false);
    this.update(props.code, true, false);

    makeObservable(this, {
      _routes: observable,
      _code: observable,
      _cleanCode: observable,
      routes: computed,
      code: computed,
      cleanCode: computed,
      update: action,
    });
  }

  /**
   * 根据路由地址获取 route 对象
   */
  getRouteByRoutePath(route: string) {
    let record;
    for (const item of this.routes) {
      if (item.path === route) {
        record = item;
        break;
      }
    }
    return record;
  }

  /**
   * 添加一条新路由
   * @param name
   */
  addRoute(routePath: string, importFilePath: string) {
    this.ast = addRouteToRouteFile(this.ast, routePath, importFilePath);
    return this;
  }

  /**
   * 更新页面路由
   * @param oldRoutePath
   * @param newRoutePath
   * @returns
   */
  updateRoute(oldRoutePath: string, newRoutePath: string) {
    this.ast = updateRouteToRouteFile(this.ast, oldRoutePath, newRoutePath);
    return this;
  }

  /**
   * 删除一条路由
   * @param route 路由地址
   */
  removeRoute(route: string) {
    if (route === '/') {
      console.warn('index route should not be removed!');
      return;
    }
    const record = this.getRouteByRoutePath(route);
    this.ast = removeRouteFromRouteFile(this.ast, route, record.importPath);
    return this;
  }

  _analysisAst() {
    this._routes = traverseRouteFile(this.ast);
  }
}
