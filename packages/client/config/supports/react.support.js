import Config from 'webpack-chain';
import jsSupport from './js.support.js';

export default function reactSupport(...options) {
  return (
    /**
     * @param {Config} chain
     * @param {object} args
     * @returns {import("webpack").Configuration}
     */
    function (chain, args) {
      if (!chain.module.rules.has(jsSupport.name)) {
        jsSupport()(chain, args);
      }

      return chain.toConfig();
    }
  );
}
