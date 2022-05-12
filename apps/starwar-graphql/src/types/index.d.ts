import { IDataloaders } from '@/src/data-loader/data-loader.interface';

declare global {
  interface IGraphQLContext {
    loaders: Promise<IDataloaders>;
  }
}
