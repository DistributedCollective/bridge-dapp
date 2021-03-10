import _debug from 'debug';

export function debug(namespace: string) {
  const error = _debug(`bridge:${namespace}:error`);
  const log = _debug(`bridge:${namespace}`);

  error.log = console.error.bind(console);
  log.log = console.info.bind(console);

  return {
    log,
    error,
  };
}

export default debug;
