import {
	render,
	screen,
	waitFor,
	fireEvent,
	within,
} from '@testing-library/react';
import Index from '../../pages/index';
import { usePatients } from '../../hooks/usePatients';
import { mockPatients } from '../../__mocks__/patients';

// Mock usePatients hook
jest.mock('../../hooks/usePatients');
const mockUsePatients = usePatients as jest.Mock;

describe('Index page', () => {
	beforeEach(() => {
		mockUsePatients.mockReturnValue({
			patients: mockPatients.patients,
			loading: false,
			error: null,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders title', async () => {
		render(<Index />);
		await waitFor(() => {
			expect(screen.getByText('Patients')).toBeInTheDocument();
		});
	});

	it('shows loading state', async () => {
		mockUsePatients.mockReturnValue({
			patients: mockPatients.patients,
			loading: true,
			error: null,
		});
		render(<Index />);
		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument();
		});
	});

	it('shows error state', async () => {
		mockUsePatients.mockReturnValue({
			patients: [],
			loading: false,
			error: new Error('Failed to fetch'),
		});
		render(<Index />);
		await waitFor(() => {
			expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
		});
	});

	it('shows patients list', async () => {
		render(<Index />);
		await waitFor(() => {
			expect(screen.getByRole('table')).toBeInTheDocument();
			expect(
				screen.getByText(
					`${mockPatients.patients[0].firstName} ${mockPatients.patients[0].lastName}`
				)
			).toBeInTheDocument();
		});
	});
});

describe('Filtering functionality', () => {
	beforeEach(() => {
		mockUsePatients.mockReturnValue({
			patients: mockPatients.patients,
			loading: false,
			error: null,
		});
	});

	it('filters patients by name', async () => {
		render(<Index />);

		const filterInput = screen.getByLabelText('Filter by name:');

		// Type a name that exists in mock data
		fireEvent.change(filterInput, { target: { value: 'John' } });

		// Should only show patients with 'John' in their name
		const rows = screen.getAllByRole('row');
		expect(rows.length).toBe(2); // Header row + 1 matching patient
		expect(screen.getByText('John Doe')).toBeInTheDocument();

		// Verify other patients are not shown
		expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
	});
});

describe('Sorting functionality', () => {
	beforeEach(() => {
		mockUsePatients.mockReturnValue({
			patients: mockPatients.patients,
			loading: false,
			error: null,
		});
	});

	it('sorts by name correctly', async () => {
		render(<Index />);
		const sortSelect = await screen.findByLabelText('Sort by:');

		fireEvent.change(sortSelect, { target: { value: 'name' } });

		const rows = screen.getAllByRole('row');

		const firstPatientName = within(rows[1]).getAllByRole('cell')[0]
			.textContent;

		expect(firstPatientName).toBe('Jane Smith');
	});

	it('sorts by ID correctly', async () => {
		render(<Index />);
		const sortSelect = await screen.findByLabelText('Sort by:');

		fireEvent.change(sortSelect, { target: { value: 'id' } });

		const rows = screen.getAllByRole('row');
		const firstPatientId = within(rows[1]).getAllByRole('cell')[1].textContent;

		expect(firstPatientId).toBe('00000001');
	});

	it('sorts by date of birth correctly', async () => {
		render(<Index />);
		const sortSelect = await screen.findByLabelText('Sort by:');

		fireEvent.change(sortSelect, { target: { value: 'dateOfBirth' } });

		const rows = screen.getAllByRole('row');
		const firstPatientDob = within(rows[1]).getAllByRole('cell')[2].textContent;

		expect(firstPatientDob).toBe('1990-01-01');
	});

	it('sorts by registration date correctly', async () => {
		render(<Index />);
		const sortSelect = await screen.findByLabelText('Sort by:');

		fireEvent.change(sortSelect, { target: { value: 'dateOfRegistration' } });

		const rows = screen.getAllByRole('row');
		const firstPatientRegDate = within(rows[1]).getAllByRole('cell')[3]
			.textContent;

		expect(firstPatientRegDate).toBe('2020-01-01');
	});
});
