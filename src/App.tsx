import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import PizzaForm from './container/PizzaForm';
import AppLayout from './component/AppLayout';
import Cart from './container/Cart';

// Notes on architecture and structure
// Data sources:
// Since our data source requirement is simple
// We store apollo client configuration under apollo directory
// And use built-in hooks for fetching queries specific to each container
// In the future when there's a need to perform mutations on API
// We will store reusable hooks under the clients directory
// GraphQL types:
// You can find basic typings for schema under src/@types folder
// - Entity: Represents types for entity models such as Pizza, Topping
// - Connection: Represents mappings for entity connections
// - Queries: Defines data shapes for queries. Useful for useQuery hook
// State management:
// Though state management library is completely redundant with current
// requirements, I decided to demonstrate the usage of zustand and its simplicity.
// As the library encourages use of multiple stores it's quite cool to group state
// shape and it's actions based on behavioural relation. (Cart management, session, locale and etc.)
// Containers and components:
// We can define containers as react components which interact with data sources and global
// state. We have couple components under components directory to demonstrate the difference.
// Styling:
// Lastly, we use tailwindui to add some fancy styles to the application.
// Enjoy :)

function App() {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <PizzaForm />
        <Cart />
      </AppLayout>
    </ApolloProvider>
  );
}

export default App;
