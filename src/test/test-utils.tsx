import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

interface ProvidersProps {
  children: React.ReactNode;
  queryClient?: QueryClient;
  initialRoutes?: string[];
}

// eslint-disable-next-line react-refresh/only-export-components
function Providers({
  children,
  queryClient,
  initialRoutes = ["/"],
}: ProvidersProps) {
  const client = queryClient || createTestQueryClient();

  return (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  queryClient?: QueryClient;
  initialRoutes?: string[];
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { queryClient, initialRoutes, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: ({ children }) => (
      <Providers queryClient={queryClient} initialRoutes={initialRoutes}>
        {children}
      </Providers>
    ),
    ...renderOptions,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { userEvent } from "@testing-library/user-event";
