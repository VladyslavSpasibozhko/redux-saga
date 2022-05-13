import { Spinner, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/counter';

export function Counter() {
  const dispatch = useDispatch();
  const { counter, isConnecting, isConnected } = useSelector(
    (state: Store) => state.Counter,
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-600">
          <span className="text-coolGray-700">Counter:</span>
          <span className="ml-3">{counter}</span>
        </p>
        {isConnected && <Badge bg="success">Connected</Badge>}
      </div>

      <div className="mt-3">
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.incrementWatcher())}
          className="mr-3"
        >
          Increment
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.decrementWatcher())}
          className="mr-3"
        >
          Decrement
        </Button>
      </div>
      <div className="mt-3">
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.incrementWatcherAsync())}
          className="mr-3"
        >
          Increment async
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.decrementWatcherAsync())}
          className="mr-3"
        >
          Decrement async
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => dispatch(actions.cancelIncrement())}
        >
          Cancel
        </Button>
      </div>
      <div className="mt-3">
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.wsConnectRequest())}
          className="mr-3"
          disabled={isConnected}
        >
          Connect to WS
          {isConnecting && (
            <Spinner className="ml-3" animation="border" size="sm" />
          )}
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.wsCloseRequest())}
          className="mr-3"
          disabled={!isConnected}
        >
          Close WS
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.wsSendRequest(String(counter + 1)))}
          className="mr-3"
          disabled={!isConnected}
        >
          Increment
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => dispatch(actions.wsSendRequest(String(counter - 1)))}
          disabled={!isConnected}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
