import { useEffect, useState } from 'react';
import { BUILTIN_TESTS } from '../lib/catalog';
import { SAT_TESTS } from '../lib/sat';
import { GENERATED_TESTS } from '../lib/generated';
import { listUploadedTests } from '../lib/api';
import type { Test } from '../lib/store';

export function useTests() {
  const [uploaded, setUploaded] = useState<Test[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { listUploadedTests().then(setUploaded).catch(() => {}).finally(() => setLoading(false)); }, []);
  return { tests: [...BUILTIN_TESTS, ...SAT_TESTS, ...GENERATED_TESTS, ...uploaded], loading };
}
