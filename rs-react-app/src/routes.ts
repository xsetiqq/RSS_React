import {
  type RouteConfig,
  route,
  index,
  layout,
} from '@react-router/dev/routes';

export default [
  index('./pages/Homepage.tsx'),
  route('not-found', './pages/NotFoundPage.tsx'),
  layout('./components/error/ErrorModule.tsx', [
    route('error', './components/error/ErrorComponent.tsx'),
  ]),
] satisfies RouteConfig;
