type SubscriberAction = Action<{
  subscribe: string;
  unsubscribe: string;
  cb: (data: SubscriberCallback) => void;
}>;

type SubscriberCallback = Action<any> & {
  unsubscribeAction: () => { type: string };
};
