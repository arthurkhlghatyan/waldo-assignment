interface QueryStateProps {
  loading: boolean;
  error: boolean;
}

// Simple component to display state of queries
// Which will render data after execution completion
const QueryState: React.FC<QueryStateProps> = ({
  loading,
  error,
  children,
}) => {
  if (error) {
    return <div>An unexpected error occurred while fetching pizzas</div>;
  }

  if (loading) {
    return <div>Loading pizzas...</div>;
  }

  return <>{children}</>;
};

export default QueryState;
