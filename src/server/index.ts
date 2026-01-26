import { router } from './trpc.js';

//Root router
const appRouter = router({
  // ...
});
 
export type AppRouter = typeof appRouter;