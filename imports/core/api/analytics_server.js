import Analytics from 'analytics-node';

export const analyticsServer = new Analytics('0fjIEaaBXoa4nkjSH2J42hhADOxMNSC1', {
  flushAt: 20,
  flushInterval: 10000
});
