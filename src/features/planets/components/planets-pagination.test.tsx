import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { PlanetsPagination } from '@/features/planets/components/planets-pagination';
import userEvent from '@testing-library/user-event';

describe('PlanetsPagination', () => {
  it('renders pages and navigates', async () => {
    const onPageChange = vi.fn();
    render(
      <PlanetsPagination
        currentPage={2}
        totalCount={50}
        itemsPerPage={10}
        hasNext={true}
        hasPrevious={true}
        onPageChange={onPageChange}
      />
    );

    // Should render page links 1..5 or centered around 2
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2').closest('a')).toHaveAttribute('aria-current', 'page');

    await userEvent.click(screen.getByText(/Próxima/i));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await userEvent.click(screen.getByText(/Anterior/i));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await userEvent.click(screen.getByText('5'));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it('does not go next/prev when disabled', async () => {
    const onPageChange = vi.fn();
    render(
      <PlanetsPagination
        currentPage={1}
        totalCount={20}
        itemsPerPage={10}
        hasNext={false}
        hasPrevious={false}
        onPageChange={onPageChange}
      />
    );

    await userEvent.click(screen.getByText(/Próxima/i));
    await userEvent.click(screen.getByText(/Anterior/i));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
