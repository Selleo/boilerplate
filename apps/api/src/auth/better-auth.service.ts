import { buildBetterAuthInstance } from "src/lib/better-auth-options";

// to use it in DI use:
// private readonly authService: AuthService<BetterAuthInstance> 
export type BetterAuthInstance = ReturnType<typeof buildBetterAuthInstance>;
