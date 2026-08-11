import { useState, useCallback } from 'react';

export default function useOptimistic(initialData) {
  const [data, setData] = useState(initialData);

  const applyOptimistic = useCallback(async (optimisticData, asyncFn, onError) => {
    // Save previous data for potential rollback
    const previousData = data;
    
    // 1. Optimistically update UI
    setData(optimisticData);

    try {
      // 2. Perform the async operation
      const result = await asyncFn();
      return result;
    } catch (error) {
      // 3. Revert to previous data on failure
      setData(previousData);
      
      if (typeof onError === 'function') {
        onError(error);
      }
      
      throw error;
    }
  }, [data]);

  return [data, setData, applyOptimistic];
}
