import { useQuery, useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/modules/auth/auth-mobile.client";

export const currentUserQueryOptions = {
  queryKey: ["currentUser"],
  queryFn: async () => {
    const response = await authClient.getSession();

    if (response.error) {
      throw new Error(response.error.message, {
        cause: response.error,
      });
    }
    return response.data?.user ?? null;
  },
};

export function useCurrentUser() {
  const { data, ...rest } = useQuery(currentUserQueryOptions);
  return { data: data, ...rest };
}

export function useCurrentUserSuspense() {
  const { data, ...rest } = useSuspenseQuery(currentUserQueryOptions);
  return { data: data, ...rest };
}

export function useInvalidateCurrentUser() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["currentUser"] });
}
