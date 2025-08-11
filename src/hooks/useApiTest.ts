import { useState } from 'react';

export interface ApiTestData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string;
  name: string;
}

export interface TestResult {
  status: number;
  responseTime: number;
  success: boolean;
  data: any;
  error?: string;
}

export function useApiTest() {
  const [isCreating, setIsCreating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createNewTest = () => {
    setIsCreating(true);
    setError(null);
    // Aqui você pode abrir um modal ou navegar para uma página de criação
    console.log('Abrindo formulário para criar novo teste...');
  };

  const runTest = async (testData: ApiTestData): Promise<TestResult | null> => {
    setIsRunning(true);
    setError(null);
    setTestResult(null);

    try {
      const startTime = Date.now();
      
      const response = await fetch(testData.url, {
        method: testData.method,
        headers: {
          'Content-Type': 'application/json',
          ...testData.headers,
        },
        body: testData.method !== 'GET' ? testData.body : undefined,
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      const data = await response.json();
      
      const result: TestResult = {
        status: response.status,
        responseTime,
        success: response.ok,
        data,
      };

      setTestResult(result);
      return result;

    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao executar teste';
      setError(errorMessage);
      
      const result: TestResult = {
        status: 0,
        responseTime: 0,
        success: false,
        data: null,
        error: errorMessage,
      };
      
      setTestResult(result);
      return result;
    } finally {
      setIsRunning(false);
    }
  };

  const clearResults = () => {
    setTestResult(null);
    setError(null);
  };

  const closeCreateForm = () => {
    setIsCreating(false);
  };

  return {
    // Estados
    isCreating,
    isRunning,
    testResult,
    error,
    
    // Ações
    createNewTest,
    runTest,
    clearResults,
    closeCreateForm,
  };
}