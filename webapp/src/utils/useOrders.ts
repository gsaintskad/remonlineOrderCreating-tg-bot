import { useState, useEffect, useCallback } from "react";

// Define an Order Type
interface Order {
    id: number;
    name: string;
    price: number;
}

// Hook Return Type
interface UseOrdersResult {
    orders: Order[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

// Custom Hook
const useOrders = (apiUrl: string): UseOrdersResult => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch Orders
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            const data: Order[] = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    // Fetch on Mount
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, error, refetch: fetchOrders };
};

export default useOrders;
