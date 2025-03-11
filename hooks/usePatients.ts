import { useState, useEffect } from 'react';
import { Patient } from '../types/patients';

export function usePatients() {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const response = await fetch('/api/patients');
				if (!response.ok) throw new Error('Failed to fetch patients');
				const data = await response.json();
				setPatients(data.patients);
			} catch (err) {
				setError(err instanceof Error ? err : new Error('Unknown error'));
			} finally {
				setLoading(false);
			}
		};

		fetchPatients();
	}, []);

	return { patients, loading, error };
}
