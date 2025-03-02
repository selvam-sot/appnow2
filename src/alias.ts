import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
    '@': path.resolve(__dirname, '.'),
    '@controllers': path.resolve(__dirname, 'controllers'),
    '@models': path.resolve(__dirname, 'models'),
    '@routes': path.resolve(__dirname, 'routes'),
    '@middlewares': path.resolve(__dirname, 'middlewares'),
    '@utils': path.resolve(__dirname, 'utils'),
    '@config': path.resolve(__dirname, 'config')
});