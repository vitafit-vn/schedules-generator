import { createContext } from 'preact-context';

const GlobalDataContext = createContext({});

function withContextConsumer(Context, onMapContextDataToProps) {
  return Component => {
    const ConsumedComponent = props => (
      <Context.Consumer>
        {data => {
          const mappedProps = onMapContextDataToProps(data);
          return <Component {...props} {...mappedProps} />;
        }}
      </Context.Consumer>
    );

    return ConsumedComponent;
  };
}

export { GlobalDataContext, withContextConsumer };
