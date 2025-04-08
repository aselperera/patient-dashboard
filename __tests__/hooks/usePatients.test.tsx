import { renderHook, waitFor } from '@testing-library/react';
import { usePatients } from '../../hooks/usePatients';
import { mockPatients } from '../../__mocks__/patients';

describe('usePatients hook', () => {
	beforeEach(() => {
		// Mock fetch to return mockPatients
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockPatients),
			})
		) as jest.Mock;
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should start with initial loading state', () => {
		const { result } = renderHook(() => usePatients());

		expect(result.current.loading).toBe(true);
		expect(result.current.patients).toEqual([]);
		expect(result.current.error).toBeNull();
	});

	it('should successfully fetch patients', async () => {
		const { result } = renderHook(() => usePatients());

		// Wait for the loading state to complete
		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.patients).toEqual(mockPatients.patients);
		expect(result.current.error).toBeNull();
		expect(fetch).toHaveBeenCalledTimes(1);
		expect(fetch).toHaveBeenCalledWith('/api/patients');
	});

	it('should handle API error', async () => {
		// Mock a failed API call
		global.fetch = jest.fn(() =>
			Promise.reject(new Error('Failed to fetch'))
		) as jest.Mock;

		const { result } = renderHook(() => usePatients());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error).toBeInstanceOf(Error);
		expect(result.current.error?.message).toBe('Failed to fetch');
		expect(result.current.patients).toEqual([]);
	});

	it('should handle non-OK response', async () => {
		// Mock a response with non-OK status
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				status: 500,
			})
		) as jest.Mock;

		const { result } = renderHook(() => usePatients());

		await waitFor(() => {
			expect(result.current.loading).toBe(false);
		});

		expect(result.current.error?.message).toBe('Failed to fetch patients');
		expect(result.current.patients).toEqual([]);
	});
});
