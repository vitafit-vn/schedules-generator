import { GlobalDataContext, withContextConsumer } from 'app/contexts';

function mapContextDataToProps(contextData) {
  const { user } = contextData;
  return { user };
}

export default withContextConsumer(GlobalDataContext, mapContextDataToProps);
